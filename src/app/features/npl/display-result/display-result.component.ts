import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar }                                from '@angular/material';
import { DataService }                                from '../../services/data.service';
import { fadeInUpOnEnterAnimation }                   from 'angular-animations';

@Component( {
  selector : 'app-npl-display-result',
  animations : [
    fadeInUpOnEnterAnimation( { anchor : 'enter' } ),
    fadeInUpOnEnterAnimation( { anchor : 'enter-delay', delay : 200 } )
  ],
  template : `
    <div fxFlex="90" style="margin: auto">
      <mat-card style="margin: 40px auto;" *ngFor="let el of dataService.nplData | async" @enter-delay>
        <mat-card-header>
          <div mat-card-avatar class="avatar"></div>
          <mat-card-title>{{ el.title}}</mat-card-title>
          <mat-card-subtitle>{{ el.author }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content *ngFor="let text of el.para">
          <div fxLayout fxLayoutAlign="space-between center">
            <h5>page : {{text.page }}</h5>
            <button mat-button color="primary" (click)="addElement()">Ajouter</button>
          </div>
          <p [innerHTML]="text.value">
          </p>
        </mat-card-content>
      </mat-card>

    </div>
  `,
  styles : [ `
    .avatar {
      background-image: url("https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg");
      background-size: cover;
      background-position: center;
    }

    mat-card-content {
      padding: 0 20px;
    }
  ` ],
  changeDetection : ChangeDetectionStrategy.OnPush
} )
export class NplDisplayResultComponent implements OnInit {

  constructor( private snackBar: MatSnackBar, public dataService: DataService ) {
  }

  addElement() {
    this.snackBar.open( 'L\'element a bien ete ajoute', undefined, { duration : 2000 } );
  }

  ngOnInit() {

  }

}
