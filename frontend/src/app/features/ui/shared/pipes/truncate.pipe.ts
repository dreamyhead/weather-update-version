import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  pure: false
})

export class TruncatePipe implements PipeTransform {

  transform(value: number | undefined): any {
    if (!value) {
      return;
    }

    return Math.floor(value);
  }
}
