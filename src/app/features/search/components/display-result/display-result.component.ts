import { Component, OnInit, Input }        from '@angular/core';
import { Observable }                      from 'rxjs';
import { tap }                             from 'rxjs/operators';
import { GoToFileComponent }               from '../../ag-grid-stuff/go-to-file/go-to-file.component';
import { percentCellRenderer, dateRender } from '../search-grid/search-grid.component';
import { TypeFilterComponent }             from '../../ag-grid-stuff/type-filter/type-filter.component';
import { MatIconGridComponent }            from '../../ag-grid-stuff/mat-icon-grid/mat-icon-grid.component';
import { fadeInUpOnEnterAnimation }        from 'angular-animations';

export const Network = {
  intradef : 'intradef',
  intraced : 'intraced',
  frops : 'frops'
};

@Component( {
  selector : 'app-display-result',
  animations : [
    fadeInUpOnEnterAnimation( { anchor : 'enter'} ),
    fadeInUpOnEnterAnimation( { anchor : 'enter-delay', delay : 100 } ),
  ],
  template : `

    <mat-card @enter>
      <div fxLayout fxLayoutAlign="space-between">
        <h2>{{ network.intradef | titlecase }}</h2>
        <button color="warn" mat-button (click)="mailTo(network.intradef)">Exporter</button>
      </div>
      <ag-grid-angular
        style="height: 400px; width: 100%"
        class="ag-theme-material"
        [defaultColDef]="defaultColDef"
        [columnDefs]="columnDef"
        [rowData]="state[network.intradef]"
      ></ag-grid-angular>
    </mat-card>

    <mat-card class="margin-top" @enter-delay>
      <div fxLayout fxLayoutAlign="space-between">
        <h2>{{ network.intraced | titlecase }}</h2>
        <button color="warn" mat-button (click)="mailTo(network.intraced)">Exporter</button>
      </div>
      <ag-grid-angular
        style="height: 400px; width: 100%"
        class="ag-theme-material"
        [defaultColDef]="defaultColDef"
        [columnDefs]="columnDef"
        [rowData]="state.intraced"
      ></ag-grid-angular>
    </mat-card>

    <mat-card class="margin-top">
      <div fxLayout fxLayoutAlign="space-between">
        <h2>FrOps</h2>
        <button color="warn" mat-button (click)="mailTo(network.frops)">Exporter</button>
      </div>
      <ag-grid-angular
        style="height: 400px; width: 100%"
        class="ag-theme-material"
        [defaultColDef]="defaultColDef"
        [columnDefs]="columnDef"
        [rowData]="state.frops"
      ></ag-grid-angular>
    </mat-card>


  `,
  styles : [ `
    .margin-top {
      margin-top: 40px
    }
  ` ]
} )
export class DisplayResultComponent implements OnInit {
  network = Network;
  @Input() selectedElements: Observable<any[]>;
  state = {
    intradef : [],
    frops : [],
    intraced : []
  };
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

  resetState() {
    this.state = {
      intradef : [],
      frops : [],
      intraced : []
    };

  }

  ngOnInit() {

    const selectNetwork = () => this.selectedElements.pipe(
      tap( ( data ) => {
        console.log( data );
        this.resetState();

        data.map( ( el ) => {
          let { network } = el;
          network = network.toLowerCase();
          if ( network.localeCompare( this.network.intradef ) === 0 ) {
            this.state.intradef.push( el );
          } else if ( network.localeCompare( this.network.intraced ) === 0 ) {
            this.state.intraced.push( el );
          } else if ( network.localeCompare( this.network.frops ) === 0 ) {
            this.state.frops.push( el );
          }
        } );
      } )
    );

    selectNetwork().subscribe();

  }

  mailTo( network: string ) {
    window.open( `mailto:yeah@cool.com?subject=${ network }&body=${ JSON.stringify( this.state[ network ] ) }` );
  }
}
