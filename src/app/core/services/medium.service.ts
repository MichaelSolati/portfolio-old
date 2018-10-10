import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IArticle } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MediumService {

  private _articles$: BehaviorSubject<IArticle[]> = new BehaviorSubject<IArticle[]>([]);

  constructor(private _http: HttpClient) {
    this._fetch();
  }

  get articles$(): Observable<IArticle[]> {
    return this._articles$.asObservable();
  }

  private _fetch(): void {
    this._http.get('https://rss2json.com/api.json?rss_url=https://medium.com/feed/@' + environment.medium)
      .subscribe((value: any) => {
        this._articles$.next(value.items
          .filter((post: any) => post.categories.length > 0)
          .map((post: any) => {
            return {
              title: post.title,
              description: this._stripHTML(post.description),
              url: post.guid,
              createdOn: new Date(post.pubDate).getTime(),
              src: this._stripImage(post.description)
            };
          })
          .slice(0, 12));
      }, (error: any) => { });
  }

  private _stripHTML(preview: string): string {
    return preview.replace(/<(?:.|\n)*?>/gm, '');
  }

  private _stripImage(preview: string): string {
    const imgTags: string[] = preview.match(/<img [^>]*src="[^"]*"[^>]*>/gm);
    if (imgTags && imgTags.length > 0) {
      return imgTags[0].replace(/.*src="([^"]*)".*/, '$1');
    }
  }

}
