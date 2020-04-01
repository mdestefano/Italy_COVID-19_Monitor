import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { Observable } from "rxjs";
import { Chart, ChartDataSets } from "chart.js";
import { Label, Color } from "ng2-charts";
import { DatePipe } from "@angular/common";
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: "app-display-data",
  templateUrl: "./display-data.page.html",
  styleUrls: ["./display-data.page.scss"]
})
export class DisplayDataPage implements OnInit {

  @ViewChild(BaseChartDirective, {static: false}) chart: BaseChartDirective;

  chartData: ChartDataSets[] = [{ data: [], label: "COVID-19" }];
  chartLabels: Label[];
  chartOptions = {
    responsive: true
  };

  chartType;
  data: any;
  dispRegioni: boolean;
  idRegione;
  nomeRegione;
  chartColors: Color[];
  private datePipe: DatePipe;
  linkAndamento: string;

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
          .getMostRecentRegionalDataFor(region)
          .subscribe(regionalData => {
            this.data = regionalData;
            this.linkAndamento = '/andamento/' + this.idRegione + '/' + this.nomeRegione
            this.initChart();
          });
      } else {
        this.dataService.getMostRecentNationalData().subscribe(nationalData => {
          this.data = nationalData;
          this.linkAndamento = '/andamento'
          this.initChart();
        });
      }
    });
  }

  private initChart() {
    this.chartLabels = [];
    this.chartData[0].data = [];
    this.chartType = "doughnut";

    this.chartLabels.push("Contagiati", "Deceduti", "Guariti");
    this.chartData[0].data.push(
      this.data.totale_positivi,
      this.data.deceduti,
      this.data.dimessi_guariti
    );
    this.chartColors = [
      {
        backgroundColor: ["#db6d00", "#db0000", "#00881c"]
      }
    ];
  }
}
