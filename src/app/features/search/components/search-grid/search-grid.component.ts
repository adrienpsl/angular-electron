import { Component, OnInit, Input }    from '@angular/core';
import FakeData                        from '../../fake/data';
import { ColumnApi, GridApi }          from 'ag-grid-community';
import { Observable, BehaviorSubject } from 'rxjs';
import { TypeFilterComponent }         from '../../ag-grid-stuff/type-filter/type-filter.component';
import { MatIconGridComponent }        from '../../ag-grid-stuff/mat-icon-grid/mat-icon-grid.component';
import { AgMatSelectComponent }        from '../../ag-grid-stuff/ag-mat-select/ag-mat-select.component';
import { DataService }                 from '../../../services/data.service';

@Component( {
  selector : 'app-search-grid',
  template : `
    <!--    <div style="padding: 20px">-->
    <!--      <button mat-stroked-button color="primary" (click)="getSelectedRows()">valider la selection</button>-->
    <!--    </div>-->
    <ng-template #loading>
      <mat-card style="padding: 40px; margin: auto" fxLayout fxLayoutAlign="center center">
        <mat-spinner></mat-spinner>
      </mat-card>
    </ng-template>

    <mat-card *ngIf="(dataService.loading | async) === false; else loading">
      <ag-grid-angular
        #agGrid
        style="width:100%; height: 80vh"
        class="ag-theme-material"

        [defaultColDef]="defaultColDef"
        [frameworkComponents]="frameworkComponent"
        [columnDefs]="columnDef"
        [rowData]="dataService.gridData | async"

        [overlayLoadingTemplate]="loadingTemplate"
        [overlayNoRowsTemplate]="noRowsTemplate"

        (gridReady)="onGridReady($event)"
        (rowSelected)="rowSelect($event)"

        enableCharts
        enableRangeSelection
        suppressMenuHide="true"

        suppressRowClickSelection
        rowSelection="multiple">
      </ag-grid-angular>
    </mat-card>

  `,
  styles : [
      `
      mat-card {
        padding: 0;
      }
    `
  ]
  // changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SearchGridComponent implements OnInit {

  loadingTemplate = `Chargement ...`;
  noRowsTemplate = `Pas de résultat à afficher`;

  public api: GridApi;
  public columnApi: ColumnApi;

  frameworkComponent = {
    matIcon : MatIconGridComponent,
    checkboxRenderer : AgMatSelectComponent
  };

  public defaultColDef = {
    resizable : true,
    sortable : true,
    filter : true
    // unSortIcon: true
  };

  public columnDef = [
    {
      field : 'select',
      headerName : '',
      width : 76,
      checkboxSelection : true,
      // cellRenderer : 'checkboxRenderer',
      headerCheckboxSelection : true,
      filter : false,
      sortable : true,
      pinned : true,
      suppressMenu : true

    }, {
      field : 'score',
      width : 100,
      cellRenderer : percentCellRenderer
    }, {
      field : 'titre',
      width : 200
    }, {
      field : 'date',
      width : 200,
      cellRenderer : dateRender
    }, {
      field : 'type',
      menuTabs : [ 'filterMenuTab' ],
      width : 150,
      filterFramework : TypeFilterComponent,
      cellRendererFramework : MatIconGridComponent,
      sortable : false
    }, {
      headerName : 'Réseau',
      field : 'network',
      width : 100
    }, {
      field : 'version',
      width : 150
    }, {
      field : 'auteur',
      width : 200
    }
  ];

  public rowData = buildFakeData();

  constructor( public dataService: DataService ) {}

  ngOnInit() {
  }

  public onGridReady( params ) {
    console.log( 'onGridReady' );

    this.api = params.api;
    this.columnApi = params.columnApi;
    this.columnApi.autoSizeAllColumns();
  }

  public getSelectedRows() {
    const rowsSelection = this.api.getSelectedRows();
    this.dataService.selectedResource.next( rowsSelection );
  }

  rowSelect( event: any ) {
    this.getSelectedRows();
  }
}

export const buildFakeData = () => {
  const rowData = [];
  const version = [ 0, 1, 2, 3, 4, 5 ];
  const type = [ 'pdf', 'doc', 'ppt', 'xls' ];
  for ( let i = 0; i < 200; i++ ) {
    rowData.push( {
      id : i,
      author : FakeData.firstNames[ i % FakeData.firstNames.length ] + ' ' + FakeData.lastNames[ i % FakeData.lastNames.length ],
      titre : FakeData.addresses[ i % FakeData.addresses.length ],
      date : FakeData.DOBs[ i % FakeData.DOBs.length ],
      version : `v${ version[ i % version.length ] }.${ version[ i % version.length ] }`,
      type : type[ i % type.length ],
      network : version[ i % 4 ]
    } );
  }
  return rowData;
};

export function percentCellRenderer( params ) {
  let value = ( 1 - params.value ) * 100;
  value = Math.round( value );

  const eDivPercentBar = document.createElement( 'div' );
  eDivPercentBar.className = 'div-percent-bar';
  eDivPercentBar.style.width = value + '%';
  if ( value < 20 ) {
    eDivPercentBar.style.backgroundColor = '#C13D08';
  } else if ( value < 60 ) {
    eDivPercentBar.style.backgroundColor = '#F47B2A';
  } else {
    eDivPercentBar.style.backgroundColor = '#319B31';
  }
  eDivPercentBar.style.color = 'white';
  eDivPercentBar.style.fontWeight = 'bold';

  eDivPercentBar.style.paddingLeft = '10px';
  // const eValue = document.createElement( 'div' );
  // eValue.className = 'div-percent-value';
  eDivPercentBar.innerHTML = value + '%';

  const eOuterDiv = document.createElement( 'div' );
  eOuterDiv.className = 'div-outer-div';
  // eOuterDiv.appendChild( eValue );
  eOuterDiv.appendChild( eDivPercentBar );

  return eOuterDiv;
}

export function dateRender( param ) {
  const eDivPercentBar = document.createElement( 'div' );
  eDivPercentBar.innerText = param.value.format( 'DD / MM / YYYY' );
  return eDivPercentBar;

}
