export const isAuthenticated = () => {
  // Replace with actual logic
  return localStorage.getItem('user'); // or use context/auth state
};

// export const isAuthenticated = () => {
//   return !!localStorage.getItem('token');
// };