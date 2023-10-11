export type responseType = {
    data: {
        message: string,
        code: string
        data: any
    }
};

export interface IUsers { 
    _id: string,
    name:string, 
    username?: string, 
    email?: string ,
    gender?:string,
    bio?:string,
    profileImage:{_id:string,url:string,mimetype:string}|null,
    lastMessage:{_id:string,message:string,timestamp:string,seen:boolean}|null
}
