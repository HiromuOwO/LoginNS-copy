import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service'; // El servicio mantiene su nombre
import { MatDialog } from '@angular/material/dialog';
import { DetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit {
  nudis: any[] = [];
  filteredNudis: any[] = [];
  allNudis: any[] = [];
  searchText: string = '';
  p: number = 1;

  constructor(private characterService: CharacterService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Usamos el CharacterService para obtener los nudis
    this.characterService.getNudis().subscribe((data) => {
      this.allNudis = data; // Lista completa de nudis
      this.filteredNudis = this.allNudis; // Inicialmente muestra todos
    });
  }

  applyFilters(): void {
    this.filteredNudis = this.allNudis.filter((nudi) => {
      const matchesSearch = this.searchText
        ? nudi.nombre.toLowerCase().includes(this.searchText.toLowerCase())
        : true;
      return matchesSearch;
    });
  }

  onSearchTextChanged(newSearchText: string): void {
    this.searchText = newSearchText;
    this.applyFilters();
  }

  openModal(nudi: any): void {
    this.dialog.open(DetallesComponent, {
      data: nudi,
    });
  }

  borrarNudi(nudiId: number): void {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este nudi?');
    if (confirmDelete) {
      this.filteredNudis = this.filteredNudis.filter((nudi) => nudi.id !== nudiId);
      alert('Nudi eliminado exitosamente.');
    }
  }

  actualizarNudi(nudi: any): void {
    const updatedNombre = prompt('Actualizar nombre:', nudi.nombre);
    const updatedEspecie = prompt('Actualizar especie:', nudi.especie);
    const updatedTamano = prompt('Actualizar tamaño:', nudi.tamano);

    if (updatedNombre && updatedEspecie && updatedTamano) {
      nudi.nombre = updatedNombre;
      nudi.especie = updatedEspecie;
      nudi.tamano = updatedTamano;
      alert('Nudi actualizado exitosamente.');
    }
  }
}
