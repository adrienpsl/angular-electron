import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject }                            from 'rxjs';
import { take, tap }                                  from 'rxjs/operators';
import { DataService }                                from '../../../services/data.service';

@Component( {
  selector : 'app-search-container',
  template : `

    <mat-tab-group selectedIndex="0" mat-stretch-tabs>
      <mat-tab label="Recherche">
        <div class="data-container">
          <div fxFlex="90" style="margin: 40px auto; padding: 0">

            <mat-card style="padding: 20px">
              <app-search-bar (word)="newWord($event)"></app-search-bar>
            </mat-card>

            <mat-card style="margin-top: 40px; padding: 0">
              <app-search-grid [data]="data" [selectedResource]="selectedResource"></app-search-grid>
            </mat-card>
          </div>
        </div>
      </mat-tab>

      <mat-tab label="Result">
        <div class="data-container">
          <div fxFlex="90" style="margin: 40px auto; padding: 0">
            <app-display-result [selectedElements]="selectedResource"></app-display-result>
          </div>
        </div>
      </mat-tab>

      <mat-tab label="Inporter">
        <div class="data-container">
          <div fxFlex="90" style="margin: 40px auto; padding: 0">
            <app-importation></app-importation>
          </div>
        </div>
      </mat-tab>

    </mat-tab-group>
    <!--    <button (click)="open()">test</button>-->

  `,
  styles : [ `
    mat-card {
      padding: 20px;
    }
  ` ],
  changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SearchContainerComponent implements OnInit {

  data = new BehaviorSubject( [] );
  selectedResource = new BehaviorSubject( [] );

  constructor( private dataService: DataService ) { }

  ngOnInit() {
    // this.newWord( [ 'baracouda' ] );
    // this.selectedResource.subscribe(console.log)
  }

  open() {
    // const { shell } = require( 'electron' ); // deconstructing assignment
    // shell.showItemInFolder( '/' );
  }

  newWord( event: string[] ) {
    this.dataService.getData( event ).pipe(
      take( 1 ),
      tap( ( data ) => this.data.next( data ) )
        )
        .subscribe();
  }
}
