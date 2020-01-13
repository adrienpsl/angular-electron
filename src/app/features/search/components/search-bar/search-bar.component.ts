import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
}                         from '@angular/core';
import { Observable }     from 'rxjs';
import { FormControl }    from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component( {
  selector : 'app-search-bar',
  template : `
    <form class="example-form" (ngSubmit)="add(inputCtrl.value)"
          [style.fontSize.px]="'30'">

      <mat-form-field class="example-full-width">

        <input matInput placeholder="Key words..." aria-label="State"
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
        *ngFor="let tag of tags"
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
  changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SearchBarComponent {
  @Output() word = new EventEmitter<string[]>();
  fakeTags: string[] = [ 'Afrique', 'Baracuda', 'scorpion', 'asie', 'Strawberry' ];
  inputCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];

  constructor() {
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
      this.tags.push( this.inputCtrl.value );
    } else {
      this.tags.push( event );
    }

    this.word.emit( this.tags );
    this.inputCtrl.setValue( null );
  }

  remove( fruit: string ): void {
    const index = this.tags.indexOf( fruit );
    if ( index >= 0 ) {
      this.tags.splice( index, 1 );
      this.word.emit(this.tags)
    }
  }

  private _filter( value: string ): string[] {
    const filterValue = value.toLowerCase();
    return this.fakeTags.filter(
      fruit => fruit.toLowerCase().indexOf( filterValue ) === 0 );
  }
}
