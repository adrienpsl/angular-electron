import { NgModule }                                                                                                from '@angular/core';
import { CommonModule }                                                                                            from '@angular/common';
import { SearchContainerComponent }                                                                                from './containers/search-container/search-container.component';
import { SearchBarComponent }                                                                                      from './components/search-bar/search-bar.component';
import { MatFormFieldModule, MatAutocompleteModule, MatChipsModule, MatIconModule, MatTabsModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule }                                                                        from '@angular/forms';
import { SearchGridComponent }                                                                                     from './components/search-grid/search-grid.component';
import { AgGridModule }                                                                                            from 'ag-grid-angular';
import { FlexLayoutModule }                                                                                        from '@angular/flex-layout';
import { MatCardModule }                                                                                           from '@angular/material/card';
import { DisplayResultComponent } from './components/display-result/display-result.component';

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
    DisplayResultComponent

  ],
  imports : [
    CommonModule,

    // FormModule
    FormsModule,
    ReactiveFormsModule,

    // fxLayout
    FlexLayoutModule,

    // Material theme
    MatFormFieldModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    AgGridModule,
    MatCardModule
  ]
} )
export class SearchModule {}
