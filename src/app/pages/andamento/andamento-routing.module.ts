import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AndamentoPage } from './andamento.page';

const routes: Routes = [
  {
    path: '',
    component: AndamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AndamentoPageRoutingModule {}
