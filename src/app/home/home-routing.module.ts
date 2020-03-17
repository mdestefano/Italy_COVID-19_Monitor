import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'lista-province',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/zone-list/zone-list.module').then(m => m.ZoneListPageModule)
          }
        ]
      },
      {
        path: 'lista-regioni',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/zone-list/zone-list.module').then(m => m.ZoneListPageModule)
          }
        ]
      },
      {
        path: 'statistiche',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/statistics/statistics.module').then(m => m.StatisticsPageModule)
          }
        ]
      },
      {
        path: 'nazionali',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/display-data/display-data.module').then(m => m.DisplayDataPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home/nazionali',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/nazionali',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
