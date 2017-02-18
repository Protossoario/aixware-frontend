import { Pipe, PipeTransform } from '@angular/core';
import { Unit } from '../../_models/unit';

@Pipe({
  name: 'unitFilter'
})
export class UnitFilterPipe implements PipeTransform {

  transform(units: Unit[], args?: boolean): any {
    return units.filter(u => args ? u.active : !u.active);
  }

}
