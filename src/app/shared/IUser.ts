// TS interface
export interface IUser {
    _id:string;
    username: string;
    password: string;
    email: string;
    applications: string[];
    roles: string[];
}