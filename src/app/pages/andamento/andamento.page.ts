import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";
import { format } from "url";
import { DatePipe } from '@angular/common';

@Component({
  selector: "app-andamento",
  templateUrl: "./andamento.page.html",
  styleUrls: ["./andamento.page.scss"]
})
export class AndamentoPage implements OnInit {
  chartData: ChartDataSets[]; //= [{ data: [], label: "" }];
  chartLabels: Label[][];
  chartOptions = {
    responsive: true
  };

  chartType = "line";
  data: any[];
  dispRegioni: boolean;
  idRegione;
  nomeRegione;
  datePipe: DatePipe;

  labels = ['totale_casi', 'totale_attualmente_positivi','deceduti', 'dimessi_guariti']

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.dispRegioni = false;
    this.datePipe = new DatePipe("IT");
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idRegione = +params.get("idRegione");
      this.nomeRegione = params.get("nomeRegione");

      if (this.idRegione && this.nomeRegione) {
        this.dispRegioni = true;
        const region = { code: this.idRegione, name: this.nomeRegione };
        this.dataService
          .getHistoricalDataFor(region)
          .subscribe(regionalData => {
            this.data = regionalData;
            this.initChart();
          });
      } else {
        this.dataService.getNationalData().subscribe(nationalData => {
          this.data = nationalData;
          this.initChart();
        });
      }
    });
  }

  private initChart() {
    this.chartLabels = [];
    this.chartData = [];

    for (let i = 0; i < 4; i++) {
      this.chartData.push({ data: [], label: "" });
      this.chartLabels.push([]);

      for(let item of this.data){
        this.chartData[i].data.push(item[this.labels[i]]);
        this.chartLabels[i].push(this.datePipe.transform(item.data, 'dd/MM/yyyy'));
      }
    }
  }
}
