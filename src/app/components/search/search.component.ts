import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
 query:string;
  @Output() queryEvt = new EventEmitter<string>();

  handleQuery(){
    this.queryEvt.emit(this.query);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
