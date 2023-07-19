import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { SessionStorageService } from 'src/app/services/local-storage.service';

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

  @Input()
  total: Item[] = [];

  @Input()
  realizadas: Item[] = [];

  modoEdicion: boolean = false;

  storageKey: string = 'listaDeItems';

  constructor(private sessionStorageService: SessionStorageService) {}

  ngOnInit(): void {
    const storedItems = this.sessionStorageService.getItem(this.storageKey);
    this.listaDeItems = storedItems || [];
    const totalGuardado = this.sessionStorageService.getItem('total');
    this.total = totalGuardado || [];
    const realizadasGuardado = this.sessionStorageService.getItem('realizadas');
    this.realizadas = realizadasGuardado || [];
  }

  quitarItem(id: number): void {
    this.listaDeItems = this.listaDeItems.filter((item) => item.id !== id);
    this.listaDeItemsModificada.emit(this.listaDeItems);
    if (this.realizadas.length) {
      this.realizadas = this.realizadas.filter((item) => item.id !== id);
    }
    this.total = this.listaDeItems;
    this.sessionStorageService.setItem(this.storageKey, this.listaDeItems);
    this.sessionStorageService.setItem('total', this.total);
    this.sessionStorageService.setItem('realizadas', this.realizadas);
  }

  editarItem(item: Item): void {
    if (item != null && item.description.trim().length) {
      this.modoEdicion = true;
      this.itemSeleccionado = item;
      this.sessionStorageService.setItem(this.storageKey, this.listaDeItems);
      this.sessionStorageService.setItem('total', this.total);
      this.sessionStorageService.setItem('realizadas', this.realizadas);
    } else {
      this.modoEdicion = false;
      return;
    }
  }

  guardarCambiosItem(): void {
    if (
      this.itemSeleccionado &&
      this.itemSeleccionado.description.trim().length
    ) {
      this.itemSeleccionado = null;
      this.modoEdicion = false;
      this.sessionStorageService.setItem(this.storageKey, this.listaDeItems);
      this.sessionStorageService.setItem('total', this.total);
      this.sessionStorageService.setItem('realizadas', this.realizadas);
    }
  }

  cancelarEditar(): void {
    this.modoEdicion = false;
    this.itemSeleccionado = null;
    this.listaDeItems =
      this.sessionStorageService.getItem(this.storageKey) || [];
    return;
  }

  marcarRealizado(item: Item): void {
    const realizadasGuardados =
      this.sessionStorageService.getItem('realizadas') || [];
    const contieneItem = realizadasGuardados.some((elemento) => {
      // Aquí puedes cambiar la lógica de comparación según tus necesidades
      return JSON.stringify(elemento) === JSON.stringify(item);
    });
    if (realizadasGuardados.length > 0 && contieneItem) {
      item.checked = !item.checked;
      this.realizadas = this.realizadas.filter((elem) =>
        elem.id == item.id ? (elem.checked = item.checked) : elem
      );
    } else {
      item.checked = !item.checked;
      if (item.checked) {
        this.realizadas.push(item);
      } else {
        this.realizadas = this.realizadas.filter(
          (itemcito) => itemcito.checked
        );
      }
    }

    this.sessionStorageService.setItem(this.storageKey, this.listaDeItems);
    this.sessionStorageService.setItem('total', this.total);
    this.sessionStorageService.setItem('realizadas', this.realizadas);
  }
}
