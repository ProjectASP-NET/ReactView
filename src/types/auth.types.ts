export interface RoleData {
  id: number;
  name: string;
  description?: string;
}

export interface UserResponseData {
  id: number;
  username: string;
  email: string;
  role: RoleData;
  registeredOn: string;
}

export interface AuthResponseData {
  token: string;
  user: UserResponseData;
}

export interface UserLoginData {
  login: string;
  password: string;
}

export interface UserRegisterData {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface UserUpdateData {
  username?: string;
  email?: string;
}

export interface AuthState {
  token: string | null;
  user: UserResponseData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
