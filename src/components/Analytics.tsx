import React from 'react';

// Updated interface to include lang prop to fix the App.tsx error
interface AnalyticsProps {
  complaints: any[];
  lang: string;
}

export default function Analytics({ complaints, lang }: AnalyticsProps) {
  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;
  const rate = total > 0 ? ((resolved / total) * 100).toFixed(0) : 0;

  // Translation dictionary for localized analytics
  const translations: any = {
    English: {
      title: "CrowdCivicFix Insights",
      live: "Live Reports",
      rate: "Resolution Rate",
      breakdown: "Category Breakdown",
      cats: ["Roads", "Garbage", "Water Supply"]
    },
    Hindi: {
      title: "क्राउड-सिविक-फिक्स इनसाइट्स",
      live: "लाइव रिपोर्ट",
      rate: "समाधान दर",
      breakdown: "श्रेणी विवरण",
      cats: ["सड़कें", "कचरा", "जलापूर्ति"]
    },
    Kannada: {
      title: "ಕ್ರೌಡ್-ಸಿವಿಕ್-ಫಿಕ್ಸ್ ಅಂಕಿಅಂಶ",
      live: "ಲೈವ್ ವರದಿಗಳು",
      rate: "ಪರಿಹಾರ ದರ",
      breakdown: "ವರ್ಗದ ವಿಂಗಡಣೆ",
      cats: ["ರಸ್ತೆಗಳು", "ಕಸ", "ನೀರು ಸರಬರಾಜು"]
    },
    Tamil: {
      title: "புள்ளிவிவரங்கள்",
      live: "நேரடி புகார்கள்",
      rate: "தீர்வு விகிதம்",
      breakdown: "வகை விவரம்",
      cats: ["சாலைகள்", "குப்பை", "குடிநீர்"]
    },
    Telugu: {
      title: "పౌర గణాంకాలు",
      live: "లైవ్ నివేదికలు",
      rate: "పరిష్కార రేటు",
      breakdown: "వర్గీకరణ వివరాలు",
      cats: ["రోడ్లు", "చెత్త", "నీటి సరఫరా"]
    }
  };

  const t = translations[lang] || translations.English;

  return (
    <div className="p-6 pt-10 font-sans">
      {/* Localized Header */}
      <h1 className="text-2xl font-bold text-green-700 mb-6 tracking-tight">{t.title}</h1>
      
      <div className="grid gap-4">
        <StatCard label={t.live} value={total} />
        <StatCard label={t.rate} value={`${rate}%`} highlight />
        
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">
            {t.breakdown}
          </h3>
          {/* Mapping translated categories */}
          {t.cats.map((catLabel: string, index: number) => {
            // We map English keys for data filtering but show translated labels
            const dataKeys = ['Roads', 'Garbage', 'Water Supply'];
            const count = complaints.filter(c => c.category === dataKeys[index]).length;
            
            return (
              <div key={catLabel} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm font-medium text-gray-600">{catLabel}</span>
                <span className="font-bold text-gray-900">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, highlight }: any) {
  return (
    <div className={`p-6 rounded-3xl border shadow-sm flex justify-between items-center transition-all ${highlight ? 'bg-green-50 border-green-100' : 'bg-white border-gray-100'}`}>
      <span className="font-bold text-sm text-gray-500">{label}</span>
      <span className="text-2xl font-black text-gray-800 tracking-tighter">{value}</span>
    </div>
  );
}