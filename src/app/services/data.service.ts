import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { parse } from "date-fns";
import { Observable } from "rxjs";

const basePath =
  "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private regionalData: Observable<any[]>;  

  constructor(private http: HttpClient) {}

  getNationalData() {
    const nationalDataPath = "dpc-covid19-ita-andamento-nazionale.json";
    return this.getData(nationalDataPath);
  }

  getMostRecentNationalData() {
    return this.getNationalData().pipe(
      map((list: any[]) => {
        return list[0];
      })
    );
  }

  getRegionalData() {
    this.regionalData = this.getData("dpc-covid19-ita-regioni.json");
  }

  getRegionsId(){
    if(!this.regionalData){
      this.getRegionalData();
    }
    return this.extractZoneIdFromCollection(this.regionalData, 21,'codice_regione','denominazione_regione');
  }

  getMostRecentRegionalDataFor(region: ZoneIdentifier){
    const regionalData = this.getHistoricalDataFor(region);
    return regionalData.pipe(map((list: any[])=>{
      return list[0];
    }));
  }

  getHistoricalDataFor(region: ZoneIdentifier) {
    if (!this.regionalData) {
      this.getRegionalData();
    }
    return this.regionalData.pipe(map((list: any[]) => {
      const filteredList = list.filter(element => {
        return element.codice_regione == region.code && element.denominazione_regione == region.name;
      });
      return filteredList;
    }));
  }

  private extractZoneIdFromCollection(collection: Observable<any[]>, limit: number, codeField: string, nameField: string) {
    return collection.pipe(map((list: any[]) => {
      const result: ZoneIdentifier[] = [];
      for (let i = 0; i < limit; i++) {
        const element = list[i];
        if(element[nameField] !== 'In fase di definizione/aggiornamento'){
          result.push(this.newZoneId(element[codeField], element[nameField]));
        }
      }
      return result;
    }));
  }

  private newZoneId(elementCode: any, elementName: any) {
    return { code: elementCode, name: elementName };
  }

  private replaceDataStringInList(list: any[]) {
    list.forEach(element => {
      element.data = parse(element.data, "yyyy-MM-dd HH:mm:ss", new Date());
    });
    return list;
  }

  private getData(dataPath: string) {
    return this.http
      .get(basePath.concat(dataPath))
      .pipe(map((list: any[]) => {
        return this.prepareAndSortList(list);
      }));
  }

  private prepareAndSortList(list: any[]) {
    const listWithDate = this.replaceDataStringInList(list);
    return listWithDate.sort((a, b) => {
      return b.data - a.data;
    });
  }

}

export interface ZoneIdentifier {
  code: number;
  name: string;
}
