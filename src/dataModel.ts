interface User {
    image: {
        png: string;
        webp?: string;
    };
    username: string;
  }

interface Comment{
  id: string;
  content: string;
  createdAt: string;
  score: number;
  user: User;
}

export interface LocalStorageData {
  currentUser: UserData;
  comments: Comment[];
}


export interface Replies extends Comment {
    replyingTo: string;
    replies?: Replies[] | [];
  }
  
  export interface Comments extends Comment {
    replies: Replies[] | [];
  }

  export interface UserData{
    userName: string;
    password: string;
    imgUrl?: string;
    createdAt: Date;
  }