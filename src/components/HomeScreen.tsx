import React from 'react';

// Updated interface to accept 'lang' prop to fix the App.tsx error
interface HomeScreenProps {
  complaints: any[];
  lang: string;
}

export default function HomeScreen({ complaints, lang }: HomeScreenProps) {
  // Translation dictionary for the home screen
  const translations: any = {
    English: {
      header: "CrowdCivicFix",
      sub: "Crowdsourced Civic Issue Reporting and Resolution System",
      activeTitle: "Active Reports"
    },
    Hindi: {
      header: "क्राउड-सिविक-फिक्स",
      sub: "कैपस्टोन प्रोजेक्ट समीक्षा प्रणाली",
      activeTitle: "सक्रिय रिपोर्ट"
    },
    Kannada: {
      header: "ಕ್ರೌಡ್-ಸಿವಿಕ್-ಫಿಕ್ಸ್",
      sub: "ಕ್ಯಾಪ್ಸ್ಟೋನ್ ಪ್ರಾಜೆಕ್ಟ್ ವಿಮರ್ಶೆ ವ್ಯವಸ್ಥೆ",
      activeTitle: "ಸಕ್ರಿಯ ವರದಿಗಳು"
    },
    Tamil: {
      header: "கிரவுட்-சிவிக்-பிக்ஸ்",
      sub: "கேப்ஸ்டோன் திட்ட ஆய்வு அமைப்பு",
      activeTitle: "செயலில் உள்ள புகார்கள்"
    },
    Telugu: {
      header: "క్రౌడ్-సివిక్-ఫిక్స్",
      sub: "క్యాప్‌స్టోన్ ప్రాజెక్ట్ సమీక్ష వ్యవస్థ",
      activeTitle: "క్రియాశీల నివేదికలు"
    }
  };

  // Select the correct translation based on the passed prop
  const t = translations[lang] || translations.English;

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Rebranded Header */}
      <header className="px-6 pt-10 pb-6 bg-green-600 text-white rounded-b-[40px] mb-6 shadow-lg transition-all">
        <h1 className="text-2xl font-black italic tracking-tight">{t.header}</h1>
        <p className="text-green-100 text-xs font-medium">{t.sub}</p>
      </header>

      <div className="px-6 space-y-4 pb-24">
        {/* Dynamic Title */}
        <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
          {t.activeTitle} 
          <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">
            {complaints.length}
          </span>
        </h2>

        {/* Real-time Complaint Feed */}
        {complaints.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 text-sm">No reports raised yet.</p>
          </div>
        ) : (
          complaints.map(report => (
            <div key={report.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm active:scale-[0.98] transition-transform">
              <div className="flex justify-between mb-2">
                <span className="text-[10px] font-black bg-gray-50 px-2 py-1 rounded text-gray-500 uppercase tracking-wider">
                  {report.category}
                </span>
                <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                  ● {report.status}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{report.title}</h3>
              <div className="flex items-center gap-1 text-gray-400">
                <p className="text-[11px] font-medium">{report.area}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}