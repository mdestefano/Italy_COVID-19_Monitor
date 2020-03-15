import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZoneListPageRoutingModule } from './zone-list-routing.module';

import { ZoneListPage } from './zone-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZoneListPageRoutingModule
  ],
  declarations: [ZoneListPage]
})
export class ZoneListPageModule {}
