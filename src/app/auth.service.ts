import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/usuarios/';  // URL de la API
  private currentUserSubject = new BehaviorSubject<any>(null);  // Usamos "any" para no depender de un modelo

  constructor(private http: HttpClient) { }

  // Iniciar sesión
  login(email: string, password: string): Observable<boolean> {
    return this.http.get<{ usuario: any[] }>(this.apiUrl).pipe(
      map(response => {
        const user = response.usuario.find(u => u.email === email && u.contraseña === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));  // Guardamos el usuario en localStorage
          this.currentUserSubject.next(user);  // Notificar a los componentes suscritos
          return true;
        }
        return false;  // No se encontró el usuario o la contraseña es incorrecta
      }),
      catchError(error => {
        console.error('Error durante el inicio de sesión:', error);
        return of(false);  // Devolver falso si ocurre un error
      })
    );
  }



  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');  // Verifica si el usuario está en localStorage
  }

  // Obtener los detalles del usuario autenticado
  getUserDetails(): Observable<any | null> {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.imagen) {
        user.avatar = user.imagen;  // Asigna el avatar si la propiedad imagen está presente
      }
      return of(user);  // Devuelve el usuario almacenado
    }
    return of(null);  // Si no hay usuario almacenado, devuelve null
  }



getUsuarios(): Observable<User[]> {
  return this.http.get<{ usuario: User[] }>(this.apiUrl).pipe(
    map(response => response.usuario), // Simplemente retorna la lista sin transformación.
    catchError(error => {
      console.error('Error al obtener los usuarios:', error);
      return of([]); // Devuelve un arreglo vacío en caso de error
    })
  );
}


  // Eliminar un usuario
  deleteUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar el usuario:', error);
        return of(null);  // Devuelve null en caso de error
      })
    );
  }

  // Actualizar un usuario
  updateUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}`, usuario).pipe(
      catchError(error => {
        console.error('Error al actualizar el usuario:', error);
        return of(null);  // Devuelve null en caso de error
      })
    );
  }
}