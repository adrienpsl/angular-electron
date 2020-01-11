import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-search-container',
  template: `
    <button (click)="open()">test</button>
    <mat-tab-group>
      <mat-tab label="Recherche">
        <div fxLayout>
          <div fxFlex="90" style="margin: 40px auto">
            <app-search-bar></app-search-bar>

            <div style="margin-top: 40px">
              <app-search-grid></app-search-grid>
            </div>
          </div>
        </div>
      </mat-tab>

      <mat-tab label="Result">

      </mat-tab>


    </mat-tab-group>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  open() {
    const {shell} = require('electron') // deconstructing assignment
    shell.showItemInFolder("/")
  }
}
