import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Home, Search, PlusCircle, LogOut, User as UserIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services/authService'
import toast from 'react-hot-toast'

export function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleLogout = async () => {
    try {
      await authService.logout()
      toast.success('Logged out successfully')
      navigate('/login')
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="w-6 h-6" /> },
    { path: '/search', label: 'Search', icon: <Search className="w-6 h-6" /> },
    { path: '/add', label: 'Add New', icon: <PlusCircle className="w-6 h-6" /> },
  ]

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-bg-secondary w-full">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-bg-primary border-r border-border-subtle p-6 h-screen sticky top-0">
        <div className="mb-10 text-2xl font-bold tracking-tight text-text-primary">
          LyricVault
        </div>
        
        {user && (
          <div className="mb-8 flex items-center gap-3 p-3 bg-bg-secondary rounded-xl border border-border-subtle">
            <div className="w-10 h-10 rounded-full bg-interactive text-bg-primary flex items-center justify-center flex-shrink-0">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                <UserIcon className="w-5 h-5" />
              )}
            </div>
            <div className="overflow-hidden">
               <p className="text-sm font-bold text-text-primary truncate">{user.displayName || 'User'}</p>
               <p className="text-xs text-interactive/70 truncate">{user.email}</p>
            </div>
          </div>
        )}

        <nav className="flex flex-col gap-4 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors focus-ring
                ${location.pathname === item.path 
                  ? 'bg-interactive text-bg-primary' 
                  : 'text-interactive hover:bg-bg-secondary hover:text-text-primary'
                }`}
            >
              {item.icon}
              <span className="font-medium text-lg">{item.label}</span>
            </Link>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 p-3 rounded-lg text-interactive hover:bg-red-50 hover:text-red-600 transition-colors focus-ring"
        >
          <LogOut className="w-6 h-6" />
          <span className="font-medium text-lg">Logout</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full p-4 md:p-8 pb-32 md:pb-8 max-w-7xl mx-auto overflow-y-auto">
         {/* Mobile Header (Shows Avatar & Logout) */}
        <header className="md:hidden flex justify-between items-center mb-6 glass-header -mx-4 -mt-4 p-4 sticky top-0 z-40 bg-bg-primary">
            <div className="text-xl font-bold tracking-tight text-text-primary">
              LyricVault
            </div>
            
            {user && (
              <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full bg-interactive text-bg-primary flex items-center justify-center flex-shrink-0">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <UserIcon className="w-4 h-4" />
                  )}
                </div>
                <button onClick={handleLogout} className="text-interactive hover:text-red-600 p-1">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
        </header>

        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-header flex justify-around items-center h-20 px-6 z-50">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors relative
              ${location.pathname === item.path 
                ? 'text-interactive' 
                : 'text-border-subtle hover:text-interactive'
              }`}
          >
            {item.icon}
            <span className="text-xs font-semibold">{item.label}</span>
            {location.pathname === item.path && (
               <div className="absolute top-2 w-1 h-1 rounded-full bg-interactive"></div>
            )}
          </Link>
        ))}
      </nav>
    </div>
  )
}
