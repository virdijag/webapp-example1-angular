import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent {
  faTimes = faTimes;
  @Input() articleList;
  @Output() deleteEvt = new EventEmitter(); // broadcasts event to parent
  
  handleDelete(article:object)
  {
    this.deleteEvt.emit(article);
  }
}
