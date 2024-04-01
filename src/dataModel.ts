interface User {
  image: {
    png: string;
    webp?: string;
  };
  username: string;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  user: User;
}

export interface LocalStorageData {
  currentUser: UserData;
  comments: Comments[];
}

// Update the interfaces to make 'replyingTo' optional in Replies
export interface Replies extends Comment {
  replyingTo?: string;
  replies?: Replies[] | [];
}

// Ensure that 'replies' in Comments interface accepts Replies
export interface Comments extends Comment {
  replies: Replies[] | [];
}

export interface UserData {
  userName: string;
  password: string;
  imgUrl: string;
  createdAt: string;
}
