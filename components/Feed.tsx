import React from 'react';
import PostCard from './PostCard';
import type { Post, User } from '../types';

interface FeedProps {
  posts: Post[];
  onToggleLike: (postId: string) => void;
  onAddReply: (postId: string, content: string) => void;
  currentUser: User;
}

const Feed: React.FC<FeedProps> = ({ posts, onToggleLike, onAddReply, currentUser }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onToggleLike={onToggleLike} onAddReply={onAddReply} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default Feed;
