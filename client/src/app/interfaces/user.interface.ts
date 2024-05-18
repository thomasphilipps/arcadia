export interface User {
  userId: string;
  userEmail: string;
  userName: string;
  userPassword: string;
  userRole: 'ROLE_ADMIN' | 'ROLE_EMPLOYEE' | 'ROLE_VETERINARY';
}
