export interface User {
  email: string;
  password?: string;
  uid?: string;
}

export interface Post {
  id?: string;
  title: string;
  text: string;
  date: number;
  tags: Array<string>;
  author: string;
  onModeration: boolean;
  comments?: Comment[];
}

export interface Comment {
  decision?: boolean;
  author: string;
  text: string;
  date: number;
}

export interface getResponseId {
  name: string;
}
