export interface Datas{
    _id: string;
    user: string;
    category: string;
    mission: string;
    name: string;
    surName: string;
    start: string;
    end: string;
}
  
export interface VeriDatas{
    _id: string;
    elemans:Array<Datas>;
}
export interface ErrorVeriler{
    nam:string; 
    surNam:string;
    categor:string;
    missio:string
}

export interface VerilerState {
    veriler:Array<VeriDatas>;
    veri:Datas;
    verilerOzel:Array <Datas>;
    errors:ErrorVeriler;
    gosterilen: number;
    isCompleted: boolean;
    updateEl:Datas;
    message:string;
    updateId:string;
    tarih: string;
}