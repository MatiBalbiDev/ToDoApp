import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  getItem(key: string): Item[] | null {
    const item = sessionStorage.getItem(key);
    if (item) {
      return JSON.parse(item) as Item[];
    }
    return [];
  }

  setItem(key: string, value: Item[]): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}
