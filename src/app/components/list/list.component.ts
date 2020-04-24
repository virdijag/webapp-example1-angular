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
  @Output() updateEvt = new EventEmitter();

  handleDelete(article:object)  {
    this.deleteEvt.emit(article);
  }

  handleUpdate(article:object, labelName: string, newValue: string){
    this.updateEvt.emit({
      article: article,
      labelName: labelName,
      newValue: newValue
    });
  }
}
