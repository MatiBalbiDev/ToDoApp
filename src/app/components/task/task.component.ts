import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  @Input()
  listaDeItems: string[] = [];
  
  ngOnInit(): void {
    console.log(this.listaDeItems);
  }
}
