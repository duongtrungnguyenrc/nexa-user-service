export interface User {
  id: string;
  email: string;
  phone: string;
  passwordHash: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
