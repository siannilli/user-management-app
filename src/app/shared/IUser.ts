// TS interface
export interface IUser {
    _id:string;
    username: string;
    password: string;
    email: string;
    applications: string[];
    roles: string[];
}

export interface INewUser{
    username:string,
    password:string,
    password_confirm:string,
    email:string
}

export interface IResetPassword {
    password:string,
    password_confirm:string,
}

export interface IChangePassword extends IResetPassword{
    oldpassword:string
}