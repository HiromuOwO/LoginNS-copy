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
}
