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
      this.itemSeleccionado = item;
    }
  }

  guardarCambiosItem(): void {
    this.itemSeleccionado = null;
  }

  cancelarEditar(): void {
    this.itemSeleccionado = null;
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
