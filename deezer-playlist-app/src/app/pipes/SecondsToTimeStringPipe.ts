import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTimeString'
})
export class MinuteSecondsPipe implements PipeTransform {

  transform(value: number): string {
    var pad = function (input) { return input < 10 ? "0" + input : input; };
    return [
      pad(Math.floor(value / 3600)),
      pad(Math.floor(value % 3600 / 60)),
      pad(Math.floor(value % 60)),
    ].join(':');
  }

}