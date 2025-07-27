export class getUserResponse{
    total!:number;
    page!:number;
    active!:number;
    pending!:number;
    deleted!:number;
    users!:userListResponse[];
}

export class userListResponse{
    id!:number;
    name!:string;
    email!:string;
    deleted!:boolean;
    lastLogin!:string;
    type!:string;
}