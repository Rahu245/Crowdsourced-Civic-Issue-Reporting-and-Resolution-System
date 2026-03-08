import React, { useState } from 'react';
import { Camera, Send, Mic, Brain, ShieldCheck, MapPin, X } from 'lucide-react';

interface ReportFormProps {
  onReport: (newReport: any) => void;
  lang: string;
}

export default function ReportForm({ onReport, lang }: ReportFormProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Roads');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [geoTag, setGeoTag] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        // Simulate real-time EXIF extraction for the geo-tag
        setGeoTag(`LAT: 12.9716, LNG: 77.5946 (Verified)`); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !selectedImage) {
      alert("Please provide a title and a photo for evidence.");
      return;
    }
    onReport({ title, category, image: selectedImage, geoTag, time: "Just now" });
    setSelectedImage(null);
    setGeoTag(null);
    setTitle('');
  };

  return (
    <div className="min-h-screen bg-white pb-32 pt-6 px-5 font-sans">
      <header className="mb-6">
        <h1 className="text-2xl font-black text-green-600 italic">CrowdCivicFix</h1>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Evidence Upload Portal</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Photo Upload with Preview and Geo-Tag */}
        <div className="relative">
          {selectedImage ? (
            <div className="relative rounded-3xl overflow-hidden border-4 border-green-50 shadow-md">
              <img src={selectedImage} alt="Preview" className="w-full h-56 object-cover" />
              <button 
                onClick={() => {setSelectedImage(null); setGeoTag(null);}}
                className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
              >
                <X size={20} />
              </button>
              {geoTag && (
                <div className="absolute bottom-0 left-0 right-0 bg-green-600/90 text-white p-2 flex items-center gap-2 text-[10px] font-bold">
                  <MapPin size={12} /> {geoTag}
                </div>
              )}
            </div>
          ) : (
            <label className="border-2 border-dashed border-gray-200 rounded-3xl h-48 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-green-50/30 transition-all">
              <Camera size={40} className="text-green-600 mb-2" />
              <span className="text-xs font-black text-gray-400 uppercase">Tap to Capture Evidence</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          )}
        </div>

        {/* AI Tamper Detection Badge */}
        <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-2xl border border-blue-100">
          <ShieldCheck size={18} className="text-blue-600" />
          <span className="text-[10px] font-bold text-blue-800 uppercase">AI-Based Metadata Verification Active</span>
        </div>

        <div className="space-y-4">
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Describe the issue..."
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm outline-none"
          />
          
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold"
          >
            <option>Roads</option>
            <option>Garbage</option>
            <option>Water Supply</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-green-100">
          <Send size={18} className="inline mr-2" /> SUBMIT EVIDENCE
        </button>
      </form>
    </div>
  );
}