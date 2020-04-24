import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { without, findIndex } from 'lodash'

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
  lastIndex: number;

  deleteArticle(article: object) {
    this.articles = without(this.articles, article);
    this.modifiedArticles = without(this.articles, article);
  }

  updateArticle(articleInfo){
    let articleIndex: number;
    let modifiedIndex: number;

    articleIndex = findIndex(this.articles, { artId: articleInfo.article.artId});
    modifiedIndex = findIndex(this.modifiedArticles, { artId: articleInfo.article.artId});
    this.articles[articleIndex][articleInfo.labelName] = articleInfo.newValue;
    this.modifiedArticles[modifiedIndex][articleInfo.labelName] = articleInfo.newValue;
  }

  addArticle(article: any) {
    article.artId = this.lastIndex;
    this.articles.unshift(article);
    this.modifiedArticles.unshift(article);
    this.lastIndex++;
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
    this.lastIndex = 0;
    this.http.get<Object[]>('../assets/data.json').subscribe(data => {
      this.articles = data.map((item:any) => {
        item.artId = this.lastIndex++;
        return item;
      });
      this.modifiedArticles = data;
      this.sortArticles();
    });

  }
}
