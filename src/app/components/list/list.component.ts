import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  @Input()
  item: string = "";

  public listaDeItems: string[] = [];  
  
  constructor() {}

  ngOnInit(): void {
  }

  guardarValor(item: string) : void {
    this.listaDeItems.push(item);
    this.limpiarValor();
  }

  limpiarValor(): void {
    this.item = '';
  }
}
