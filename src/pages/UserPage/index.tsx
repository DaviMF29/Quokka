import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import avatarImg from '../../assets/avatar_img.png';
import { Header } from "../../components/Header";
import { Post, PostProps } from "../../components/Post";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { Banner, FollowButton, ProfileContent, ProfileInfo, ProfilePicture, ProfileText, ProfileWrapper, UnfollowButton, UserFollowing, UserPosts } from "./styles";
import { ProfileCard } from "../../components/ProfileCard";
import { set } from "lodash";


interface UserInfo {
    _id: string;
    username: string;
    email: string;
    favorites: Array<string>;
    followers: Array<string>;
    following: Array<string>;
    liked_posts: Array<string>;
    posts: Array<string>;
}

interface FollowingProps {
    id: string;
    username: string;
    email: string;
    isFollowing: boolean;

}

export function UserPage({ userId }: { userId: string }) {
    const user = useAuth();
    const { userName } = useParams();
    const [pageOwner, setPageOwner] = useState<UserInfo | null>(null);
    const [pageOwnerPosts, setPageOwnerPosts] = useState<PostProps[]>([]);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [following, setFollowing] = useState<FollowingProps[]>([]);
    async function getUserByUsername() {
        try {
            const response = await api.get(`/api/users/${userName}`);
            setPageOwner(response.data);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch user by username:", error);
        }
    }

    async function getPostById(postId: string) {
        try {
            const response = await api.get(`/api/posts/${postId}`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch post by ID:", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const owner = await getUserByUsername();
            if (owner?.posts) {
                const postsPromises = owner.posts.map((postId:string) => getPostById(postId));
                const resolvedPosts = await Promise.all(postsPromises);
                setPageOwnerPosts(resolvedPosts.reverse());
            }
            setPageLoaded(true);
            if (user.access_token) { 
                user.getUserInfo(user.access_token);
            }

            
        };

        getFollowingUsers(pageOwner?.following ?? []);
        fetchData();
        
    }, [userName,pageLoaded]);

    
    

    async function handleFollow() {
        try {
            if (user.access_token && user.userId && pageOwner?._id) {
                await user.followUser(user.access_token, user.userId, pageOwner._id);
                getUserByUsername();
            }
        } catch (error) {
            console.error("Failed to follow/unfollow user:", error);
        }
    }

    async function handleDeletePost(postId:string, userId:string){
        const postIndex = pageOwnerPosts.findIndex(post => post._id == postId)

        if(postIndex !== -1){
            const post = pageOwnerPosts[postIndex]

            if(post.userId === userId){
                const url = `/api/posts/${postId}`
                const config = {
                    data: {userId},
                    headers: {
                        Authorization: `Bearer ${user.access_token}`
                    }
                }
                await api.delete(url, config)
                setPageLoaded(false)

            }
        }
    }

    async function getFollowingUsers(followingIds: string[]) {
    
        // Mapeia cada ID para uma promessa de requisição da API
        const requests = followingIds.map(async (followingId) => {
            const response = await api.get(`/api/user/${followingId}`);
            return response.data;
        });

        // Usa Promise.all para aguardar que todas as promessas sejam resolvidas
        const users = await Promise.all(requests);
        setFollowing(users);
        
        
    }



    return (
        <>
            <Header />
            <ProfileWrapper>
                <Banner src="https://i.pinimg.com/originals/0b/a3/d6/0ba3d60362c7e6d256cfc1f37156bad9.jpg" />
                <ProfileContent>
                    <ProfileInfo>
                        <ProfilePicture src={avatarImg} />
                        <ProfileText>
                            <h1>{pageOwner?.username || 'User not found'}</h1>
                            <h3>{pageOwner?.email || 'Email not found'}</h3>
                            <div>
                                <p>Posts: {pageOwner?.posts.length}</p>
                                <p>Seguidores: {pageOwner?.followers?.length}</p>
                                <p>Seguindo: {pageOwner?.following?.length}</p>
                            </div>
                            {pageOwner && pageOwner._id !== userId && (
                                pageOwner.followers?.includes(userId) ?
                                    <UnfollowButton onClick={handleFollow}>Seguindo</UnfollowButton> :
                                    <FollowButton onClick={handleFollow}>Seguir</FollowButton>
                            )}
                        </ProfileText>
                    </ProfileInfo>
                    <UserPosts>
                        {pageOwnerPosts.map((post) => (
                            <Post
                            key={post._id}
                                username={post.username}
                                userId={post.userId}
                                createdAt={post.createdAt}
                                text={post.text}
                                _id={post._id}
                                setPostState={setPageLoaded}
                                userFollowing={user.following?.map(userId => userId.toString())}
                                currentUserId={user.userId ?? ''}
                                userLikedPosts={user.likedPosts}
                                userFavoritePosts={user.favoritePosts}
                                deletePostFunction={handleDeletePost}
                                setPostAsFavorite={(postId, userId) => user.setPostAsFavorite(user.access_token??'', postId, userId)}
                                commentField={false}
                            />
                        ))}
                    </UserPosts>
                    <UserFollowing>
                        <h3>Seguindo:</h3>
                        {
                            following.map((following:FollowingProps) => (
                                <ProfileCard
                                    key={following.id}
                                    id={following.id}
                                    username={following.username}
                                    email={following.email}
                                    isFollowing={user.following?.includes(following.id) ? false : true}
                                />
                            ))
                        }
                    </UserFollowing>

                </ProfileContent>
                
            </ProfileWrapper>
        </>
    );
}