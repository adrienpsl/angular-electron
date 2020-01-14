import { Injectable }          from '@angular/core';
import { HttpClient }          from '@angular/common/http';
import { map }                 from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import * as moment             from 'moment';

@Injectable( {
  providedIn : 'root'
} )
export class DataService {
  loading = new BehaviorSubject( false );

  constructor( private http: HttpClient ) { }

  getData( keywords: any[] ) {
    if ( keywords.length == 0 ) {
      return of( [] );
    }
    this.loading.next( true );
    return this.http
               .get( `https://server-demo-armee-2020.herokuapp.com/search/${ keywords }` )
               .pipe(
                 map( ( res: any[] ) => res.slice( 0, 100 ) ),
                 map( ( results: any[] ) =>
                   results.map( ( element ) => {
                       const { item, ... rest } = element;
                       const res = {
                         ... item,
                         ... rest,
                         date : item.date ? moment( item.date ) : moment( item.date_modif )
                       };
                       // console.log( res );
                       this.loading.next( false );
                       return ( res );
                     }
                   )
                 )
               );
  }

}
