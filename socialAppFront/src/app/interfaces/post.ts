export interface Post {
  title: string;
  body: string;
  _id?: string;
  comments?: string[];
  likes?: string[];
  image?: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}
