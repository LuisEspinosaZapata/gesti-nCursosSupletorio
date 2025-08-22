import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _auth$ = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this._auth$.asObservable();

  private _usuario$ = new BehaviorSubject<Usuario | null>(null);
  usuario$ = this._usuario$.asObservable();

  private usuarios: Usuario[] = [];

  constructor(private router: Router, private http: HttpClient) {
    this._auth$.next(localStorage.getItem('logged') === 'true');
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this._usuario$.next(JSON.parse(savedUser));
    }

    // Carga usuarios del JSON
    this.http.get<Usuario[]>('assets/usuarios.json').subscribe(data => this.usuarios = data);
  }

  login(email: string, password: string): boolean {
    const user = this.usuarios.find(u => u.email === email && u.password === password);

    if (user) {
      this._auth$.next(true);
      this._usuario$.next(user);
      localStorage.setItem('logged', 'true');
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/cursos']);
      return true;
    }

    // Login fallido
    this._auth$.next(false);
    this._usuario$.next(null);
    return false;
  }

  logout(): void {
    this._auth$.next(false);
    this._usuario$.next(null);
    localStorage.removeItem('logged');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this._auth$.value;
  }

  getUsuario(): Usuario | null {
    return this._usuario$.value;
  }

  // Verifica si el usuario tiene un rol específico
  hasRole(rol: string): boolean {
    return this._usuario$.value?.rol === rol;
  }
}
