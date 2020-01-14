import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GoToFileComponent }                          from '../../ag-grid-stuff/go-to-file/go-to-file.component';

@Component( {
  selector : 'app-importation',
  template : `
    <mat-card>
      <h2>Importation</h2>
      <mat-form-field style="width: 100%">
        <textarea matInput placeholder="Copiez le texte" [(ngModel)]="value" ></textarea>
      </mat-form-field>
      <button mat-stroked-button color="primary" (click)="parse()">valider</button>
    </mat-card>

    <mat-card style="margin-top: 40px">
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
      field : 'titre',
      width : '800'
    },
    {
      headerName : 'Afficher',
      field : 'filepath',
      cellRendererFramework : GoToFileComponent
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
