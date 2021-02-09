import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
  name: 'jalalidatetime'
})
export class JalalidatetimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let MomentDate = moment(value, 'YYYY-MM-DD HH:mm');
    return MomentDate.locale('fa').format('HH:mm YYYY-MM-DD');
  }

}
