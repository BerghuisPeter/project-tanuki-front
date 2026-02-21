import { UserRole, UserStatus } from "../../../openApi/auth";

export interface User {
  id: string;
  email?: string;
  status?: UserStatus;
  createdAt?: string;
  roles?: Array<UserRole>;
  isGuest: boolean;
}
