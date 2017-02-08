import { Pipe, PipeTransform } from '@angular/core';
import { Unit } from './unit';

@Pipe({
  name: 'unitFilter'
})
export class UnitFilterPipe implements PipeTransform {

  transform(units: Unit[], args?: boolean): any {
    return units.filter(u => args ? u.active : !u.active);
  }

}
