export type responseType = {
    data: {
        message: string,
        code: string
        data: any
    }
};

export interface IUsers {
    _id: string,
    name: string,
    username?: string,
    email?: string,
    gender?: string,
    bio?: string,
    profileImage: string | null,
    block_list: string[],
    lastMessage: { _id: string, message: string, timestamp: string, seen: boolean } | null
}
