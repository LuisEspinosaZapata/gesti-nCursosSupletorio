import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horas',
  standalone: true
})
export class HorasPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null) return '';
    const n = Number(value);
    if (Number.isNaN(n)) return '';
    return n === 1 ? '1 hora' : `${n} horas`;
  }
}
