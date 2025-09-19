export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
}

export interface Reply {
  id: string;
  author: User;
  content: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  likes: number;
  replies: number;
  createdAt: Date;
  isLiked: boolean;
  repliesContent?: Reply[];
}
