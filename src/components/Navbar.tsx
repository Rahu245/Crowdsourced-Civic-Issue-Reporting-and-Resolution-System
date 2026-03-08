import { Home, BarChart3, Plus, Map as MapIcon, User } from 'lucide-react';

// Explicit interface to resolve the App.tsx prop mismatch
interface NavbarProps {
  setPage: (p: string) => void;
  currentPage: string;
  userRole?: string; // Optional prop to handle Citizen vs Admin navigation
}

export default function Navbar({ setPage, currentPage, userRole }: NavbarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-end pb-4 pt-2 px-2 z-50">
      {/* Home Navigation */}
      <NavItem icon={<Home size={22} />} label="Home" active={currentPage === 'home'} onClick={() => setPage('home')} />
      
      {/* Analytics: Essential for Admin overview */}
      <NavItem icon={<BarChart3 size={22} />} label="Stats" active={currentPage === 'stats'} onClick={() => setPage('stats')} />
      
      {/* Central Action Button: Logic can be extended for Admin-specific tasks */}
      <button 
        onClick={() => setPage('report')}
        className="bg-green-600 text-white p-4 rounded-2xl shadow-lg shadow-green-200 -mt-8 mb-2 active:scale-95 transition-transform"
        aria-label="Report Issue"
      >
        <Plus size={28} strokeWidth={3} />
      </button>

      {/* Map View: Dynamic markers for civic issues */}
      <NavItem icon={<MapIcon size={22} />} label="Map" active={currentPage === 'map'} onClick={() => setPage('map')} />
      
      {/* Profile: Includes a red notification dot for Admin status */}
      <NavItem 
        icon={
          <div className="relative">
            <User size={22} />
            {userRole === 'admin' && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm" />
            )}
          </div>
        } 
        label="Profile" 
        active={currentPage === 'profile'} 
        onClick={() => setPage('profile')} 
      />
    </nav>
  );
}

/**
 * Reusable NavItem component for consistent styling and active states
 */
function NavItem({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick} 
      className={`flex flex-col items-center gap-1 flex-1 transition-all duration-200 ${
        active ? 'text-green-600 scale-105' : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      <div className={`${active ? 'bg-green-50 p-2 rounded-xl' : ''}`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold tracking-tight uppercase">{label}</span>
    </button> 
  );
}