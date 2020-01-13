import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService }                                from '../../../../services/data.service';
import { BehaviorSubject }                            from 'rxjs';
import { take, tap }                                  from 'rxjs/operators';

@Component( {
  selector : 'app-search-container',
  template : `
    <button (click)="open()">test</button>
    <mat-tab-group>
      <mat-tab label="Recherche">
        <div fxLayout>
          <div fxFlex="90" style="margin: 40px auto">
            <app-search-bar (word)="newWord($event)"></app-search-bar>

            <div style="margin-top: 40px">
              <app-search-grid [data]="data"></app-search-grid>
            </div>
          </div>
        </div>
      </mat-tab>

      <mat-tab label="Result">

      </mat-tab>

    </mat-tab-group>
  `,
  styles : [],
  changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SearchContainerComponent implements OnInit {

  data = new BehaviorSubject( [] );

  constructor( private dataService: DataService ) { }

  ngOnInit() {
  }

  open() {
    // const {shell} = require('electron') // deconstructing assignment
    // shell.showItemInFolder("/")
  }

  newWord( event: string[] ) {
    this.dataService.getData( event ).pipe(
      take( 1 ),
      tap( ( data ) => this.data.next( data ) )
        )
        .subscribe();
  }
}
