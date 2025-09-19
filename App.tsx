import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Feed from './components/Feed';
import BottomNav from './components/BottomNav';
import CreatePost from './components/CreatePost';
import type { Post, User, Reply } from './types';

const currentUser: User = {
  id: 'user1',
  name: '您',
  username: 'current_user',
  avatarUrl: 'https://picsum.photos/seed/user1/48/48',
};

const INITIAL_POSTS: Post[] = [
  {
    id: 'post1',
    author: {
      id: 'user2',
      name: 'Jane Doe',
      username: 'janedoe',
      avatarUrl: 'https://picsum.photos/seed/user2/48/48',
    },
    content: '剛設定好我的 Threads 仿製品！這是用 React 和 Tailwind CSS 建立的。UI 設計旨在完美複製。大家覺得怎麼樣？#react #tailwindcss',
    likes: 125,
    replies: 12,
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    isLiked: false,
    repliesContent: [],
  },
  {
    id: 'post2',
    author: {
      id: 'user3',
      name: 'John Smith',
      username: 'johnsmith',
      avatarUrl: 'https://picsum.photos/seed/user3/48/48',
    },
    content: '這個應用程式的深色模式真的很流暢。美學設計做得很好！',
    likes: 88,
    replies: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    isLiked: true,
    repliesContent: [],
  },
    {
    id: 'post3',
    author: {
      id: 'user4',
      name: 'Emily White',
      username: 'emilyw',
      avatarUrl: 'https://picsum.photos/seed/user4/48/48',
    },
    content: '正在思考下一步要建置什麼。也許整合 Gemini API 來自動生成貼文內容？可能性是無限的。',
    likes: 231,
    replies: 28,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isLiked: false,
    repliesContent: [],
  },
];

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  const handleCreatePost = useCallback((content: string) => {
    if (!content.trim()) return;
    const newPost: Post = {
      id: `post${Date.now()}`,
      author: currentUser,
      content,
      likes: 0,
      replies: 0,
      createdAt: new Date(),
      isLiked: false,
      repliesContent: [],
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, []);

  const handleToggleLike = useCallback((postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  }, []);

  const handleAddReply = useCallback((postId: string, content: string) => {
    if (!content.trim()) return;

    const newReply: Reply = {
      id: `reply-${Date.now()}`,
      author: currentUser,
      content,
      createdAt: new Date(),
    };

    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            replies: post.replies + 1,
            repliesContent: [...(post.repliesContent || []), newReply],
          };
        }
        return post;
      })
    );
  }, []);


  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <div className="max-w-2xl mx-auto">
        <Header />
        <main className="pb-20">
          <CreatePost currentUser={currentUser} onCreatePost={handleCreatePost} />
          <div className="border-t border-gray-800">
             <Feed posts={posts} onToggleLike={handleToggleLike} onAddReply={handleAddReply} currentUser={currentUser} />
          </div>
        </main>
        <BottomNav />
      </div>
    </div>
  );
};

export default App;
