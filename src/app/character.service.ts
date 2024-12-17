import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'http://127.0.0.1:8000/api/nudis/'; // URL de la API de nudis

  constructor(private http: HttpClient) {}

  // Obtener todos los nudis
  getNudis(): Observable<any[]> {
    return this.http.get<{ nudi: any[] }>(this.apiUrl).pipe(
      map(response =>
        response.nudi.map(nudi => ({
          ...nudi,
          tamano: nudi['tamaño'], // Si la API usa "tamaño", renombrarlo a "tamano"
        }))
      ),
      catchError((error) => {
        console.error('Error al obtener los nudis:', error);
        return of([]); // Devolver un array vacío en caso de error
      })
    );
  }

  // Eliminar un nudi por ID
  deleteNudi(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`).pipe(
      catchError((error) => {
        console.error(`Error al eliminar el nudi con ID ${id}:`, error);
        return of(); // No devolver nada en caso de error
      })
    );
  }

  // Actualizar un nudi
  updateNudi(id: number, updatedNudi: any): Observable<any> {
    // Renombrar "tamano" a "tamaño" antes de enviar los datos
    const formattedNudi = {
      ...updatedNudi,
      tamaño: updatedNudi.tamano,
    };
    delete formattedNudi.tamano;

    return this.http.put<any>(`${this.apiUrl}${id}/`, formattedNudi).pipe(
      map((response) => ({
        ...response,
        tamano: response['tamaño'], // Renombrar "tamaño" a "tamano" al recibir la respuesta
      })),
      catchError((error) => {
        console.error(`Error al actualizar el nudi con ID ${id}:`, error);
        return of(null); // Devolver null en caso de error
      })
    );
  }
}
