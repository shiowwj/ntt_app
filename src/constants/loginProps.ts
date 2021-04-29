export interface UserProps {
  id?: string;
  email?: string;
  username: string;
  password?: string;
  type?: UserTypes;
  dateCreated?: Date;
  dateModified?: Date;
  loginExpiry?: Date;
}

export enum UserTypes {
  ADMIN = 'ADMIN',
  NORMAL = 'NORMAL'
}