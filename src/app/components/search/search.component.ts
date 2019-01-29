import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {

  artistas: any[] = [];
  loading: boolean;
  contenido: boolean;

  constructor(private spotify: SpotifyService) { }

  buscar(termino:string){

    if (termino.length > 0) {

      this.contenido = true;
      this.loading = true;
      console.log(termino);
      this.spotify.getArtistas(termino)
        .subscribe((data:any) => {
            console.log(data);
            this.artistas = data;
            this.loading = false;
          })
    }
    else this.contenido = false;



  }

}
