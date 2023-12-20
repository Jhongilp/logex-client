// DON'T USE ANYMORE THESE TYPES, THEY ARE DEFINED IN THE MAIN EXPO TYPE FILE
export interface ISetting {
    name: string;
    responsible: string;
    status: string;
    enabled: boolean;
    mandatory: boolean;
    // deadline?: string;
    [key: string]: string | boolean;
  }


  export type SettingList = ISetting[]
  // export type SettingList = {[activityId: string]: ISetting}