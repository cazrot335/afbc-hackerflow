// Function to store the token
export const storeToken = (token) => {
  localStorage.setItem('jwtToken', token);
};

// Function to retrieve the token
export const getToken = () => {
  return localStorage.getItem('jwtToken'); // Correct the token key
};

// Function to remove the token
export const removeToken = () => {
  localStorage.removeItem('jwtToken');
};

// Function to check if the token is expired
export const isTokenExpired = (token) => {
  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Invalid token:', error);
    return true; // Treat invalid tokens as expired
  }
};