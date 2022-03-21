import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Info } from '../model/info';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {


  addToTable(info: Info) {
    this.list.push(info);
  }
  removeTable(){
    this.list.slice(0, -1);
  }
  constructor(
    //private httpClient: HttpClient
    ) {}
  list: Info[] = [
    
  ];
  return_list(): Info[]{
    return this.list;
  }
}
