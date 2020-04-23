import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {

  showForm: boolean;
  @Output() addEvt = new EventEmitter();
  faPlus = faPlus;

  toggleArticleDisplay()  {
    this.showForm = !this.showForm;
  }

  handleAdd(formInfo: any){
    const tempItem: object = {
      articleName: formInfo.articleName,
      author: formInfo.author,
      creationDate: formInfo.creationDate + ' ' + formInfo.creationTime,
      summary: formInfo.summary,
    };
    this.addEvt.emit(tempItem);
    this.showForm = !this.showForm;
  }

  constructor() { 
    this.showForm = true;
  }

  ngOnInit(): void {
  }

}
