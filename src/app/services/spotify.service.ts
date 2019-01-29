import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Servicio Spotify listo')
   }


   getQuery( query:string)
   {
     const url = 'https://api.spotify.com/v1/'+query;

     const headers = new HttpHeaders({
       'Authorization': 'Bearer  xBQBNhwDoxsx0A50QzOU0Dme2N12ngYEEaHuj46YWPOM8fueJeL2uEmI5n_2unTYjlvjnXFI11fw-xhofGaI'

     });

     return this.http.get(url, {headers});

   }


   getNewReleases(){

     return this.getQuery('browse/new-releases?limit=20')
        .pipe( map( data => data['albums'].items) )

   }

   getArtistas(termino:string){

     return this.getQuery('search?q='+termino+'&type=artist&market=es&limit=15')
     .pipe( map( data => data['artists'].items))


   }


   getArtista(id:string){

     return this.getQuery('artists/'+id);
    // .pipe( map( data => data['artists'].items))


   }

   getTopTracks(id:string){

     return this.getQuery('artists/'+id+'/top-tracks?country=us')
      .pipe( map( data => data['tracks']))


   }


}
