import { Component, OnInit , Input , Output , EventEmitter} from '@angular/core';

import { ListItem } from '../classes/ListItem';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() listData;
  @Output() upChangeStatus = new EventEmitter<Object>();
  @Output() deleteItemApp = new EventEmitter<ListItem>();
  
  currentSort: 'date' | 'alpha' | 'status' = 'date';

  constructor() { }

  ngOnInit() {
  }

  // Get sorted list using our inefficient sorting method
  get sortedList() {
    if (!this.listData) return [];
    return ListItem.sortItems(this.listData, this.currentSort);
  }

  // Change sort type
  changeSortType(type: 'date' | 'alpha' | 'status') {
    this.currentSort = type;
    // The bug in status sorting will show up when this is called!
  }

  statusChange(data){
    this.upChangeStatus.emit(data);
  }

  deleteItem(data){
    this.deleteItemApp.emit(data);
  }
}
