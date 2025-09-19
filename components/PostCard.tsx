import React, { useState } from 'react';
import type { Post, User } from '../types';
import { HeartIcon, CommentIcon, RepostIcon, ShareIcon } from './Icons';

interface PostCardProps {
  post: Post;
  onToggleLike: (postId: string) => void;
  onAddReply: (postId: string, content: string) => void;
  currentUser: User;
}

const formatTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "年";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "月";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "天";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "小時";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "分鐘";
  return Math.floor(seconds) + "秒";
};

const PostCard: React.FC<PostCardProps> = ({ post, onToggleLike, onAddReply, currentUser }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onAddReply(post.id, replyContent);
      setReplyContent('');
      setIsReplying(false);
    }
  };

  const handleReplyKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleReplySubmit();
    }
  };

  return (
    <article className="flex space-x-4 p-4 border-b border-gray-800">
      <div className="flex flex-col items-center">
        <img src={post.author.avatarUrl} alt={`${post.author.name}'s avatar`} className="w-10 h-10 rounded-full" />
        <div className="w-0.5 grow bg-gray-700 mt-2"></div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-white">{post.author.name}</h4>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 text-sm">{formatTimeAgo(post.createdAt)}</span>
            <button className="text-gray-500">...</button>
          </div>
        </div>
        
        <p className="text-white mt-1 whitespace-pre-wrap">{post.content}</p>

        <div className="flex space-x-4 mt-4 text-gray-400">
          <button onClick={() => onToggleLike(post.id)} className="flex items-center space-x-1 group">
             <HeartIcon className={`h-6 w-6 group-hover:text-red-500 transition-colors ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          <button onClick={() => setIsReplying(!isReplying)} className="flex items-center space-x-1 group">
             <CommentIcon className="h-6 w-6 group-hover:text-white transition-colors" />
          </button>
          <button className="flex items-center space-x-1 group">
            <RepostIcon className="h-6 w-6 group-hover:text-green-500 transition-colors" />
          </button>
          <button className="flex items-center space-x-1 group">
            <ShareIcon className="h-6 w-6 group-hover:text-white transition-colors" />
          </button>
        </div>

        <div className="text-gray-500 text-sm mt-3">
          {post.replies > 0 && (
            <>
              <span>{post.replies} 則回覆</span>
              <span className="mx-2">·</span>
            </>
          )}
          <span>{post.likes} 個讚</span>
        </div>

        {isReplying && (
          <div className="mt-4 flex space-x-4">
            <div className="flex-shrink-0">
              <img src={currentUser.avatarUrl} alt="您的頭像" className="w-10 h-10 rounded-full" />
            </div>
            <div className="flex-1">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                onKeyDown={handleReplyKeyDown}
                placeholder={`回覆 ${post.author.name}...`}
                className="w-full bg-transparent text-white focus:outline-none resize-none border-b border-gray-700 focus:border-white transition-colors pb-1"
                rows={1}
                autoFocus
                onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  e.target.style.height = 'inherit';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleReplySubmit}
                  disabled={!replyContent.trim()}
                  className="bg-white text-black font-bold py-1 px-4 rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  回覆
                </button>
              </div>
            </div>
          </div>
        )}

        {post.repliesContent && post.repliesContent.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-800 space-y-4">
            {post.repliesContent.map((reply) => (
              <div key={reply.id} className="flex space-x-3">
                <img src={reply.author.avatarUrl} alt={`${reply.author.name}'s avatar`} className="w-8 h-8 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-baseline space-x-2">
                    <h5 className="font-bold text-white text-sm">{reply.author.name}</h5>
                    <span className="text-gray-500 text-xs">{formatTimeAgo(reply.createdAt)}</span>
                  </div>
                  <p className="text-white mt-0.5 text-sm whitespace-pre-wrap">{reply.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default PostCard;