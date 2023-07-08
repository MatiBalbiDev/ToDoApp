import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input()
  listaDeItems: Item[] = [];

  @Output()
  listaDeItemsModificada: EventEmitter<Item[]> = new EventEmitter<Item[]>();

  itemSeleccionado: Item | null = null;

  total: Item[] = [];

  realizadas: Item[] = [];

  modoEdicion: boolean = false;

  ngOnInit(): void {
    this.total = this.listaDeItems;
  }

  quitarItem(id: number): void {
    this.listaDeItems = this.listaDeItems.filter((item) => item.id !== id);
    this.listaDeItemsModificada.emit(this.listaDeItems);
    if (this.realizadas.length) {
      this.realizadas = this.realizadas.filter((item) => item.id !== id);
    }
    this.total = this.listaDeItems;
  }

  editarItem(item: Item): void {
    if (item != null) {
      this.modoEdicion = true;
      this.itemSeleccionado = item;
    } else {
      this.modoEdicion = false;
    }
  }

  guardarCambiosItem(): void {
    this.itemSeleccionado = null;
    this.modoEdicion = false;
  }

  cancelarEditar(): void {
    this.itemSeleccionado = null;
    this.modoEdicion = false;
  }

  marcarRealizado(item: Item): void {
    item.checked = !item.checked;
    if (item.checked) {
      this.realizadas.push(item);
    } else {
      this.realizadas = this.realizadas.filter((item) => item.checked);
    }
  }
}
