import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class LocalDbService {
  constructor() {}

  set(tagName:string,data:any):void{

    localStorage.setItem(tagName,JSON.stringify(data));
  }

  get(tagName:string){
   return JSON.parse(localStorage.getItem(tagName));
  }

  delete(tagName:string):void{
    localStorage.removeItem(tagName);
  }

  clear():void{
    localStorage.clear();
  }
}
