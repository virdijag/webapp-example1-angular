import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'News Articles';
  articles: object[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Object[]>('../assets/data.json').subscribe(data => {
    this.articles = data;
    });

  }
}
