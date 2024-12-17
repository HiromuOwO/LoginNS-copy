import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Asegúrate de tener el servicio adecuado para usuarios
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  filteredUsuarios: any[] = [];
  searchText: string = '';

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }
  
  cargarUsuarios(): void {
    this.authService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log('Usuarios cargados:', this.usuarios);
      },
      error: (err) => console.error('Error al cargar usuarios:', err)
    });
  }
  
 

  applyFilters(): void {
    this.filteredUsuarios = this.usuarios.filter((usuario) => {
      const matchesSearch = this.searchText
        ? usuario.nombre.toLowerCase().includes(this.searchText.toLowerCase())
        : true;
      return matchesSearch;
    });
  }

  onSearchTextChanged(newSearchText: string): void {
    this.searchText = newSearchText;
    this.applyFilters();
  }

  borrarUsuario(usuarioId: number): void {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmDelete) {
      this.authService.deleteUsuario(usuarioId).subscribe(
        () => {
          this.filteredUsuarios = this.filteredUsuarios.filter((usuario) => usuario.id !== usuarioId);
          alert('Usuario eliminado exitosamente.');
        },
        (error) => {
          console.error('Error al eliminar el usuario:', error);
          alert('Error al eliminar el usuario.');
        }
      );
    }
  }

  actualizarUsuario(usuario: any): void {
    const updatedNombre = prompt('Actualizar nombre:', usuario.nombre);
    const updatedEmail = prompt('Actualizar email:', usuario.email);
    const updatedEdad = prompt('Actualizar edad:', usuario.edad);
  
    if (updatedNombre && updatedEmail && updatedEdad) {
      const updatedUsuario = {
        ...usuario, // Mantén los otros campos
        nombre: updatedNombre,
        email: updatedEmail,
        edad: updatedEdad,
      };
  
      this.authService.updateUsuario(usuario.id, updatedUsuario).subscribe(
        (response) => {
          const index = this.filteredUsuarios.findIndex((item) => item.id === usuario.id);
          if (index !== -1) {
            this.filteredUsuarios[index] = response; // Actualiza localmente
          }
          alert('Usuario actualizado exitosamente.');
        },
        (error) => {
          console.error('Error al actualizar el usuario:', error);
          alert('Error al actualizar el usuario.');
        }
      );
    }
  }

  
}
