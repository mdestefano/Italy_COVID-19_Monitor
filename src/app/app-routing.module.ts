import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "regione/:idRegione/:nomeRegione",
    loadChildren: () =>
      import("./pages/display-data/display-data.module").then(
        m => m.DisplayDataPageModule
      )
  },
  {
    path: "andamento/:idRegione/:nomeRegione",
    loadChildren: () =>
      import("./pages/andamento/andamento.module").then(
        m => m.AndamentoPageModule
      )
  },
  {
    path: "andamento",
    loadChildren: () =>
      import("./pages/andamento/andamento.module").then(
        m => m.AndamentoPageModule
      )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
