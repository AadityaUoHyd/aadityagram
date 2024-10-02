import axios from 'axios';

// API call for following/unfollowing a user
export const followOrUnfollowUser = async (userId) => {
    try {
        //const res = await axios.post(`https://instaclone-g9h5.onrender.com/api/v1/user/followorunfollow/${userId}`,
        const res = await axios.post(`http://localhost:8000/api/v1/user/followorunfollow/${userId}`, {}, 
            { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error following/unfollowing user", error);
        return { success: false, message: 'Error occurred' };
    }
};
