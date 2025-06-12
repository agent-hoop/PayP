
// Mock user database - In a real app, this would come from your backend
export const mockUsers = [
  {
    id: 1,
    name: "John Smith",
    username: "@johnsmith",
    email: "john.smith@gmail.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
    verified: true
  },
  {
    id: 2,
    name: "Sarah Johnson",
    username: "@sarahj",
    email: "sarah.johnson@gmail.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
    verified: false
  },
  {
    id: 3,
    name: "Mike Wilson",
    username: "@mikew",
    email: "mike.wilson@gemail.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format",
    verified: true
  },
  {
    id: 4,
    name: "Emma Davis",
    username: "@emmad",
    email: "emma.davis@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c3c3?w=150&h=150&fit=crop&crop=face&auto=format",
    verified: true
  },
  {
    id: 5,
    name: "Alex Brown",
    username: "@alexb",
    email: "alex.brown@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
    verified: false
  },
  {
    id: 6,
    name: "Nibesh Hoop",
    username: "@nibesh",
    email: "nibesh101@gemail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face&auto=format",
    verified: true
  },
  {
    id: 7,
    name: "Nitesh",
    username: "@nitesh",
    email: "nitesh101@gemail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face&auto=format",
    verified: true
  }
];

// Search function to find users based on query
export const searchUsers = (query) => {
  if (!query || query.length < 2) return [];
  
  const searchTerm = query.toLowerCase();
  
  return mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm) ||
    user.username.toLowerCase().includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm)
  ).slice(0, 5); // Limit to 5 results
};



