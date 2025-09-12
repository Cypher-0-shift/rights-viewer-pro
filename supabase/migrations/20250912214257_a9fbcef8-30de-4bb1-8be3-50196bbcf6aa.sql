-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create claims table
CREATE TABLE public.claims (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  claim_id TEXT NOT NULL UNIQUE,
  applicant_name TEXT NOT NULL,
  applicant_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  village TEXT NOT NULL,
  district TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'Chhattisgarh',
  land_type TEXT NOT NULL CHECK (land_type IN ('Individual', 'Community', 'CFR')),
  area_hectares DECIMAL(10,4) NOT NULL,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'under_review', 'verified', 'rejected')),
  submission_date TIMESTAMP WITH TIME ZONE,
  verification_date TIMESTAMP WITH TIME ZONE,
  documents JSONB DEFAULT '[]',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create districts table for reference data
CREATE TABLE public.districts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'Chhattisgarh',
  total_area_hectares DECIMAL(12,4),
  forest_cover_percentage DECIMAL(5,2),
  population INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create villages table
CREATE TABLE public.villages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  district_id UUID NOT NULL REFERENCES public.districts(id) ON DELETE CASCADE,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  population INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create documents table for file tracking
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  claim_id UUID NOT NULL REFERENCES public.claims(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.villages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Create helper function to check user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS TEXT AS $$
BEGIN
  RETURN (SELECT role FROM public.profiles WHERE user_id = user_uuid LIMIT 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for claims
CREATE POLICY "Users can view their own claims" ON public.claims
  FOR SELECT USING (auth.uid() = applicant_id);

CREATE POLICY "Users can create their own claims" ON public.claims
  FOR INSERT WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "Users can update their own draft claims" ON public.claims
  FOR UPDATE USING (
    auth.uid() = applicant_id AND 
    status IN ('draft', 'submitted')
  );

CREATE POLICY "Admins can view all claims" ON public.claims
  FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can update all claims" ON public.claims
  FOR UPDATE USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for districts (public read)
CREATE POLICY "Everyone can view districts" ON public.districts
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage districts" ON public.districts
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for villages (public read)
CREATE POLICY "Everyone can view villages" ON public.villages
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage villages" ON public.villages
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for documents
CREATE POLICY "Users can view their claim documents" ON public.documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.claims 
      WHERE claims.id = documents.claim_id AND claims.applicant_id = auth.uid()
    )
  );

CREATE POLICY "Users can upload documents to their claims" ON public.documents
  FOR INSERT WITH CHECK (
    auth.uid() = uploaded_by AND
    EXISTS (
      SELECT 1 FROM public.claims 
      WHERE claims.id = documents.claim_id AND claims.applicant_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all documents" ON public.documents
  FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_claims_updated_at
  BEFORE UPDATE ON public.claims
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert sample districts
INSERT INTO public.districts (name, total_area_hectares, forest_cover_percentage, population) VALUES
  ('Raipur', 1364000, 35.2, 4063872),
  ('Bilaspur', 830000, 42.8, 2663629),
  ('Durg', 865000, 28.4, 3343872),
  ('Rajnandgaon', 860000, 38.9, 1537133),
  ('Korba', 702000, 45.6, 1206640),
  ('Bastar', 1069900, 76.8, 1413199),
  ('Kanker', 555800, 68.4, 748941),
  ('Dhamtari', 482100, 41.2, 799781);

-- Insert sample villages
INSERT INTO public.villages (name, district_id, latitude, longitude, population) 
SELECT 
  village_name,
  d.id,
  21.2514 + (RANDOM() * 2.5),  -- Random lat within Chhattisgarh
  81.6296 + (RANDOM() * 3.2),  -- Random lng within Chhattisgarh
  (500 + RANDOM() * 2000)::INTEGER
FROM (
  SELECT d.id, 
    unnest(ARRAY[
      'Abhanpur', 'Arang', 'Tilda', 'Mahasamund', 'Gariaband',
      'Baloda Bazar', 'Simga', 'Kurud', 'Dharsiwa', 'Bhilai'
    ]) as village_name
  FROM public.districts d
  LIMIT 5
) AS village_data;

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.claims;
ALTER PUBLICATION supabase_realtime ADD TABLE public.districts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.villages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.documents;