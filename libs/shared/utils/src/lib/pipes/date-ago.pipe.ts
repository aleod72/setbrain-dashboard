import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'dateAgo',
  pure: true
})
export class DateAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29)
        return 'Maintenant';
      const intervals: { [key: string]: number } = {
        'année': 31536000,
        'mois': 2592000,
        'semaine': 604800,
        'jour': 86400,
        'h': 3600,
        'min': 60,
        's': 1
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
          if (counter === 1 || i === 'h' || i === 'min' || i === 's') {
            return 'depuis ' + counter + ' ' + i ;
          } else {
            return 'depuis ' + counter + ' ' + i + 's';
          }
      }
    }
    return value;
  }

}
