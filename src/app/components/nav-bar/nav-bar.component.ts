import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, AsyncPipe, NgForOf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, NgIf, AsyncPipe, NgForOf],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  auth = inject(AuthService);

  menuItems = [
    { label: 'Cursos', link: '/cursos' },
    { label: 'Crear Curso', link: '/crear-curso' }
  ];
}
