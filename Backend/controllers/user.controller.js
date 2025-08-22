import User from '../models/user.model.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    // Find all users but exclude password field
    const users = await User.find({}, { password: 0 });
    
    // Format the response to match your frontend interface
    const formattedUsers = users.map(user => ({
      id: user._id,
      username: user.username,
      email: user.email
    }));
    
    return res.status(200).json(formattedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Search users by username
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    // Case-insensitive search for username
    const users = await User.find(
      { username: { $regex: query, $options: 'i' } }, 
      { password: 0 }
    );
    
    // Format the response
    const formattedUsers = users.map(user => ({
      id: user._id,
      username: user.username,
      email: user.email
    }));
    
    return res.status(200).json(formattedUsers);
  } catch (error) {
    console.error('Error searching users:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id, { password: 0 });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Format the response
    const formattedUser = {
      id: user._id,
      username: user.username,
      email: user.email
    };
    
    return res.status(200).json(formattedUser);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};