import { Component } from '@angular/core';
import { Icons }     from '../../../services/icon-service.service';

@Component( {
  selector : 'app-mat-icon-grid',
  template : `
    <p *ngIf="value" style="margin: 0">
      <mat-icon [svgIcon]="value"></mat-icon>
      {{ value }}</p>
    <p *ngIf="!value" style="margin: 0">
      <mat-icon>event_seat</mat-icon>
      {{ unkown }}
    </p>
  `,
  styles : []
} )
export class MatIconGridComponent {
  value: any;
  unkown: any;

  constructor() { }

  agInit( params: any ) {
    this.value = params.value.toLowerCase();
    this.unkown = this.value;
    if ( this.value ) {
      this.value === 'xlsx' ? this.value = 'xls' : 0;
      this.value === 'docx' ? this.value = 'doc' : 0;
      this.value === 'pptx' ? this.value = 'ppt' : 0;
    }
    const value = Object.values( Icons ).filter( ( el ) => el === this.value )[ 0 ];
    this.value = value;

  }

}
