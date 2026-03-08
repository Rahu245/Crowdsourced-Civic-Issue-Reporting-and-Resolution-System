import React, { useState } from 'react';

const Login = ({ onLogin, lang }: any) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'citizen' });
  const [loading, setLoading] = useState(false);

  const translations: any = {
    English: { login: "Login", signup: "Sign Up", email: "Email", pass: "Password", name: "Full Name", loading: "Processing..." },
    Kannada: { login: "ಲಾಗಿನ್", signup: "ಸೈನ್ ಅಪ್", email: "ಇಮೇಲ್", pass: "ಪಾಸ್ವರ್ಡ್", name: "ಪೂರ್ಣ ಹೆಸರು", loading: "ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ..." },
    Hindi: { login: "लॉगिन", signup: "साइन अप", email: "ईमेल", pass: "पासवर्ड", name: "पूरा नाम", loading: "प्रोसेसिंग..." }
  };
  
  const t = translations[lang] || translations.English;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Relative path for Vercel rewrites to handle correctly
    const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        // Store JWT and User data for persistence
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); 
        onLogin(data.user);
      } else {
        // Display specific error from backend (e.g., "User already exists")
        alert(data.msg || data.error || "Authentication failed");
      }
    } catch (err) {
      console.error("Auth error details:", err);
      alert("Cannot connect to server. Check your internet or Vercel logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 font-sans">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 transition-all">
        <h2 className="text-2xl font-black text-green-700 mb-6 italic">
          {isSignup ? t.signup : t.login}
        </h2>
        
        {isSignup && (
          <div className="mb-4">
            <input 
              type="text" 
              placeholder={t.name} 
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>
        )}
        
        <div className="mb-4">
          <input 
            type="email" 
            placeholder={t.email} 
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            required 
          />
        </div>
        
        <div className="mb-6">
          <input 
            type="password" 
            placeholder={t.pass} 
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
            required 
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className={`w-full p-3 rounded-xl font-bold shadow-lg transition-all ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 active:scale-95'
          }`}
        >
          {loading ? t.loading : (isSignup ? t.signup : t.login)}
        </button>
        
        <p className="mt-6 text-sm text-gray-500 text-center cursor-pointer hover:text-green-600 font-medium" 
           onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Already have an account? Login" : "New here? Create an account"}
        </p>
      </form>
    </div>
  );
};

export default Login;