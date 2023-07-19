import { Component } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { SessionStorageService } from 'src/app/services/local-storage.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  public valorIngresado: string = '';

  public item: Item = {
    id: 0,
    description: '',
    checked: false,
  };

  public listaDeItems: Item[] = [];

  storageKey: string = 'listaDeItems';

  total: Item[] = [];
  realizadas: Item[] = [];

  constructor(private sessionStorageService: SessionStorageService) {}

  /**
   * Corregir visual de mobile
   * Agregar persitencia de tareas
   */

  ngOnInit(): void {
    this.recuperarDatosDelLocalStorage();
  }

  guardarValor(): void {
    if (this.valorIngresado.trim().length) {
      this.item = {
        id: this.listaDeItems.length + 1,
        description: this.valorIngresado,
        checked: false,
      };
      this.listaDeItems.push(this.item);

      this.sessionStorageService.setItem(this.storageKey, this.listaDeItems);

      this.limpiarValor();

      this.recuperarDatosDelLocalStorage();
    } else {
      return;
    }
  }

  limpiarValor(): void {
    this.valorIngresado = '';
  }

  actualizarLista(nuevaLista: Item[]): void {
    this.listaDeItems = nuevaLista;
    this.sessionStorageService.setItem(this.storageKey, this.listaDeItems);
    this.recuperarDatosDelLocalStorage();
  }

  private recuperarDatosDelLocalStorage(): void {
    const storedItems = this.sessionStorageService.getItem(this.storageKey);
    this.listaDeItems = storedItems || [];
    this.actualizarTotal();
  }

  private actualizarTotal(): void {
    this.total = this.listaDeItems;
    this.realizadas = this.listaDeItems.filter((item) => item.checked);
  }
}
