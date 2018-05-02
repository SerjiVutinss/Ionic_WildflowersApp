import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SummaryPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
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
