export interface Post {
  avatar: string;
  created_at: string;
  downvotes: number;
  hashtags: string;
  id: number;
  media: string;
  title: string;
  upvotes: number;
  username: string;
  is_upvoted: boolean;
  is_downvoted: boolean;
}
