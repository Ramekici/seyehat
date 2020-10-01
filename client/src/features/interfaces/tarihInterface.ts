export interface TarihDatas {
    _id:string;
    user:string;
    title:string;
    info:string;
    date:Date;
    month?:number;
    day?:number;
    year?:number
}

export interface TarihErrors{
    titl:string; 
    inf:string;
}

export interface TarihState {
    errors:TarihErrors;
    tarihteBugun: Array<TarihDatas>;
    ilgiliTarihteki: Array<TarihDatas>;
    tarihItem: TarihDatas;
    completed:boolean;
}

