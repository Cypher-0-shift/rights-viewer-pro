import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Map, 
  Layers, 
  Info, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  MapPin,
  Satellite,
  Navigation
} from "lucide-react";

const MapView = () => {
  const [showClaims, setShowClaims] = useState(true);
  const [showBoundaries, setShowBoundaries] = useState(true);
  const [showVillages, setShowVillages] = useState(false);
  const [mapStyle, setMapStyle] = useState("satellite");

  // Mock data for map info
  const mapStats = [
    { label: "Total Claims", value: "2,847", color: "text-primary" },
    { label: "Verified", value: "1,923", color: "text-status-verified" },
    { label: "Pending", value: "624", color: "text-status-pending" },
    { label: "Area Covered", value: "15.2K ha", color: "text-secondary" }
  ];

  return (
    <DashboardLayout userType="user">
      <div className="h-full flex">
        {/* Map Controls Sidebar */}
        <div className="w-80 bg-background border-r p-4 space-y-4 overflow-y-auto">
          <div>
            <h2 className="text-xl font-bold mb-4">Interactive GIS Map</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Explore forest rights claims and geographical boundaries
            </p>
          </div>

          {/* Map Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Map Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mapStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <span className={`text-sm font-semibold ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Layer Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Map Layers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Claims Markers</label>
                <Switch checked={showClaims} onCheckedChange={setShowClaims} />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">District Boundaries</label>
                <Switch checked={showBoundaries} onCheckedChange={setShowBoundaries} />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Village Points</label>
                <Switch checked={showVillages} onCheckedChange={setShowVillages} />
              </div>
            </CardContent>
          </Card>

          {/* Map Style */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Map Style</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant={mapStyle === "satellite" ? "default" : "ghost"} 
                size="sm" 
                className="w-full justify-start"
                onClick={() => setMapStyle("satellite")}
              >
                <Satellite className="mr-2 h-4 w-4" />
                Satellite
              </Button>
              <Button 
                variant={mapStyle === "terrain" ? "default" : "ghost"} 
                size="sm" 
                className="w-full justify-start"
                onClick={() => setMapStyle("terrain")}
              >
                <Map className="mr-2 h-4 w-4" />
                Terrain
              </Button>
              <Button 
                variant={mapStyle === "street" ? "default" : "ghost"} 
                size="sm" 
                className="w-full justify-start"
                onClick={() => setMapStyle("street")}
              >
                <Navigation className="mr-2 h-4 w-4" />
                Street
              </Button>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-status-verified rounded-full"></div>
                <span className="text-xs">Verified Claims</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-status-pending rounded-full"></div>
                <span className="text-xs">Pending Claims</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-status-rejected rounded-full"></div>
                <span className="text-xs">Rejected Claims</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-primary bg-transparent"></div>
                <span className="text-xs">District Boundaries</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          {/* Map Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="glass-card p-8 rounded-xl">
                <Map className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Interactive GIS Map</h3>
                <p className="text-muted-foreground mb-4">
                  This would display an interactive map with forest rights claims,<br />
                  district boundaries, and geographical features.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">
                    <MapPin className="mr-1 h-3 w-3" />
                    Claim Locations
                  </Badge>
                  <Badge variant="secondary">Boundary Overlays</Badge>
                  <Badge variant="secondary">Satellite Imagery</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button variant="secondary" size="icon">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* Info Panel */}
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-4 w-4 text-primary" />
                  <span className="font-medium">Map Information</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Click on any claim marker to view detailed information. Use the layer controls to toggle different data overlays. 
                  The map supports zooming, panning, and switching between satellite and terrain views.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MapView;