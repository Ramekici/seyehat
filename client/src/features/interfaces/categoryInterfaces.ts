export interface Kategori {
    _id: string;
    user: string;
    category: string;
    openPos?: boolean;
    link: string;
    missions: Array<string>;
}
  
export interface CategoryErrors{
    catagor:string;
}

export interface MissionAlt{
    missionEl:string;
}

export interface KatogoriState {
    kategoriler:Kategori[];
    missions:string[];
    missionsAlt:string[];
    id: string;
    altId: string;
    mission: string;
    el: any;
    completed: boolean;
    errors: CategoryErrors;
}

