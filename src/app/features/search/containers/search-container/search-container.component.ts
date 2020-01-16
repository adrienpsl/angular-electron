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
    <div style="background: whitesmoke; padding: 20px">
      <mat-card style="padding: 20px;background: white">
        <h1>Recherche</h1>
        <app-search-bar></app-search-bar>
      </mat-card>
    </div>
    <div class="data-container">
      <mat-tab-group mat-stretch-tabs selectedIndex="0" animationDuration="0ms">

        <mat-tab label="Recherche">
          <ng-template matTabContent>

            <div fxFlex="90" style="margin: 40px auto; padding: 0">

              <mat-card style="margin-top: 40px; padding: 0" @enter-delay>
                <app-search-grid></app-search-grid>
              </mat-card>
            </div>
          </ng-template>
        </mat-tab>

        <mat-tab label="Résultats">
          <ng-template matTabContent>
            <div fxFlex="90" style="margin: 40px auto; padding: 0">
              <app-display-result></app-display-result>
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

        <mat-tab label="Recherche avancee">
          <ng-template matTabContent>
            <app-npl-display-result></app-npl-display-result>
          </ng-template>
        </mat-tab>

      </mat-tab-group>
    </div>
  `,
  styles : [ `
    mat-card {
      padding: 20px;
    }
  ` ],
  changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SearchContainerComponent  {

  constructor( private dataService: DataService ) { }


  open() {
    // const { shell } = require( 'electron' ); // deconstructing assignment
    // shell.showItemInFolder( '/' );
  }

}
