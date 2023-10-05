export type responseType = {
    data: {
        message: string,
        code: string
        data: any
    }
};

export interface IAsset {
    _id: string;
    name: string;
    code: string;
    assetType: {
        _id: string;
        name: string;
    };
    images: {
        _id: string;
        url: string;
        mimetype: string;
    }[];
}

export interface IUserPermission {
    controller: string;
    action: string;
}
export interface IactionPopAction { id: number, name: string, click: Function }