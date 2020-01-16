import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Observable }                                               from 'rxjs';
import { FormControl }                                              from '@angular/forms';
import { map, startWith }                                           from 'rxjs/operators';
import { DataService }                                              from '../../../services/data.service';

@Component( {
  selector : 'app-search-bar',
  template : `
    <form class="example-form" (ngSubmit)="add(inputCtrl.value)"
          [style.fontSize.px]="'30'">

      <mat-form-field class="example-full-width">
        <mat-icon style="font-size: 30px; margin-right: 20px" matPrefix color="primary">search</mat-icon>
        <input matInput placeholder="Mots-clés" aria-label="State"
               [matAutocomplete]="auto" [formControl]="inputCtrl">

        <mat-autocomplete #auto="matAutocomplete" (closed)="add(undefined)">

          <mat-option *ngFor="let element of filteredTags| async"
                      [value]="element">
            <p>{{ element }}</p>
          </mat-option>

        </mat-autocomplete>
      </mat-form-field>

    </form>

    <mat-chip-list #chipList aria-label="Fruit selection">
      <mat-chip
        *ngFor="let tag of dataService.keywork"
        (removed)="remove(tag)">
        {{tag}}
        <mat-icon matChipRemove>cancel</mat-icon>
      </mat-chip>
    </mat-chip-list>

  `,
  styles : [ `
    mat-form-field {
      width: 100%;
    }
  ` ],
} )
export class SearchBarComponent {
  @Output() word = new EventEmitter<string[]>();
  fakeTags: string[] = [];
  inputCtrl = new FormControl();
  filteredTags: Observable<string[]>;

  constructor( public dataService: DataService ) {
    this.filteredTags = this.inputCtrl.valueChanges.pipe(
      startWith( null ),
      map( ( fruit: string | null ) => fruit ? this._filter(
        fruit ) : this.fakeTags.slice() ) );
  }

  add( event: string ): void {
    if ( event == undefined && undefined == this.inputCtrl.value ) {
      return;
    }

    if ( event === undefined ) {
      this.dataService.keywork.push( this.inputCtrl.value );
    } else {
      this.dataService.keywork.push( event );
    }

    this.dataService.getData(this.dataService.keywork)
    this.inputCtrl.setValue( null );
  }

  remove( fruit: string ): void {
    const index = this.dataService.keywork.indexOf( fruit );
    if ( index >= 0 ) {
      this.dataService.keywork.splice( index, 1 );
      this.word.emit( this.dataService.keywork );
    }
  }

  private _filter( value: string ): string[] {
    const filterValue = value.toLowerCase();
    return this.fakeTags.filter(
      fruit => fruit.toLowerCase().indexOf( filterValue ) === 0 );
  }
}
