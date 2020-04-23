import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {

  showForm: boolean;
  faPlus = faPlus;

  toggleArticleDisplay()  {
    this.showForm = !this.showForm;
  }

  constructor() { 
    this.showForm = true;
  }

  ngOnInit(): void {
  }

}
