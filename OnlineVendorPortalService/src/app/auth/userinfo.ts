export interface userdata {
    userinfo: Array<userinfo>;    
}

export interface userinfo {
    id: string,
    first_name: string;
    last_name: string;
    email: string;
    user_type: string;
    user_name: string;
}