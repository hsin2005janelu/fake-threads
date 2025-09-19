import React, { useState } from 'react';
import type { User } from '../types';

interface CreatePostProps {
  currentUser: User;
  onCreatePost: (content: string) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ currentUser, onCreatePost }) => {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      onCreatePost(content);
      setContent('');
      setIsFocused(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-4 flex space-x-4">
      <div className="flex-shrink-0">
        <img src={currentUser.avatarUrl} alt="您的頭像" className="w-10 h-10 rounded-full" />
      </div>
      <div className="flex-1">
        <div 
          className="w-full text-gray-500"
          onClick={() => setIsFocused(true)}
        >
          {isFocused ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="發起一個討論串..."
              className="w-full bg-transparent text-white focus:outline-none resize-none"
              rows={1}
              autoFocus
              onFocus={(e) => {
                // Auto-expand textarea
                e.target.style.height = 'inherit';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  e.target.style.height = 'inherit';
                  e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
          ) : (
            <p className="pt-2">發起一個討論串...</p>
          )}
        </div>
        
        {isFocused && (
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">任何人都可以回覆</span>
            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="bg-white text-black font-bold py-2 px-6 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              發布
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;