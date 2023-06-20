import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/item.model';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {


  /**
   * TODO:
   * - Borrar tarea
   * - Editar tarea
   * - Marcar tarea como realizada
   * - Persistir tarea
   * - Agregar hover sobre la tarea
   * - Agregar iconos para editar, borrar y confirmar o hacerlo haciendo clicks..
   * - Mostrar la cantidad de tareas realizadas/pendientes
   * - Subirlo al repo y deployarlo
   * 
   * 
   */

  /* @Input() */

  public valorIngresado: string = '';

  public item : Item;

  public listaDeItems: Item[] = [];  
  
  constructor() {
    this.item = {
      id: 0,
      description: '',
      checked: false
    };
  }

  ngOnInit(): void {
  }

  guardarValor() : void {
    if(this.valorIngresado.length)
    this.item = {
      id: this.listaDeItems.length + 1,
      description: this.valorIngresado,
      checked: false
    }
    this.listaDeItems.push(this.item);
    this.limpiarValor();
  }

  limpiarValor(): void {
    this.valorIngresado = '';
  }

  actualizarLista(nuevaLista: Item[]): void {
    this.listaDeItems = nuevaLista;
  }
}
