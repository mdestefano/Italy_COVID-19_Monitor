import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: "app-display-data",
  templateUrl: "./display-data.page.html",
  styleUrls: ["./display-data.page.scss"]
})
export class DisplayDataPage implements OnInit {
  data: any;
  dispRegioni: boolean;
  idRegione;
  nomeRegione;
  provincesData: any[];

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.dispRegioni = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idRegione = +params.get("idRegione");
      this.nomeRegione = params.get("nomeRegione");

      if (this.idRegione && this.nomeRegione) {
        this.dispRegioni = true;
        const region = { code: this.idRegione, name: this.nomeRegione };
        this.dataService.getMostRecentRegionalDataFor(region).subscribe(async regionalData => {
          this.data = regionalData;          
        });
       
      } else {
        this.dataService.getMostRecentNationalData().subscribe(nationalData => {this.data = nationalData});
      }
    });
  }
}
