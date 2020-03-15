import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayDataPage } from './display-data.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayDataPageRoutingModule {}
