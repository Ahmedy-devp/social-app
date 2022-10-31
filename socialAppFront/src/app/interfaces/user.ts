export interface User {
  _id?:string
  name:string
  userName:string
  email:string
  password?:string
  profileImage?:string
  userType?: string
  createdAt?:string
  updatedAt?:string
}
