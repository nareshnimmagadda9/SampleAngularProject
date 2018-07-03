export interface userAccessArray {
    userAccess: Array<userAccess>;    
}

export interface userAccess {
    GroupID: number,
    GroupName: string;
    SubGroupName: string;
    GroupStatus: boolean;
    SubGroupStatus: boolean;
}