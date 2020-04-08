import { Component, OnInit, ViewChildren, ElementRef, QueryList, ContentChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { DatePipe, TitleCasePipe } from '@angular/common';
import * as Chart from 'chart.js';

const baseConfig: Chart.ChartConfiguration = {
  type: 'line',
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    scales: {
      xAxes: [{ display: true }],
      yAxes: [{ display: true }],
    },  
  }
};


@Component({
  selector: "app-andamento",
  templateUrl: "./andamento.page.html",
  styleUrls: ["./andamento.page.scss"]
})
export class AndamentoPage implements OnInit {

  @ViewChildren('pr_chart', { read: ElementRef }) chartElementRefs: QueryList<ElementRef>;

  chartData: Chart.ChartData[] = [];

  data: any[];
  dispRegioni: boolean;
  idRegione;
  nomeRegione;
  datePipe: DatePipe;

  labels = ['totale_casi', 'nuovi_positivi', 'totale_positivi', 'totale_ospedalizzati', 'terapia_intensiva', 'deceduti', 'dimessi_guariti'];
  titles = ['Totale Casi', 'Nuovi Positivi', 'Attualmente Positivi', 'Ospedalizzati', 'In Terapia Intensiva', 'Deceduti','Guariti'];

  charts: Chart[] = [];

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
            this.data = this.data.reverse();
            this.initChart();
          });
      } else {
        this.dataService.getNationalData().subscribe(nationalData => {
          this.data = nationalData;
          this.data = this.data.reverse();
          this.initChart();
          
        });
      }
    });
  }

  private initChart() {
    for (const label of this.labels) {
      const labels = [];
      const chartDataset = [];

      for (const item of this.data) {        
        labels.push(this.datePipe.transform(item.data,'dd/MM/yyyy'));
        chartDataset.push(item[label]);
      }

      this.chartData.push({
        labels: labels,
        datasets: [{
          data: chartDataset,
          borderColor: '#3880ff',
          fill: false,          
        }],        
      })
    }    
  }

  ionViewDidEnter() {   
    
    this.charts = this.chartElementRefs.map((chartElementRef, index) => {
      const config = Object.assign({}, baseConfig, { data: this.chartData[index] });
      return new Chart(chartElementRef.nativeElement, config);
    });    
  }
}
