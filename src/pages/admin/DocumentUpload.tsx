import { useState, useCallback } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Upload,
  FileText,
  Image,
  Scan,
  Download,
  Check,
  AlertCircle,
  X
} from "lucide-react";

const DocumentUpload = () => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [extractedText, setExtractedText] = useState("");
  const [nerData, setNerData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => 
      file.type.includes('pdf') || 
      file.type.includes('image') || 
      file.type.includes('document')
    );
    
    if (validFiles.length !== files.length) {
      toast({
        title: "Some files were skipped",
        description: "Only PDF, image, and document files are supported",
        variant: "destructive",
      });
    }
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
    
    // Simulate OCR processing
    if (validFiles.length > 0) {
      processFiles(validFiles);
    }
  };

  const processFiles = async (files: File[]) => {
    setIsProcessing(true);
    setUploadProgress(0);

    // Simulate file processing
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Mock OCR extracted text
    const mockExtractedText = `
Forest Rights Act Claim Application

Claimant Details:
Name: Ramesh Kumar Singh
Father's Name: Shyam Lal Singh
Village: Bandhavgarh
District: Bastar
State: Chhattisgarh

Claim Type: Individual Forest Rights (IFR)
Area Claimed: 2.5 hectares
Survey Number: 45/2
Forest Block: Bandhavgarh Block-A

Occupation: Agriculture and Forest Produce Collection
Duration of Occupation: 25 years (since 1998)

Documents Attached:
- Ration Card
- Voter ID
- Revenue Records
- Community Certificate
    `;

    // Mock NER extraction
    const mockNerData = {
      claimantName: "Ramesh Kumar Singh",
      fatherName: "Shyam Lal Singh",
      village: "Bandhavgarh",
      district: "Bastar",
      state: "Chhattisgarh",
      claimType: "Individual Forest Rights (IFR)",
      areaClaimed: "2.5 hectares",
      surveyNumber: "45/2",
      forestBlock: "Bandhavgarh Block-A",
      occupation: "Agriculture and Forest Produce Collection",
      durationOfOccupation: "25 years",
      documentsAttached: ["Ration Card", "Voter ID", "Revenue Records", "Community Certificate"]
    };

    setExtractedText(mockExtractedText);
    setNerData(mockNerData);
    setIsProcessing(false);

    toast({
      title: "Processing Complete",
      description: "OCR extraction and NER processing completed successfully",
    });
  };

  const removeFile = (index: number) => {
    setUploadedFiles(files => files.filter((_, i) => i !== index));
  };

  const saveDocument = () => {
    toast({
      title: "Document Saved",
      description: "The processed document has been saved to the database",
    });
  };

  const exportAsDocx = () => {
    toast({
      title: "Export Started",
      description: "Document is being exported as DOCX format",
    });
  };

  return (
    <DashboardLayout userType="admin">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Document Upload & Processing</h1>
          <p className="text-muted-foreground">
            Upload FRA claim documents for OCR extraction and automated processing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* File Upload Section */}
          <div className="space-y-6">
            {/* Upload Area */}
            <Card className="glass-card p-6">
              <h2 className="text-lg font-semibold mb-4">Upload Documents</h2>
              
              <div
                className="border-2 border-dashed border-glass-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Drop files here or click to browse</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports PDF, DOC, DOCX, and image files (JPG, PNG)
                </p>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Select Files
                </Button>
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>

              {/* Processing Progress */}
              {isProcessing && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Processing documents...</span>
                    <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}
            </Card>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <Card className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-4">Uploaded Files</h2>
                <div className="space-y-3">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 glass-card rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="glass-card p-2 rounded-lg">
                          {file.type.includes('image') ? (
                            <Image className="h-4 w-4 text-secondary" />
                          ) : (
                            <FileText className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="glass-card p-1 rounded">
                          <Check className="h-4 w-4 text-status-verified" />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Processing Actions */}
            {uploadedFiles.length > 0 && !isProcessing && (
              <Card className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-4">Processing Options</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => processFiles(uploadedFiles)}>
                    <Scan className="mr-2 h-4 w-4" />
                    Run OCR
                  </Button>
                  <Button variant="outline" onClick={exportAsDocx}>
                    <Download className="mr-2 h-4 w-4" />
                    Export DOCX
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* OCR Results Section */}
          <div className="space-y-6">
            {/* Extracted Text */}
            <Card className="glass-card p-6">
              <h2 className="text-lg font-semibold mb-4">OCR Extracted Text</h2>
              <div className="space-y-4">
                <Textarea
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  placeholder="Extracted text will appear here after OCR processing..."
                  className="min-h-64 font-mono text-sm"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={saveDocument}>
                    Save Changes
                  </Button>
                  <Button variant="outline" size="sm">
                    Clear Text
                  </Button>
                </div>
              </div>
            </Card>

            {/* NER Extracted Data */}
            {nerData && (
              <Card className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-4">Extracted Information (NER)</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="claimant-name">Claimant Name</Label>
                      <Input
                        id="claimant-name"
                        value={nerData.claimantName || ""}
                        onChange={(e) => setNerData({...nerData, claimantName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="father-name">Father's Name</Label>
                      <Input
                        id="father-name"
                        value={nerData.fatherName || ""}
                        onChange={(e) => setNerData({...nerData, fatherName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="village">Village</Label>
                      <Input
                        id="village"
                        value={nerData.village || ""}
                        onChange={(e) => setNerData({...nerData, village: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="district">District</Label>
                      <Input
                        id="district"
                        value={nerData.district || ""}
                        onChange={(e) => setNerData({...nerData, district: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="claim-type">Claim Type</Label>
                      <Input
                        id="claim-type"
                        value={nerData.claimType || ""}
                        onChange={(e) => setNerData({...nerData, claimType: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="area-claimed">Area Claimed</Label>
                      <Input
                        id="area-claimed"
                        value={nerData.areaClaimed || ""}
                        onChange={(e) => setNerData({...nerData, areaClaimed: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button onClick={saveDocument}>
                      <Check className="mr-2 h-4 w-4" />
                      Save to Database
                    </Button>
                    <Button variant="outline">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Review & Verify
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DocumentUpload;