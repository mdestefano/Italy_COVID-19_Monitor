import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZoneListPage } from './zone-list.page';

const routes: Routes = [
  {
    path: '',
    component: ZoneListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZoneListPageRoutingModule {}
