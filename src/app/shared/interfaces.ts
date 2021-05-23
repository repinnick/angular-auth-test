export interface User {
  email: string;
  password?: string;
  uid?: string;
  isAdmin?: boolean;
}

export interface Post {
  id?: string;
  title: string;
  text: string;
  date: number;
  tags: Array<string>;
  author: string;
  isModeration: boolean;
  comments?: Comments[];
}

export interface Comments {
  id?: string;
  isDecision?: boolean;
  author: string;
  text: string;
  date: number;
}

export interface getResponseId {
  name: string;
}

export interface Color {
  background: string;
}

