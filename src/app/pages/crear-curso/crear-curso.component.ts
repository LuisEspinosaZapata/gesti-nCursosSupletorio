import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-crear-curso',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css']
})
export class CrearCursoComponent {
  private fb = inject(FormBuilder);
  private svc = inject(CursosService);
  private router = inject(Router);

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    instructor: ['', [Validators.required]],
    categoria: ['', [Validators.required]],
    duracionHoras: [null as number | null, [Validators.required, Validators.min(1)]],
    fechaInicio: ['', [Validators.required]],
    costo: [null as number | null, [Validators.min(0)]],
  });

  inv(ctrl: string) { 
    const c = this.form.get(ctrl); 
    return !!(c && c.touched && c.invalid); 
  }
  
  hasErr(ctrl: string, err: string) { 
    return !!this.form.get(ctrl)?.hasError(err); 
  }

  guardar() {
    if (this.form.invalid) { 
      this.form.markAllAsTouched(); 
      return; 
    }
    const v = this.form.value;
    this.svc.addCurso({
      nombre: v.nombre!,
      descripcion: v.descripcion!,
      instructor: v.instructor!,
      categoria: v.categoria!,
      duracionHoras: Number(v.duracionHoras),
      fechaInicio: new Date(v.fechaInicio!).toISOString(),
      costo: v.costo == null ? undefined : Number(v.costo)
    });
    this.router.navigate(['/cursos']);
  }
}
