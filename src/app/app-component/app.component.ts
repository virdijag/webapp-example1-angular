import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { without } from 'lodash'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'News Articles';
  articles: object[];

  deleteArticle(article: object) {
    this.articles = without(this.articles, article);
  }

  addArticle(article: object) {
    this.articles.unshift(article);
  }

  searchArticle(queryText: string) {
    this.articles = this.articles.filter(eachItem => {

      return (
        eachItem['articleName']
        .toLowerCase()
        .includes(queryText.toLowerCase()) ||
        eachItem['author']
        .toLowerCase()
        .includes(queryText.toLowerCase()) ||
        eachItem['summary']
        .toLowerCase()
        .includes(queryText.toLowerCase())

      );
    });
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Object[]>('../assets/data.json').subscribe(data => {
      this.articles = data;
    });

  }
}
