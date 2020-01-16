import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IFilterAngularComp }                 from 'ag-grid-angular';
import { IFilterParams }                      from 'ag-grid-community';

@Component( {
  selector : 'app-type-filter',
  template :
      `
    <div style="display: inline-block">
      <div style="text-align: center; background: lightgray; width: 100%; display: block; border-bottom: 1px solid grey">
        <b>Custom Skills Filter</b>
      </div>
      <div *ngFor="let icon of icons" style="margin-top: 3px; float: left; ">
        <label style="border: 1px solid lightgrey; margin: 4px; padding: 4px; display: inline-block; width: 100px; height: 100px">
                    <span>
                        <div style="text-align:center">{{icon.name}}</div>
                        <div>
                          <mat-checkbox color="accent" [(ngModel)]="icon.selected" (click)="onSkillChanged($event, icon.selected)">
                            <mat-icon [svgIcon]="icon.icon" style="width: 60px; height: 60px"></mat-icon>
                          </mat-checkbox>
                        </div>
                    </span>
        </label>
      </div>
    </div>
  `,
  styles : [],
  changeDetection : ChangeDetectionStrategy.OnPush
} )
export class TypeFilterComponent implements IFilterAngularComp {

  icons = [
    { name : 'Word', field : 'word', icon : 'doc', selected : false },
    { name : 'Excel', field : 'excel', icon : 'xls', selected : false },
    { name : 'Ppt', field : 'ppt', icon : 'ppt', selected : false }
  ];

  private params: IFilterParams;

  agInit( params: IFilterParams ): void {
    this.params = params;
  }

  onSkillChanged( $event, skill ) {
    setTimeout( () => {
      this.params.filterChangedCallback();
    }, 100 );
  }

  getModel() {
    return this.icons.reduce( ( state, skill ) => {
      state[ skill.field ] = skill.selected;
      return state;
    }, {} );
  }

  setModel( model ) {
    for ( const skill of this.icons ) {
      skill.selected = model && model[ skill.field ] ? model[ skill.field ].selected : false;
    }
  }

  doesFilterPass( params ) {
    const type = params.data.type;

    for ( const element of this.icons ) {
      if ( element.selected === true && ( type.localeCompare( element.icon ) === 0 || type.localeCompare( element.icon + 'x' ) === 0 ) ) {
        // console.log( element.icon, type );
        return true;
      }
    }
    return false;
  }

  public isFilterActive() {
    return true;
  }

}
