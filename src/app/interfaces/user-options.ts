export interface UserOptions {
  username: string;
  password: string;
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
