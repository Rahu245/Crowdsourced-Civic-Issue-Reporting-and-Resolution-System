import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeScreen from './components/HomeScreen';
import ReportForm from './components/ReportForm';
import Analytics from './components/Analytics';
import MapView from './components/Map';
import Profile from './components/Profile';
import Login from './components/Login';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [complaints, setComplaints] = useState<any[]>([]);
  const [userLoc, setUserLoc] = useState<[number, number]>([12.9716, 77.5946]);
  const [user, setUser] = useState<any>(null);

  const API_URL = '/api/reports';

  // Persistent Session Check
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Fetch live reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setComplaints(data);
      } catch (err) { console.error("Fetch error:", err); }
    };
    fetchReports();
  }, []);

  // Real-time GPS
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLoc([pos.coords.latitude, pos.coords.longitude]),
      () => console.log("Location denied")
    );
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const addComplaint = async (newReport: any) => {
    const reportData = { 
      ...newReport, 
      longitude: userLoc[1], 
      latitude: userLoc[0],
      userId: user?.id // Optional chaining fixes the error
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(reportData)
      });

      if (res.ok) {
        const saved = await res.json();
        setComplaints([saved, ...complaints]);
        setCurrentPage('home');
      }
    } catch (err) { console.error("Submission failed:", err); }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {!user ? (
        <Login onLogin={handleLogin} lang={currentLanguage} />
      ) : (
        <>
          <Navbar 
            setPage={setCurrentPage} 
            currentPage={currentPage} 
            userRole={user?.role} // Optional chaining fixes the error
          />
          <main className="pb-24">
            {currentPage === 'home' && <HomeScreen complaints={complaints} lang={currentLanguage} />}
            {currentPage === 'report' && <ReportForm onReport={addComplaint} lang={currentLanguage} />}
            {currentPage === 'stats' && <Analytics complaints={complaints} lang={currentLanguage} />}
            {currentPage === 'map' && <MapView complaints={complaints} userLoc={userLoc} lang={currentLanguage} />}
            {currentPage === 'profile' && (
              <Profile 
                user={user} // Pass full user object
                onLogout={handleLogout}
                complaintCount={complaints.filter(c => c.userId === user?.id).length} 
                currentLang={currentLanguage} 
                setLang={setCurrentLanguage} 
              />
            )}
          </main>
        </>
      )}
    </div>
  );
}
interface NavbarProps {
  setPage: (p: string) => void;
  currentPage: string;
  userRole?: string; // Add this line to accept the role from App.tsx
}
export default App;