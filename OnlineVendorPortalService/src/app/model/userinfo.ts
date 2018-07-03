export interface userdata {
    userinfo: Array<userinfo>;    
}

export interface userinfo {
    UserID: number,
    UserName: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    PasswordStatus: boolean;
    UserRole: string;
    status: boolean;
    Message: string;
    ErrNumber:string;
}