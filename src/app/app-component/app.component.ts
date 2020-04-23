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
  modifiedArticles: object[];
  orderBy: string;
  orderType: string;

  deleteArticle(article: object) {
    this.articles = without(this.articles, article);
    this.modifiedArticles = without(this.articles, article);
  }

  addArticle(article: object) {
    this.articles.unshift(article);
    this.modifiedArticles.unshift(article);
  }

  searchArticle(queryText: string) {
    this.modifiedArticles = this.articles.filter(eachItem => {

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

    this.sortArticles();
  }

  orderArticle(orderObj)  {
    this.orderBy = orderObj.orderBy;
    this.orderType = orderObj.orderType;
    this.sortArticles();
  }

  sortArticles(){
    let order: number;
      if(this.orderType === 'asc')
      {
        order = 1;
      } else{
        order = -1;
      }

    this.modifiedArticles.sort((a, b) => {
      
      if(a[this.orderBy].toLowerCase() < b[this.orderBy].toLowerCase()){
        return -1 * order;
      }
      if(a[this.orderBy].toLowerCase() > b[this.orderBy].toLowerCase()){
        return 1 * order;
      }
    });
  }

  constructor(private http: HttpClient) {
    this.orderBy = 'articleName';
    this.orderType = 'asc';
   }

  ngOnInit(): void {
    this.http.get<Object[]>('../assets/data.json').subscribe(data => {
      this.articles = data;
      this.modifiedArticles = data;
      this.sortArticles();
    });

  }
}
