import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';

export interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  instructor: string;
  duracionHoras: number;
  categoria: string;
  fechaInicio: string;
  costo?: number;
}

@Injectable({ providedIn: 'root' })
export class CursosService {
  private _cursos$ = new BehaviorSubject<Curso[]>([]);
  cursos$ = this._cursos$.asObservable();

  constructor(private http: HttpClient) {
    this.http.get<Curso[]>('/assets/cursos.json')
      .pipe(map(x => x ?? []))
      .subscribe(list => this._cursos$.next(list));
  }

  addCurso(curso: Omit<Curso, 'id'>) {
    const list = this._cursos$.value;
    const id = list.length ? Math.max(...list.map(c => c.id)) + 1 : 1;
    this._cursos$.next([...list, { id, ...curso }]);
  }
}
