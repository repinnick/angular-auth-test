export interface User {
  email: string
  password?: string
  uid?: string
}

export interface Post {
  id?: string
  title: string
  text: string
  date: Date
  tags: Array<string>
  author: string
  onModerate: boolean
}

export interface getResponseId {
  name: string,
}
