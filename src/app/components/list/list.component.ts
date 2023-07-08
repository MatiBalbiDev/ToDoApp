import { Component } from '@angular/core';
import { Item } from 'src/app/models/item.model';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  public valorIngresado: string = '';

  public item: Item;

  public listaDeItems: Item[] = [];

  constructor() {
    this.item = {
      id: 0,
      description: '',
      checked: false,
    };
  }

  ngOnInit(): void {}

  guardarValor(): void {
    if (this.valorIngresado.length) {
      this.item = {
        id: this.listaDeItems.length + 1,
        description: this.valorIngresado,
        checked: false,
      };
      this.limpiarValor();
      this.listaDeItems.push(this.item);
    } else {
      return;
    }
  }

  limpiarValor(): void {
    this.valorIngresado = '';
  }

  actualizarLista(nuevaLista: Item[]): void {
    this.listaDeItems = nuevaLista;
  }
}
