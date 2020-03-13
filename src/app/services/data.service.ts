import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import {parse} from 'date-fns'

const basePath = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getNationalData() {
    return this.http.get(basePath.concat('dpc-covid19-ita-andamento-nazionale.json')).pipe(map((list: any []) =>{      
      const listWithDate = this.replaceDataStringInList(list);
      return listWithDate.sort((a,b) => {
        return b.data - a.data;
      });
    }));
  }

  getMostRecentData(){
    return this.getNationalData().pipe(map((list: any[]) => {
      return list[0];
    }));
  }


  private replaceDataStringInList(list: any[]) {
    list.forEach(element => {
      element.data = parse(element.data, 'yyyy-MM-dd HH:mm:ss', new Date());
    });
    return list;
  }
}
