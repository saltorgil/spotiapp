import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { from } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SpotifyService {
  token: string;

  constructor(private http: HttpClient) {
    console.log("Servicio Spotify listo");
  }

  getToken() {
    const body = new URLSearchParams();
    body.set("grant_type", "client_credentials");
    body.set("client_id", "cc8a795e74564ff08af5bf02a4b3c998");
    body.set("client_secret", "151ccbc1f40149328d7ecf058794bfee");

    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });

    return this.http.post(
      "https://accounts.spotify.com/api/token",
      body.toString(),
      {
        headers,
      }
    );
  }

  getQuery(query: string): Observable<Object> {
    return this.getToken().pipe(
      switchMap((token) => {
        const url = "https://api.spotify.com/v1/" + query;
        const headers = new HttpHeaders({
          Authorization: "Bearer  " + token["access_token"],
        });
        return this.http.get(url, { headers });
      })
    );
  }

  getNewReleases() {
    return this.getQuery("browse/new-releases?limit=20").pipe(
      map((data) => data["albums"].items)
    );
  }

  getArtistas(termino: string) {
    return this.getQuery(
      "search?q=" + termino + "&type=artist&market=es&limit=15"
    ).pipe(map((data) => data["artists"].items));
  }

  getArtista(id: string) {
    return this.getQuery("artists/" + id);
    // .pipe( map( data => data['artists'].items))
  }

  getTopTracks(id: string) {
    return this.getQuery("artists/" + id + "/top-tracks?country=us").pipe(
      map((data) => data["tracks"])
    );
  }
}
