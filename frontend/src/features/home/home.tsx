<<<<<<< HEAD
import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserList, searchUsers } from '../../shared/config/api';
import './home.css';

interface User {
  profilePicture?: {
    url: string;
    public_id: string;
  } | null;
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  skills?: string[];
  location?: string;
  quickStats?: {
    connections: number;
    projects: number;
    endorsements: number;
  };
}

function Home() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        const userString = localStorage.getItem('currentUser');
        if (userString) {
            try {
                const userData = JSON.parse(userString);
                setCurrentUser(userData);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
        
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError('');
        
        try {
            const response = await getUserList();
            console.log('Fetched users:', response.data);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to load users. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!searchQuery.trim()) {
            fetchUsers();
            return;
        }
        
        setLoading(true);
        setError('');
        
        try {
            const response = await searchUsers(searchQuery);
            setUsers(response.data);
        } catch (error: any) {
            console.error('Error searching users:', error);
            setError('Failed to search users. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleConnectClick = (userId: string) => {
        if (currentUser && userId === currentUser._id) {
            navigate('/profile');
        } else {
            navigate(`/user/${userId}`);
        }
    };

    return (
        <div className="home-container">
            <div className="home-layout">
                {/* Left sidebar with profile summary */}
                {currentUser && (
                    <div className="sidebar">
                        <div className="profile-summary">
                            <div className="profile-bg"></div>
                            <div className="profile-content">
                                <div className="profile-avatar">
                                    {currentUser.profilePicture?.url ? (
                                        <img 
                                            src={currentUser.profilePicture.url} 
                                            alt={currentUser.username}
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.nextElementSibling?.setAttribute('style', 'display: flex');
                                            }}
                                        />
                                    ) : (
                                        <div className="avatar-placeholder">
                                            {currentUser.username.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <h2 className="profile-name">{currentUser.username}</h2>
                                <p className="profile-headline">{currentUser.bio || "No bio available"}</p>
                                <button 
                                    className="connect-button"
                                    onClick={() => navigate('/profile')}
                                >
                                    View My Profile
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main content */}
                <div className="main-content">
                    {currentUser && (
                        <div className="welcome-banner">
                            <h1>Welcome, {currentUser.username}!</h1>
                            <p>Connect with professionals in your network</p>
                        </div>
                    )}
                    
                    <div className="search-section">
                        <h2>Find People</h2>
                        <form className="search-form" onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search by username..."
                                className="search-input"
                            />
                            <button type="submit" className="search-button">Search</button>
                        </form>
                    </div>

                    <div className="users-section">
                        <h2>People You May Know</h2>
                        
                        {loading && <div className="loading">Loading...</div>}
                        
                        {error && <div className="error-message">{error}</div>}
                        
                        {!loading && !error && users.length === 0 && (
                            <div className="no-users">No users found</div>
                        )}
                        
                        <div className="users-grid">
                            {users.map(user => (
                                <div key={user.id} className="user-card">
                                    <div className="user-avatar">
                                        {user.profilePicture?.url ? (
                                            <img 
                                                src={user.profilePicture.url} 
                                                alt={user.username}
                                                className="profile-image"
                                                onError={(e) => {
                                                    console.error('Failed to load image for user:', user.username);
                                                    e.currentTarget.style.display = 'none';
                                                    e.currentTarget.nextElementSibling?.setAttribute('style', 'display: flex');
                                                }}
                                            />
                                        ) : null}
                                        <div 
                                            className="avatar-placeholder"
                                            style={{ display: user.profilePicture?.url ? 'none' : 'flex' }}
                                        >
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                    </div>
                                    
                                    <h3 className="user-name">{user.username}</h3>
                                    <p className="user-email">{user.email}</p>
                                    
                                    {user.location && (
                                        <p className="user-location">📍 {user.location}</p>
                                    )}
                                    
                                    {user.bio && (
                                        <p className="user-bio">{user.bio}</p>
                                    )}
                                    
                                    {user.skills && user.skills.length > 0 && (
                                        <div className="user-skills">
                                            {user.skills.slice(0, 3).map((skill, index) => (
                                                <span key={index} className="skill-tag">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {user.quickStats && (
                                        <div className="user-stats">
                                            <div className="stat">
                                                <span className="stat-number">{user.quickStats.connections}</span>
                                                <span className="stat-label">Connections</span>
                                            </div>
                                            <div className="stat">
                                                <span className="stat-number">{user.quickStats.projects}</span>
                                                <span className="stat-label">Projects</span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <button 
                                        className="connect-button"
                                        onClick={() => handleConnectClick(user.id)}
                                    >
                                        {currentUser && user.id === currentUser._id ? 'View Profile' : 'View Profile'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
=======
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './home.css';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { getUserList, searchUsers } from '../../shared/config/api';

interface IUser {
  id: string;
  username: string;
  email: string;
}

function Home() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState<IUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch all users when component mounts - REMOVED userList from dependency array
  useEffect(() => {
    setLoading(true);
    getUserList()
      .then((res) => {
        console.log("User data:", res.data);
        setUserList(res.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Empty dependency array prevents infinite loops

  // Handle search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      // If search is empty, fetch all users
      setLoading(true);
      getUserList()
        .then((res) => {
          setUserList(res.data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          toast.error("Failed to load users");
        })
        .finally(() => {
          setLoading(false);
        });
      return;
    }
    
    setLoading(true);
    searchUsers(searchQuery)
      .then((res) => {
        setUserList(res.data);
        if (res.data.length === 0) {
          toast.info("No users found matching your search.");
        }
      })
      .catch((error) => {
        console.error("Error searching users:", error);
        toast.error("Failed to search users");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="header-navigation">
        <h1>Welcome to Our Application</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      
      <div className="search-section">
        <h2>Find other users</h2>
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <div className="search-box">
            <input 
              className="search-input" 
              type="text" 
              placeholder="Search users by username..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button 
              className="search-button" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          <div className="search-results">
            {loading ? (
              <p className="loading-message">Loading users...</p>
            ) : userList.length > 0 ? (
              <ul className="user-list">
                {userList.map(user => (
                  <li key={user.id} className="user-item">
                    <span className="user-username">{user.username}</span>
                    <span className="user-email">{user.email}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users found.</p>
            )}  
          </div>
        </form>
      </div>
    </div>
  );
>>>>>>> e383b20c27efaae52f850442894360ca316df6b6
}

export default Home;