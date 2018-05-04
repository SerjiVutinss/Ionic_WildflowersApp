import { Pipe, PipeTransform } from '@angular/core';

/**
 * Takes an Imgur link and returns a thumbnail link for that image
 * 
 * Note: any Imgur image can converted to a thumbnail by adding
 * a character before the .jpg part of the filename.
 * 
 * I have implemented small 's' and medium 'm' sized thumbnails
 * 
 * Example: 
 * 
 * @param size determines the size of the thumbnail link, 
 * valid values are 's' and 'm', else default to 'm'
 */
@Pipe({
  name: 'thumbnail',
})
export class ThumbnailPipe implements PipeTransform {

  transform(value: string, size) {

    let type: string;
    // decide what size depending on the input
    switch (size) {
      case 's':
        type = 's';
        break;
      case 'm':
        type = 'm';
        break;
      default:
        type = 'm';
        break;
    }
    // trim the .jpg from the end of the link
    let thumbnailLink = value.substr(0, value.length - 4);
    // and now rebuild the thumbnail link, 
    // appending both the size charachter and .jpg
    thumbnailLink = thumbnailLink + size + ".jpg";

    // return the thumbnal link
    return thumbnailLink;
  }
}
