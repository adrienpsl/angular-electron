import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService }                                from '../../../../services/data.service';
import { BehaviorSubject }                            from 'rxjs';
import { take, tap }                                  from 'rxjs/operators';

@Component( {
  selector : 'app-search-container',
  template : `
    <button (click)="open()">test</button>

    <mat-tab-group selectedIndex="1">
      <mat-tab label="Recherche">
        <div style="background: darkslateblue">
          <div fxFlex="90" style="margin: 40px auto; padding: 0">

            <mat-card style="padding: 20px">
              <app-search-bar (word)="newWord($event)"></app-search-bar>
            </mat-card>

            <mat-card style="margin-top: 40px; padding: 0">
              <app-search-grid [data]="data"></app-search-grid>
            </mat-card>
          </div>
        </div>
      </mat-tab>

      <mat-tab label="Result">
        <app-display-result></app-display-result>
      </mat-tab>

      <mat-tab label="exporter">

      </mat-tab>

    </mat-tab-group>
  `,
  styles : [],
  changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SearchContainerComponent implements OnInit {

  data = new BehaviorSubject( [] );

  constructor( private dataService: DataService ) { }

  ngOnInit() {}

  open() {
    const { shell } = require( 'electron' ); // deconstructing assignment
    shell.showItemInFolder( '/' );
  }

  newWord( event: string[] ) {
    this.dataService.getData( event ).pipe(
      take( 1 ),
      tap( ( data ) => this.data.next( data ) )
        )
        .subscribe();
  }
}
