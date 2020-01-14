import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { SearchContainerComponent }         from './containers/search-container/search-container.component';
import { SearchBarComponent }               from './components/search-bar/search-bar.component';
import {
  MatFormFieldModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatIconModule,
  MatTabsModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule,
  MatProgressSpinnerModule
}                                           from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchGridComponent }              from './components/search-grid/search-grid.component';
import { AgGridModule }                     from 'ag-grid-angular';
import { FlexLayoutModule }                 from '@angular/flex-layout';
import { MatCardModule }                    from '@angular/material/card';
import { DisplayResultComponent }           from './components/display-result/display-result.component';
import { AgMatSelectComponent }             from './ag-grid-stuff/ag-mat-select/ag-mat-select.component';
import { TypeFilterComponent }              from './ag-grid-stuff/type-filter/type-filter.component';
import { MatIconGridComponent }             from './ag-grid-stuff/mat-icon-grid/mat-icon-grid.component';
import { GoToFileComponent }                from './ag-grid-stuff/go-to-file/go-to-file.component';
import { ImportationComponent } from './components/importation/importation.component';

const container = [
  SearchContainerComponent
];

const components = [
  SearchBarComponent
];

@NgModule( {
  declarations : [
    ... container,
    ... components,
    SearchGridComponent,
    DisplayResultComponent,
    MatIconGridComponent,
    TypeFilterComponent,
    AgMatSelectComponent,
    GoToFileComponent,
    ImportationComponent
  ],
  exports : [
    SearchContainerComponent
  ],
  entryComponents : [ MatIconGridComponent, TypeFilterComponent, AgMatSelectComponent, GoToFileComponent ],
  imports : [
    CommonModule,

    // FormModule
    FormsModule,
    ReactiveFormsModule,

    // fxLayout
    FlexLayoutModule,

    // Material theme
    MatButtonModule,

    MatFormFieldModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    AgGridModule,
    MatCardModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ]
} )
export class SearchModule {}
