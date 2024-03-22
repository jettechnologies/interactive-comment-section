interface User {
    image: {
        png: string;
        webp: string;
    };
    username: string;
  }

export interface CurrentUser {
    userName: string;
    hashedPassword: string;
    createdAt: Date;
    imgUrl: string;
}
interface Replies {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: User;
    replyingTo?: string;
  }
  
  export interface Comment {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: User;
    replies: Replies[];
    replyingTo?: string; // Optional field
  }