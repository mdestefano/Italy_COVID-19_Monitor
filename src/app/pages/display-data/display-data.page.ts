import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: "app-display-data",
  templateUrl: "./display-data.page.html",
  styleUrls: ["./display-data.page.scss"]
})
export class DisplayDataPage implements OnInit {
  data: any;
  dispRegioni: boolean;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.dispRegioni = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idRegione = +params.get("idRegione");
      const nomeRegione = params.get("nomeRegione");

      if (idRegione && nomeRegione) {
        this.dispRegioni = true;
        this.dataService.getMostRecentRegionalDataFor({code: idRegione, name: nomeRegione}).subscribe(regionalData => {this.data = regionalData});
      } else {
        this.dataService.getMostRecentNationalData().subscribe(nationalData => {this.data = nationalData});
      }
    });
  }
}
