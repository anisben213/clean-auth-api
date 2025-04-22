export class User {
  public id: string;
  public name: string;
  public email: string;
  public password: string;

  constructor(id: string, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // change password method
  changePassword(newPassword: string):void {
    this.password = newPassword;
  }
  // check valid email method
  isValidEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }
  // check fullname method
  isValidFullName(): boolean {
    return this.name !== undefined && this.name.trim().length > 0;
  }
}
