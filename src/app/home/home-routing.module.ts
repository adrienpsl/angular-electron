import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { Routes, RouterModule }     from '@angular/router';
import { SearchContainerComponent } from '../features/search/containers/search-container/search-container.component';

const routes: Routes = [
  {
    path : 'home',
    component : SearchContainerComponent
  }
];

@NgModule( {
  declarations : [],
  imports : [ CommonModule, RouterModule.forChild( routes ) ],
  exports : [ RouterModule ]
} )
export class HomeRoutingModule {}
