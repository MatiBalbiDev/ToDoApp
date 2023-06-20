import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  @Input()
  listaDeItems: Item[] = [];

  @Output()
  listaDeItemsModificada: EventEmitter<Item[]> = new EventEmitter<Item[]>();

  ngOnInit(): void {
    console.log(this.listaDeItems);
  }

  quitarItem(id:  number): void {
    this.listaDeItems = this.listaDeItems.filter((item) => item.id !== id);
    this.listaDeItemsModificada.emit(this.listaDeItems);
    console.log(this.listaDeItems);
  } 
}
