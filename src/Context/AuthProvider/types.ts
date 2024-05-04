export interface userId {
    userId: string;
}

export interface IUser {
    userId?: string;
    email?: string;
    username?: string;
    followers?: Array<userId> | undefined;
    following?: Array<userId> | undefined;
    access_token?: string;
}

export interface IContext extends IUser {
    authenticate: (email: string, password: string) => Promise<void>;
    logout: () => void;
    getUserInfo: (token:string) => Promise<any>;
    updateUserInfo: (token:string, userId:string,username?: string, profileImage?: string) => Promise<void>;
    setPostAsFavorite: (token: string, postId: string, userId: string) => Promise<void>;
}


export interface IAuthProvider {
    children: JSX.Element;
}