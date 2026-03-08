import { User, Globe, Mic, Brain, MapPin, CheckCircle2, LogOut } from 'lucide-react';

// Interface updated to match App.tsx requirements and resolve prop errors
interface ProfileProps {
  user: any; 
  onLogout: () => void;
  complaintCount: number;
  currentLang: string;
  setLang: (lang: string) => void;
}

export default function Profile({ user, onLogout, complaintCount, currentLang, setLang }: ProfileProps) {
  // Localized text dictionary for multi-lingual support
  const translations: any = {
    English: { 
      role: "Citizen", admin: "Municipal Admin", logout: "Sign Out",
      reports: "Total Reports", verified: "Verified Account", 
      langLabel: "App Language", langSub: "Updates all screens live", 
      voice: "Voice Transcription" 
    },
    Kannada: { 
      role: "ನಾಗರಿಕ", admin: "ಮುನ್ಸಿಪಲ್ ಅಡ್ಮಿನ್", logout: "ಸೈನ್ ಔಟ್",
      reports: "ಒಟ್ಟು ವರದಿಗಳು", verified: "ಪರಿಶೀಲಿಸಿದ ಖಾತೆ", 
      langLabel: "ಅಪ್ಲಿಕೇಶನ್ ಭಾಷೆ", langSub: "ಎಲ್ಲಾ ಪರದೆಗಳನ್ನು ಲೈವ್ ಆಗಿ ನವೀಕರಿಸಿ", 
      voice: "ಧ್ವನಿ ಪ್ರತಿಲೇಖನ" 
    },
    Hindi: { 
      role: "नागरिक", admin: "नगर पालिका प्रशासक", logout: "साइन आउट",
      reports: "कुल रिपोर्ट", verified: "सत्यापित खाता", 
      langLabel: "ऐप की भाषा", langSub: "सभी स्क्रीन लाइव अपडेट करें", 
      voice: "वॉयस ट्रांसक्रिप्शन" 
    },
    Tamil: { 
      role: "குடிமகன்", admin: "நகராட்சி நிர்வாகி", logout: "வெளியேறு",
      reports: "மொத்த புகார்கள்", verified: "சரிபார்க்கப்பட்ட கணக்கு", 
      langLabel: "பயன்பாட்டு மொழி", langSub: "அனைத்து திரைகளையும் நேரலையில் புதுப்பிக்கவும்", 
      voice: "குரல் டிரான்ஸ்கிரிப்ஷன்" 
    },
    Telugu: { 
      role: "పౌరుడు", admin: "మున్సిపల్ అడ్మిన్", logout: "సైన్ అవుట్",
      reports: "మొత్తం నివేదికలు", verified: "ధృవీకరించబడిన ఖాతా", 
      langLabel: "యాప్ భాష", langSub: "అన్ని స్క్రీన్‌లను ప్రత్యక్షంగా అప్‌డేట్ చేయండి", 
      voice: "వాయిస్ ట్రాన్స్క్రిప్షన్" 
    }
  };

  const t = translations[currentLang] || translations.English;

  const languages = [
    { name: 'English', native: 'English' },
    { name: 'Kannada', native: 'ಕನ್ನಡ' },
    { name: 'Hindi', native: 'हिन्दी' },
    { name: 'Telugu', native: 'తెలుగు' },
    { name: 'Tamil', native: 'தமிழ்' }
  ];

  return (
    <div className="p-5 pt-10 bg-gray-50 min-h-screen font-sans">
      {/* Profile Header - Displays authenticated user details from MongoDB */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-md border-4 border-green-500">
          <User size={48} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">{user?.name || "Capstone Student"}</h2>
        <p className="text-gray-500 text-sm italic">
          CrowdCivicFix Role: {user?.role === 'admin' ? t.admin : t.role}
        </p>
        <p className="text-[10px] text-gray-400 mt-1 font-medium">{user?.email}</p>
      </div>

      {/* Dynamic Stats Tracking */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-3xl border text-center shadow-sm">
          <p className="text-2xl font-black text-green-600">{complaintCount}</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold">{t.reports}</p>
        </div>
        <div className="bg-white p-4 rounded-3xl border text-center shadow-sm">
          <CheckCircle2 size={24} className="mx-auto text-blue-500 mb-1" />
          <p className="text-[10px] text-gray-400 uppercase font-bold">{t.verified}</p>
        </div>
      </div>

      {/* Feature Badges for Technical Documentation */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter text-purple-600 bg-purple-50">
          <Brain size={14}/> AI-Verified
        </div>
        <div className="flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter text-blue-600 bg-blue-50">
          <MapPin size={14}/> GPS-Tagged
        </div>
      </div>

      {/* Settings Card for Language & Session Management */}
      <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <Globe className="text-gray-400" size={20} />
            <div>
              <p className="text-sm font-bold text-gray-700">{t.langLabel}</p>
              <p className="text-[10px] text-gray-400">{t.langSub}</p>
            </div>
          </div>
          <select 
            value={currentLang} 
            onChange={(e) => setLang(e.target.value)}
            className="text-sm font-bold text-green-600 bg-transparent outline-none border-none focus:ring-0 cursor-pointer"
          >
            {languages.map(l => (
              <option key={l.name} value={l.name}>{l.native}</option>
            ))}
          </select>
        </div>

        {/* Secure Logout Action */}
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-4 text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span className="text-sm font-bold">{t.logout}</span>
        </button>
      </div>
    </div>
  );
}