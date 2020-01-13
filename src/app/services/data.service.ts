import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map }        from 'rxjs/operators';
import { of }         from 'rxjs';
import * as moment    from 'moment';

@Injectable( {
  providedIn : 'root'
} )
export class DataService {

  constructor( private http: HttpClient ) { }

  getData( keywords: any[] ) {
    if ( keywords.length == 0 ) {
      return of( [] );
    }
    return this.http
               .get( `http://localhost:3000/search/${ keywords }` )
               .pipe( map( ( results: any[] ) =>
                   results.map( ( element ) => {
                       const { info, ... rest } = element;
                       const res = {
                         ... info,
                         ... rest,
                         date : moment( info.date )
                       };
                       return ( res );
                     }
                   )
                 )
               );
  }

}
