import { Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe, UpperCasePipe, NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { HorasPipe } from '../../pipes/horas.pipe';

@Component({
  standalone: true,
  selector: 'app-cursos',
  imports: [AsyncPipe, DatePipe, UpperCasePipe, HorasPipe, NgFor, NgIf, CurrencyPipe, RouterLink],
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {
  svc = inject(CursosService);
}
