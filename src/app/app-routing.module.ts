import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';
import { SearchContainerComponent } from './features/search/containers/search-container/search-container.component';

const routes: Routes = [
  { path : 'searchFile', component : SearchContainerComponent },
  { path : '**', redirectTo : 'searchFile' }
];

@NgModule( {
  imports : [ RouterModule.forRoot( routes  ) ],
  exports : [ RouterModule ]
} )
export class AppRoutingModule {}
