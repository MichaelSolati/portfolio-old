import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { IRepository } from '../interfaces';

@Injectable()
export class GitHubService {

  private _repositories$: BehaviorSubject<IRepository[]> = new BehaviorSubject<IRepository[]>([]);

  constructor(private _http: HttpClient) {
    this._fetch();
  }

  get repositories$(): Observable<IRepository[]> {
    return this._repositories$.asObservable();
  }

  private _fetch(): void {
    this._http.get('https://' + environment.firebase.projectId + '.firebaseio.com/github.json')
      .subscribe((value: any) => {
        if (!value || value.expires < new Date().getTime()) {
          this._http.get('https://us-central1-' + environment.firebase.projectId + '.cloudfunctions.net/github')
            .subscribe((success: IRepository[]) => this._repositories$.next(success), (error: any) => { });
        }
        if (value && value.results && Array.isArray(value.results)) { this._repositories$.next(value.results); }
      }, (error: any) => { });
  }

}
