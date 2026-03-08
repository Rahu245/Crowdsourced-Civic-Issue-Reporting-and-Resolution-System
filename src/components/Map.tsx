import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Re-centers the map view dynamically when the user's location is detected
function RecenterMap({ coords }: { coords: [number, number] }) {
  const map = useMap();
  map.setView(coords, 13);
  return null;
}

interface MapViewProps {
  complaints: any[];
  userLoc: [number, number];
  lang: string;
}

export default function MapView({ complaints, userLoc, lang }: MapViewProps) {
  // Casting to bypass "Error 2" (TS2322) prop-types mismatch during build
  const MapElement = MapContainer as any;
  const TileElement = TileLayer as any;

  // Translation dictionary for localized UI
  const translations: any = {
    English: { title: "CrowdCivicFix Live Map", reports: "Reports" },
    Hindi: { title: "लाइव समस्या मानचित्र", reports: "रिपोर्ट" },
    Kannada: { title: "ಲೈವ್ ಸಮಸ್ಯೆ ನಕ್ಷೆ", reports: "ವರದಿಗಳು" },
    Tamil: { title: "நேரடி வரைபடம்", reports: "புகார்கள்" },
    Telugu: { title: "లైవ్ మ్యాప్", reports: "నివేదికలు" }
  };

  const t = translations[lang] || translations.English;

  return (
    <div className="h-screen w-full flex flex-col font-sans">
      {/* Header section with live complaint counter */}
      <div className="p-4 bg-white border-b flex justify-between items-center z-10 shadow-sm">
        <h1 className="font-bold text-green-700 italic tracking-tight">{t.title}</h1>
        <span className="text-[10px] bg-green-100 px-3 py-1 rounded-full text-green-700 font-black uppercase tracking-wider">
          {complaints.length} {t.reports}
        </span>
      </div>

      <div className="flex-grow z-0">
        <MapElement center={userLoc} zoom={13} className="h-full w-full">
          <TileElement 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          />
          <RecenterMap coords={userLoc} />
          
          {/* Enhanced marker rendering with geo-spatial data extraction */}
          {complaints.map((c: any) => {
            // Support both standard coordinates and MongoDB GeoJSON format
            const lat = c.location?.coordinates ? c.location.coordinates[1] : (c.latitude || c.lat);
            const lng = c.location?.coordinates ? c.location.coordinates[0] : (c.longitude || c.lng);

            // Skip rendering if coordinates are missing to avoid Leaflet errors
            if (lat === undefined || lng === undefined) return null;

            return (
              <Marker key={c._id || c.id} position={[lat, lng]}>
                <Popup>
                  <div className="p-1 min-w-[140px]">
                    <p className="font-bold text-gray-900 leading-tight mb-1">{c.title}</p>
                    
                    {/* Display Cloudinary-hosted evidence image if available */}
                    {c.image && (
                      <img 
                        src={c.image} 
                        alt="evidence" 
                        className="w-full h-20 object-cover rounded mb-2 border" 
                      />
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black text-blue-500 uppercase">{c.category}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        c.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapElement>
      </div>
    </div>
  );
}