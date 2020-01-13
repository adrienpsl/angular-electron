import { Component, OnInit, Input } from '@angular/core';
import FakeData                     from '../../fake/data';
import { ColumnApi, GridApi }       from 'ag-grid-community';
import { Observable }               from 'rxjs';

@Component( {
  selector : 'app-search-grid',
  template : `
    <!--    <button (click)="getSelectedRows()">toto</button>-->
    <ag-grid-angular #agGrid
                     style="width:100%; height: 80vh"
                     class="ag-theme-material"

                     [defaultColDef]="defaultColDef"
                     [columnDefs]="columnDef"
                     [rowData]="data | async"

                     (gridReady)="onGridReady($event)"

                     enableCharts
                     enableRangeSelection

                     suppressRowClickSelection
                     rowSelection="multiple"

    >
    </ag-grid-angular>
  `,
  styles : []
  // changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SearchGridComponent implements OnInit {

  public api: GridApi;
  public columnApi: ColumnApi;
  @Input() data: Observable<any []>;

  public defaultColDef = {
    resizable : true,
    sortable : true,
    filter : true
  };

  public columnDef = [
    {
      field : 'select',
      headerName : '#',
      width : 100,
      checkboxSelection : true,
      headerCheckboxSelection : true,
      filter : false,
      sortable : true,
      pinned : true
    }, {
      field : 'titre',
      width : 200,
      filter : true,
      sortable : true
    }, {
      field : 'author',
      width : 200,
      filter : true,
      sortable : true
    }, {
      field : 'date',
      width : 200,
      filter : true,
      sortable : true
    }, {
      field : 'version',
      width : 150,
      filter : true,
      sortable : true
    }, {
      field : 'type',
      width : 150,
      filter : true,
      sortable : true
    }, {
      field : 'network',
      width : 100,
      filter : true,
      sortable : true
    }
  ];

  public rowData = buildFakeData();

  constructor() {

  }

  ngOnInit() {
  }

  public onGridReady( params ) {
    console.log( 'onGridReady' );

    this.api = params.api;
    this.columnApi = params.columnApi;

  }

  public getSelectedRows() {
    const rowsSelection = this.api.getSelectedRows();
    // console.info( rowsSelection );
  }
}

const buildFakeData = () => {
  const rowData = [];
  const version = [ 0, 1, 2, 3, 4, 5 ];
  const type = [ 'pdf', 'word', 'ppt', 'excel' ];
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

