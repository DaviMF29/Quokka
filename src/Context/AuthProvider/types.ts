
export interface IUser {
    userId?: string;
    email?: string;
    username?: string;
    followers?: number | undefined;
    following?: number | undefined;
    access_token?: string;
}

export interface IContext extends IUser {
    authenticate: (email: string, password: string) => Promise<void>;
    logout: () => void;
    getUserInfo: (token:string) => Promise<any>;

}


export interface IAuthProvider {
    children: JSX.Element;
}