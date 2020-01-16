import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject }                            from 'rxjs';
import { take, tap }                                  from 'rxjs/operators';
import { DataService }                                from '../../../services/data.service';
import { fadeInUpOnEnterAnimation }                   from 'angular-animations';

@Component( {
  selector : 'app-search-container',
  animations : [
    fadeInUpOnEnterAnimation( { anchor : 'enter' } ),
    fadeInUpOnEnterAnimation( { anchor : 'enter-delay', delay : 100 } )
  ],
  template : `

    <div class="data-container">
      <mat-tab-group mat-stretch-tabs animationDuration="0ms">

        <mat-tab label="Recherche">
          <ng-template matTabContent>

            <div fxFlex="90" style="margin: 40px auto; padding: 0">

              <mat-card style="padding: 20px" @enter>
                <app-search-bar (word)="newWord($event)"></app-search-bar>
              </mat-card>

              <mat-card style="margin-top: 40px; padding: 0" @enter-delay>
                <app-search-grid [data]="data" [selectedResource]="selectedResource"></app-search-grid>
              </mat-card>
            </div>
          </ng-template>
        </mat-tab>

        <mat-tab label="Résultats">
          <ng-template matTabContent>
            <div fxFlex="90" style="margin: 40px auto; padding: 0">
              <app-display-result [selectedElements]="selectedResource"></app-display-result>
            </div>
          </ng-template>
        </mat-tab>

        <mat-tab label="Importer">
          <ng-template matTabContent>
            <div fxFlex="90" style="margin: 40px auto; padding: 0">
              <app-importation></app-importation>
            </div>
          </ng-template>
        </mat-tab>

      </mat-tab-group>
    </div>
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
