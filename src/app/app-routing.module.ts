import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ShowDetailComponent } from './pages/show-detail/show-detail.component';
import { ShowsListComponent } from './components/shows-list/shows-list.component';

const routes: Routes = [
  {
    path: 'shows',
    component: DashboardComponent,
    children: [
      { path: '', component: ShowsListComponent },
      { path: ':id', component: ShowDetailComponent }
    ]
  },
  // { path: 'shows/:id', component: ShowDetailComponent },
  { path: '', redirectTo: '/shows', pathMatch: 'full' },
  { path: 'page-not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
