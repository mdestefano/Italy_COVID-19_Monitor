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
  historicalData: any[];
  dispRegioni: boolean;
  idRegione;
  nomeRegione;
  provincesData: any[];
  chartColors: Color[];
  private datePipe: DatePipe;

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
            this.data = regionalData[0];
            this.historicalData = regionalData;
            this.initChart();
          });
      } else {
        this.dataService.getNationalData().subscribe(nationalData => {
          this.data = nationalData[0];
          this.historicalData = nationalData;
          this.initChart();
        });
      }
    });
  }

  private initChart() {
    this.chartLabels = [];
    this.chartData[0].data = [];
    this.chartType = "bar";

    this.chartLabels.push("Contagiati", "Deceduti", "Guariti");
    this.chartData[0].data.push(
      this.data.totale_attualmente_positivi,
      this.data.deceduti,
      this.data.dimessi_guariti
    );
    this.chartColors = [
      {
        backgroundColor: ["#db6d00", "#db0000", "#00881c"]
      }
    ];
  }

  private initChartAndamento() {
    this.chartLabels = [];
    this.chartData[0].data = [];
    this.chartType = "line";

    for (let item of this.historicalData) {
      this.chartLabels.push(this.datePipe.transform(item.data, "dd/MM/yyyy"));
      this.chartData[0].data.push(item.totale_casi);
    }

    this.chartColors = [{backgroundColor: "#445566"}]

    this.chart.chart.update();
  }

  onClick() {
    this.initChartAndamento();
  }
}
