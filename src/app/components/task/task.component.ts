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

  ngOnInit(): void {
    console.log(this.listaDeItems);
  }

  quitarItem(id: number): void {
    this.listaDeItems = this.listaDeItems.filter((item) => item.id !== id);
    this.listaDeItemsModificada.emit(this.listaDeItems);
    console.log(this.listaDeItems);
  }

  editarItem(item: Item): void {
    if (item != null) {
      this.itemSeleccionado = item;
      console.log(this.itemSeleccionado);
    }
  }

  guardarCambiosItem(): void {
    this.itemSeleccionado = null;
  }

  cancelarEditar(): void {
    this.itemSeleccionado = null;
  }
}
