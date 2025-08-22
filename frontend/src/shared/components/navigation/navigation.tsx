import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './navigation.css';
import { useState, useEffect } from 'react';

// SVG Icons
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7 5 3.18V2h3v5.09z"/>
  </svg>
);

const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 16v6H3v-6c0-2.5 1-3 4.5-3s4.5.5 4.5 3zm-2.5-7A3.5 3.5 0 106 9a3.5 3.5 0 003.5 0m5 0v3h6v-3zm0 5v3h6v-3z"/>
  </svg>
);

const LoginIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M10 17v-3H3v-4h7V7l5 5-5 5m0-15h9a2 2 0 012 2v16a2 2 0 01-2 2h-9a2 2 0 01-2-2v-2h2v2h9V4h-9v2H8V4a2 2 0 012-2z"/>
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2v-3h2v3h14V5H5v3H3V5a2 2 0 012-2m4 6V7l5 5-5 5v-2H2v-4h7z"/>
  </svg>
);

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('currentUser');
    
    if (token && userString) {
      try {
        const userData = JSON.parse(userString);
        console.log('Navigation user data:', userData);
        setCurrentUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    } else {
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
  }, [location]);

  useEffect(() => {
    const handleStorageChange = () => {
      const userString = localStorage.getItem('currentUser');
      if (userString) {
        try {
          const userData = JSON.parse(userString);
          setCurrentUser(userData);
        } catch (error) {
          console.error('Error parsing updated user data:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    window.addEventListener('userDataUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userDataUpdated', handleStorageChange);
    };
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };
  
  const handleLogin = () => {
    navigate('/login');
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to={isAuthenticated ? "/home" : "/login"}>LinkedIn</Link>
        </div>
        
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        {isAuthenticated && (
          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li>
              <Link 
                to="/home" 
                className={location.pathname === '/home' ? 'active' : ''}
              >
                <HomeIcon />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/profile" 
                className={location.pathname === '/profile' ? 'active' : ''}
              >
                <ProfileIcon />
                <span>Profile</span>
              </Link>
            </li>
          </ul>
        )}
        
        <div className={`nav-user ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {isAuthenticated && currentUser ? (
            <div className="user-info">
              <div className="nav-user-avatar">
                {currentUser.profilePicture?.url ? (
                  <img 
                    src={currentUser.profilePicture.url} 
                    alt={currentUser.username}
                    className="nav-profile-image"
                    onError={(e) => {
                      console.error('Failed to load nav image for user:', currentUser.username);
                      // Hide image and show placeholder on error
                      e.currentTarget.style.display = 'none';
                      const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                      if (placeholder) {
                        placeholder.style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                <div 
                  className="nav-avatar-placeholder"
                  style={{ display: currentUser.profilePicture?.url ? 'none' : 'flex' }}
                >
                  {currentUser.username ? currentUser.username.charAt(0).toUpperCase() : 'U'}
                </div>
              </div>
              
              <span className="username">{currentUser.username}</span>
              <button className="auth-button logout" onClick={handleLogout}>
                <LogoutIcon /> Logout
              </button>
            </div>
          ) : (
            <div className="guest-info">
              <button className="auth-button login" onClick={handleLogin}>
                <LoginIcon /> Sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;