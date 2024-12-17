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
      width: '800px',
      maxWidth: '100vw',
      panelClass: 'custom-modal-container',
      data: nudi,
      disableClose: false, // Permite cerrar el modal
    });
  }

  borrarNudi(nudiId: number): void {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este nudi?');
    if (confirmDelete) {
      this.characterService.deleteNudi(nudiId).subscribe(
        () => {
          this.filteredNudis = this.filteredNudis.filter((nudi) => nudi.id !== nudiId);
          alert('Nudi eliminado exitosamente.');
        },
        (error) => {
          console.error('Error al eliminar el nudi:', error);
          alert('Error al eliminar el nudi.');
        }
      );
    }
  }

  actualizarNudi(nudi: any): void {
    const updatedNombre = prompt('Actualizar nombre:', nudi.nombre);
    const updatedTamano = prompt('Actualizar tamaño:', nudi.tamano);
    const updatedSociabilidad = prompt('Actualizar sociabilidad:', nudi.sociabilidad);
    const updatedDieta = prompt('Actualizar dieta:', nudi.dieta);
  
    if (updatedNombre && updatedTamano && updatedSociabilidad && updatedDieta) {
      const updatedNudi = {
        ...nudi, // Mantén los otros campos
        nombre: updatedNombre,
        tamano: updatedTamano,
        sociabilidad: updatedSociabilidad,
        dieta: updatedDieta,
      };
  
      this.characterService.updateNudi(nudi.id, updatedNudi).subscribe(
        (response) => {
          const index = this.filteredNudis.findIndex((item) => item.id === nudi.id);
          if (index !== -1) {
            this.filteredNudis[index] = response; // Actualiza localmente
          }
          alert('Nudi actualizado exitosamente.');
        },
        (error) => {
          console.error('Error al actualizar el nudi:', error);
          alert('Error al actualizar el nudi.');
        }
      );
    }
  }
}
