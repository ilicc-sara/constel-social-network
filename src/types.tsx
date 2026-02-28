export type Posts = {
  audio: null | string;
  comments: number;
  created_at: string;
  image: string | null;
  liked: boolean;
  likes: number;
  post_id: string;
  text: string;
  user: {
    username: string;
    full_name: string;
    picture: string;
  };
  user_id: string;
};

export type User = {
  email: string;
  full_name: string;
  picture: string;
  username: string;
};
