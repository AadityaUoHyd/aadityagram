import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { followOrUnfollowUser } from '@/hooks/useFollowOrUnfollow'; // Import your Axios API function
import { updateAuthUserFollowing } from '@/redux/authSlice'; // Import Redux action 
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const SuggestedUsers = () => {
    const dispatch = useDispatch();
    const { suggestedUsers, user:loggedInUser } = useSelector(store => store.auth);

    // Local state to manage following status for each suggested user
    const [followingStatus, setFollowingStatus] = useState({});

    // Initialize the local followingStatus when suggestedUsers or user changes
    useEffect(() => {
        if (loggedInUser && suggestedUsers.length) {
            const initialFollowingStatus = {};
            suggestedUsers.forEach(suggestedUser => {
                initialFollowingStatus[suggestedUser._id] = loggedInUser.following.includes(suggestedUser._id);
            });
            setFollowingStatus(initialFollowingStatus);
        }
    }, [loggedInUser, suggestedUsers]);

    const handleFollowClick = async (userId) => {
        try {
            const response = await followOrUnfollowUser(userId); // Call Axios API
            if (response.success) {
                setFollowingStatus(prev => ({
                    ...prev,
                    [userId]: !prev[userId], // Toggle local state
                }));

                // Dispatch action to update Redux store with updated user data
                dispatch(updateAuthUserFollowing(response.updatedUser)); // Assuming the response returns updated user
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.error("Error following/unfollowing user", error);
        }
    };

    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>See All</span>
            </div>
            {suggestedUsers.map((suggestedUser) => {
                const isFollowing = followingStatus[suggestedUser._id] || false;

                return (
                    <div key={suggestedUser._id} className='flex items-center justify-between my-5'>
                        <div className='flex items-center gap-2'>
                            <Link to={`/profile/${suggestedUser._id}`}>
                                <Avatar>
                                    <AvatarImage src={suggestedUser?.profilePicture} alt="post_image" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Link>
                            <div>
                                <h1 className='font-semibold text-sm'>
                                    <Link to={`/profile/${suggestedUser._id}`}>{suggestedUser?.username}</Link>
                                </h1>
                                <span className='text-gray-600 text-sm'>{suggestedUser?.bio || 'Bio here...'}</span>
                            </div>
                        </div>
                        
                        {isFollowing ? (
                        <span className={`text-xs font-bold cursor-pointer text-gray-500`} onClick={() => handleFollowClick(suggestedUser._id)}>Unfollow</span>
                        ) : (
                        <span className={`text-xs font-bold cursor-pointer text-[#3BADF8]`} onClick={() => handleFollowClick(suggestedUser._id)}>Follow</span>
                        )
                        }
                    </div>
                );
            })}
        </div>
    );
};

export default SuggestedUsers;
