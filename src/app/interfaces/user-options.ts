export interface UserOptions {
  username: string;
  password: string;
  GroupCode: string;
}

export interface UserForm {
  GroupCode: string;
  ParentLoginId: string;
  Password: string;
  MACAddress: string;
}

export interface AddStudentForm {
  ParentLoginId: string;
  Password: string;
  MACAddress: string;
  GroupCode: string;
}

export interface ResetPasswordForm {
  currentPassword: string;
  newPassword: string;
  re_newPassword: string;
  groupCode: string;
}

export interface CommunicationForm {
  To_Whom: string;
  Type: string;
  Text: string;
}
