import { Pipe, PipeTransform } from '@angular/core';

/**
* Takes a string value and returns a shortened version, terminated with '...'
*
* @param limit trim the origina value to this number of characters,
* then append '...'
*/
@Pipe({
  name: 'summary',
})
export class SummaryPipe implements PipeTransform {
  /**
   * Takes a string value and returns a shortened version, terminated with '...'
   */
  transform(value: string, limit?: number) {
    if (!value)
      return null;

    let actualLimit = (limit) ? limit : 256;

    if (value.length >= actualLimit) {
      return value.substr(0, actualLimit) + '...';
    } else {
      return value;
    }
  }
}
