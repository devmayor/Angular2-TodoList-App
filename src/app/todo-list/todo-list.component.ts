import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ListItem } from '../classes/ListItem';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  @Input() listData: ListItem[];
  @Output() upChangeStatus = new EventEmitter<Object>();
  @Output() deleteItemApp = new EventEmitter<ListItem>();
  
  currentSort: 'date' | 'alpha' | 'status' = 'date';
  private cachedList: ListItem[] = [];
  private lastSortType: string = '';

  constructor() { }

  ngOnInit() {
  }

  get sortedList(): ListItem[] {
    // Cache invalidation check
    if (!this.listData) {
      return [];
    }
    
    const cacheKey = `${this.currentSort}-${this.listData.length}`;
    if (this.lastSortType === cacheKey) {
      return this.cachedList;
    }

    // Update cache
    this.cachedList = ListItem.sortItems(this.listData, this.currentSort);
    this.lastSortType = cacheKey;
    return this.cachedList;
  }

  changeSortType(type: 'date' | 'alpha' | 'status'): void {
    if (this.currentSort !== type) {
      this.currentSort = type;
    }
  }

  statusChange(data: any): void {
    this.upChangeStatus.emit(data);
  }

  deleteItem(data: ListItem): void {
    this.deleteItemApp.emit(data);
  }
}
