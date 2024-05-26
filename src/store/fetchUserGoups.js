import axios from 'axios';

export async function fetchUserGroups(token) {
  try {
    const response = await axios.get(`https://chatapp-a4449-default-rtdb.firebaseio.com/userGroups.json?auth=${token}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user groups:', error);
    throw error;
  }
}
