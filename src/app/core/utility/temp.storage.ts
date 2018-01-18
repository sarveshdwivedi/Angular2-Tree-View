import {Injectable} from '@angular/core';

//This is a storage config file to storage value in variable and gets the value from variables where needed.

@Injectable()
export class TmpStorage {
    private tmpStorage:any = {};

  constructor() {}

  //Set value in tmpStorage variable
  set(key:any, data:any){
      this.tmpStorage[key] = data;
  }

  //Get value from tmpStorage variable
  get(key:any) {
      return this.tmpStorage[key] || [];
  }

  //Remove value from tmpStorage variable
  remove(key:any){
      delete this.tmpStorage[key];
  }
}