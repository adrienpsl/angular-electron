import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component( {
  selector : 'app-go-to-file',
  template : `
    <button mat-stroked-button color="primary" (click)="open()">
      Afficher
    </button>
    <button style="margin-left: 5px" mat-stroked-button color="primary">Analiser</button>
  `,
  styles : [],
  changeDetection : ChangeDetectionStrategy.OnPush
} )
export class GoToFileComponent {
  value;

  agInit( param: any ) {
    this.value = param.value;
  }

  open() {
    console.log(this.value)
  }
}
