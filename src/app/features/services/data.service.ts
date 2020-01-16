import { Injectable }          from '@angular/core';
import { HttpClient }          from '@angular/common/http';
import { map, take, tap }      from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import * as moment             from 'moment';

@Injectable( {
  providedIn : 'root'
} )
export class DataService {
  loading = new BehaviorSubject( false );
  gridData = new BehaviorSubject( [] );
  selectedResource = new BehaviorSubject( [] );
  keywork = [];
  nplData = new BehaviorSubject( [] );

  constructor( private http: HttpClient ) {
    // const test = JSON.parse(
    //   '[{"score":10.89079,"title":"20190304-0314_P26_EDG_Module méthode de conduite des opérations au niveau
    // opératifs.pdf","author":"Unknown","encrypted":false,"filepath":"/Users/vincent/edg-data/Sauvegarde Sharepoint Juin 2019/Infos
    // dfense/20190304-0314_P26_EDG_Module méthode de conduite des opérations au niveau opératifs.pdf","data":{"data.4":["Salles de groupe
    // \\n\\nBriefing de décision : restitution CONOPS \\n\\nCPOIA \\n\\nSalles de groupe \\n\\nRappel sur le
    // <em>PCIAT</em>"],"data.1":["qui explique l’organisation et le fonctionnement d’un poste de commandement \\ninterarmées de théâtre
    // (<em>PCIAT</em>"],"data.3":["La P26 sera organisée en 6 <em>PCIAT</em> (<em>PCIAT</em> 1: G1/G2 - <em>PCIAT</em> 2: G3/G4 -
    // <em>PCIAT</em> 3: G5/G6 - J <em>PCIAT</em> \\n4: G7/G8","- <em>PCIAT</em> 5: G9/G10 -  <em>PCIAT</em> 6: G11/G12).","L’armement des
    // <em>PCIAT</em> est réalisé par les professeurs de groupes (PdG, fichier diffusé à partir du 07","Les PdG assureront l’accompagnement
    // des travaux des <em>PCIAT</em> de leurs bi groupes respectifs lors des \\nphases","Petits  matériels  de  bureautique,  affichage
    // <em>PCIAT</em>  1  à  6  à  l’entrée  des  salles  de  groupe,"]}},{"score":4.850469,"title":"Programme des cours P26 V 01 10
    // 2018.pdf","author":"Unknown","encrypted":false,"filepath":"/Users/vincent/edg-data/Sauvegarde Sharepoint Juin
    // 2019/RefEns/Présentation enseignement/Programme des cours P26 V 01 10 2018.pdf","data":{"data.11":["Les EFFETS \\n\\nL\'art
    // opératif\\n\\nLe niveau opératif en opérations \\n\\nOrganisation et fonctionnement du <em>PCIAT</em>"],"data.12":["Pratique de la
    // COPD en JOPG\\n\\nLa conduite des opérations au niveau opératif\\n\\n-\\n\\nTD\\n\\nFonctionnement d\'un <em>PCIAT</em>","Découverte
    // et appprentissage individuels en e-learning\\n\\n<em>PCIAT</em>\\n\\nConf. / TD La conduite au niveau opératif","Pratique du
    // <em>PCIAT</em> par les ordres à produire\\n\\nIFESO (marché) + CPOIA \\n\\nExercice
    // Coalition\\n\\nCOAL1\\n\\nConf"]}},{"score":4.5263186,"title":"20180827_NP_EdG_DA_Directive
    // PédagogiqueP26_V8.docx","author":"VILLIAUMEY COL","encrypted":false,"filepath":"/Users/vincent/edg-data/Sauvegarde Sharepoint Juin
    // 2019/RefEns/Organisation/20180827_NP_EdG_DA_Directive PédagogiqueP26_V8.docx","data":{"data.13":["le poste de chef J5 dans un
    // <em>PCIAT</em> pour les aspects operationnels."],"data.46":["politico-militaire et relations avec la diplomatie, organisation du
    // commandement, fonctionnement d\'un <em>PCIAT</em>"]}},{"score":4.5263186,"title":"20180827_NP_EdG_DA_Directive
    // PédagogiqueP26_V8.docx","author":"VILLIAUMEY COL","encrypted":false,"filepath":"/Users/vincent/edg-data/Sauvegarde Sharepoint Juin
    // 2019/RefEns/Présentation enseignement/20180827_NP_EdG_DA_Directive PédagogiqueP26_V8.docx","data":{"data.13":["le poste de chef J5
    // dans un <em>PCIAT</em> pour les aspects operationnels."],"data.46":["politico-militaire et relations avec la diplomatie,
    // organisation du commandement, fonctionnement d\'un <em>PCIAT</em>"]}},{"score":4.2959356,"title":"20180827_NP_EdG_DA_Directive
    // PédagogiqueP26_VDEF.pdf","author":"Unknown","encrypted":false,"filepath":"/Users/vincent/edg-data/Sauvegarde Sharepoint Juin
    // 2019/RefEns/Organisation/20180827_NP_EdG_DA_Directive PédagogiqueP26_VDEF.pdf","data":{"data.4":["politico-militaire  et  relations
    // avec  la \\ndiplomatie, organisation du commandement, fonctionnement d’un <em>PCIAT</em>"],"data.1":["équivalents) ; \\nle poste de
    // chef de bureau à l’EMA pour les aspects organiques ; \\nle poste de chef J5 dans un
    // <em>PCIAT</em>"]}},{"score":4.2959356,"title":"20180827_NP_EdG_DA_Directive
    // PédagogiqueP26_VDEF.pdf","author":"Unknown","encrypted":false,"filepath":"/Users/vincent/edg-data/Sauvegarde Sharepoint Juin 2019/RefEns/Présentation enseignement/20180827_NP_EdG_DA_Directive PédagogiqueP26_VDEF.pdf","data":{"data.4":["politico-militaire  et  relations  avec  la \\ndiplomatie, organisation du commandement, fonctionnement d’un <em>PCIAT</em>"],"data.1":["équivalents) ; \\nle poste de chef de bureau à l’EMA pour les aspects organiques ; \\nle poste de chef J5 dans un <em>PCIAT</em>"]}},{"score":2.7980368,"title":"Ins. ann. P26 V 01 10 2018.pdf","author":"Unknown","encrypted":false,"filepath":"/Users/vincent/edg-data/Sauvegarde Sharepoint Juin 2019/RefEns/Présentation enseignement/Ins. ann. P26 V 01 10 2018.pdf","data":{"data.8":["Il  utilise  un  e-\\nlearning sur le fonctionnement d’un <em>PCIAT</em> (poste de commandement interarmées de théâtre"]}},{"score":0.97439986,"title":"Ins. ann. P26 V 01 10 2018.docx","author":"Choutet COL","encrypted":false,"filepath":"/Users/vincent/edg-data/Sauvegarde Sharepoint Juin 2019/RefEns/Présentation enseignement/Ins. ann. P26 V 01 10 2018.docx","data":{"data.138":["Il utilise un e-learning sur le fonctionnement d\'un <em>PCIAT</em> (poste de commandement interarmees de theatre"]}}]' ); this.nplData.next( test );
  }

  getData( keywords: any[] ) {
    if ( keywords.length == 0 ) {
      return of( [] );
    }
    this.loading.next( true );
    this.http
      // .get( `https://server-demo-armee-2020.herokuapp.com/search/${ keywords }` )
        .get( `http://localhost:3000/presearch/${ keywords }` )
        .pipe(
          take( 1 ),
          map( ( res: any[] ) => res.slice( 0, 100 ) ),
          map( ( results: any[] ) =>
            results.map( ( element ) => {
                const { item, ... rest } = element;
                const res = {
                  ... item,
                  ... rest,
                  date : item.date ? moment( item.date ) : moment( item.date_modif )
                };
                return ( res );
              }
            )
          ),
          tap( ( data ) => {
            this.loading.next( false );
            this.gridData.next( data );
          } )
        ).subscribe();

    this.http.get( `http://localhost:3000/es/${ keywords }` )
        .pipe(
          take( 1 ),
          map( ( arr: any[] ) => arr.map( ( { data, ... rest } ) => {
            const para = Object.entries( data ).map( ( [ key, value ] ) => {
              const props = key.replace( 'data.', '' );
              return { page : props, value };
            } );
            return { para, ... rest };
          } ) ),
          tap( ( data ) => this.nplData.next( data ) )
        ).subscribe();

  }

}
