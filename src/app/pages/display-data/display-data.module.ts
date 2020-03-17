import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayDataPageRoutingModule } from './display-data-routing.module';

import { DisplayDataPage } from './display-data.page';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayDataPageRoutingModule,
    ChartsModule
  ],
  declarations: [DisplayDataPage]
})
export class DisplayDataPageModule {}
