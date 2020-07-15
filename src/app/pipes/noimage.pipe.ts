import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "noimage",
})
export class NoimagePipe implements PipeTransform {
  transform(images: any[]): string {
    /*   if (!images){
    return 'assets/img/noimage.png'
  }

  if (images.length > 0)
  {
    return images[0].url
  }
  else{
    return 'assets/img/noimage.png'
  } */

    /*   if (!images){
    return 'assets/img/noimage.png'
  }
  
  return images.length > 0 ?  images[0].url : 'assets/img/noimage.png'; */

    let image: string = "assets/img/noimage.png";
    image = images && images.length > 0 && images[0].url;

    return image;
  }
}
