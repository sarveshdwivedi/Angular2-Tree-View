import {Injectable} from '@angular/core';

//This is the common component where we are checking isExists, notEmpty record, json type, etc.

@Injectable()
export class Utills {
    constructor(
    ) { }

    //check if variable exist or not
    isExists(data:any,key:any){
        if(this.notEmpty(data)){
            if(this.notEmpty(data[key])){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    //Check if variable empty or not
    notEmpty(data: any) {
        var res = true;
        var dataType = typeof data;
        switch (dataType) {
            case 'object':
                if (data == null || data.length < 1)
                    res = false;
                break;

            case 'undefined':
                res = false;
                break;

            case 'number':
                if (data == "")
                    res = false;
                break;
            case 'string':
                if (data.trim() == "")
                    res = false;
                break;
        }

        return res;
    }

    //Return json
    parseJson(data: any){
        return JSON.parse(data);
    }
}