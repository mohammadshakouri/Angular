import { Pipe, PipeTransform } from '@angular/core';
import moment from 'jalali-moment';

@Pipe({
  name: 'jalaliDate',
  pure:false
})
export class JalaliDatePipe implements PipeTransform {
  transform(value: string | Date | null | undefined, format: string = 'YYYY/MM/DD'): string {
    if (!value) return '';
    return moment(value).locale('fa').format(format);
  }
}