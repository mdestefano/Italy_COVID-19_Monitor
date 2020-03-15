import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.page.html',
  styleUrls: ['./zone-list.page.scss'],
})
export class ZoneListPage implements OnInit {

  data: any[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getRegionsId().subscribe(fetchedIds =>{
      this.data = fetchedIds;
    });
  }

}
