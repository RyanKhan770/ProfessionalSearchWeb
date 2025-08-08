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
}

export default Home;