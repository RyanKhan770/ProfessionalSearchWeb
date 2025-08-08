import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { updateProfile } from '../../shared/config/api'; // Changed from register to updateProfile
import { toast } from 'react-toastify';
import './profile.css';

// Define the user interface
interface IUser {
    id?: string;
    username: string;
    email: string;
}

function Profile() {
    const [formData, setFormData] = useState<IUser>({ username: '', email: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Load current user data from localStorage
    React.useEffect(() => {
        const currentUserString = localStorage.getItem('currentUser');
        if (currentUserString) {
            try {
                const currentUser: IUser = JSON.parse(currentUserString);
                setFormData({ 
                    username: currentUser.username || '', 
                    email: currentUser.email || '' 
                });
            } catch (error) {
                console.error('Error parsing user data:', error);
                toast.error('Error loading user data');
            }
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (loading) return;

        // Basic validation
        if (!formData.username.trim() || !formData.email.trim()) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);
        updateProfile(formData) // Changed from register to updateProfile
            .then((response) => {
                toast.success("Profile updated successfully!");
                // Update localStorage with new data
                localStorage.setItem("currentUser", JSON.stringify(formData));
                navigate("/home");
            })
            .catch((error) => {
                console.error('Profile update error:', error);
                const message = error.response?.data?.message || "Profile update failed";
                toast.error(message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleCancel = () => {
        navigate("/home");
    };

    return (
        <div className="profile-container">
            <h1>Profile Page</h1>
            <form onSubmit={handleSubmit} className="profile-form">
                <label className="label-tag">
                    Username:
                    <input 
                        className="input-tag" 
                        onChange={handleChange} 
                        type="text" 
                        value={formData.username} 
                        name="username" 
                        required 
                        placeholder="Enter your username"
                    />
                </label>
                <br />
                <label className="label-tag">
                    Email:
                    <input 
                        className="input-tag" 
                        onChange={handleChange} 
                        type="email" 
                        value={formData.email} 
                        name="email" 
                        required 
                        placeholder="Enter your email"
                    />
                </label>
                <br />
                <div className="button-group">
                    <button type="submit" disabled={loading} className="update-button">
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                    <button type="button" onClick={handleCancel} className="cancel-button">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Profile;