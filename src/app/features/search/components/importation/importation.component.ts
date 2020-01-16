import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GoToFileComponent }                          from '../../ag-grid-stuff/go-to-file/go-to-file.component';
import { fadeInUpOnEnterAnimation }                   from 'angular-animations';
import {
  percentCellRenderer,
  dateRender
}                                                     from '../search-grid/search-grid.component';
import { TypeFilterComponent }                        from '../../ag-grid-stuff/type-filter/type-filter.component';
import { MatIconGridComponent }                       from '../../ag-grid-stuff/mat-icon-grid/mat-icon-grid.component';

@Component( {
  selector : 'app-importation',
  animations : [
    fadeInUpOnEnterAnimation( { anchor : 'enter'} ),
    fadeInUpOnEnterAnimation( { anchor : 'enter-delay', delay : 100 } ),
  ],
  template : `
    <mat-card @enter>
      <h2>Importation</h2>
      <mat-form-field style="width: 100%">
        <textarea matInput placeholder="Copier le texte" [(ngModel)]="value" ></textarea>
      </mat-form-field>
      <button mat-stroked-button color="primary" (click)="parse()">Valider</button>
    </mat-card>

    <mat-card style="margin-top: 40px" @enter-delay>
      <div fxLayout fxLayoutAlign="space-between">
        <h2>Ouvrir les fichiers</h2>
      </div>
      <ag-grid-angular
        style="height: 400px; width: 100%"
        class="ag-theme-material"
        [defaultColDef]="defaultColDef"
        [columnDefs]="columnDef"
        [rowData]="parsedData"
      ></ag-grid-angular>
    </mat-card>

  `,
  styles : [],
  changeDetection : ChangeDetectionStrategy.OnPush
} )
export class ImportationComponent implements OnInit {
  value: string;
  parsedData = [];
  public defaultColDef = {
    resizable : true,
    sortable : true,
    filter : true
    // unSortIcon: true
  };
  columnDef = [
    {
      field : 'score',
      width : 100,
      cellRenderer : percentCellRenderer
    }, {
      field : 'titre',
      width : '400'
    }, {
      field : 'type',
      menuTabs : [ 'filterMenuTab' ],
      width : 150,
      filterFramework : TypeFilterComponent,
      cellRendererFramework : MatIconGridComponent,
      sortable : false
    }, {
      field : 'date',
      width : 200,
      cellRenderer : dateRender
    }, {
      headerName : 'Afficher',
      field : 'filepath',
      cellRendererFramework : GoToFileComponent
    }, {
      field : 'auteur',
      width : 200
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  parse() {
    if ( this.value === undefined ) {
      return;
    }
    this.parsedData = JSON.parse( this.value );
    this.value = '';
  }
}
