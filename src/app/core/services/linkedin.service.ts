import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IProfile } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class LinkedInService {

  private _profile$: BehaviorSubject<IProfile> = new BehaviorSubject<IProfile>(null);

  constructor(private _http: HttpClient) {
    this._fetch();
  }

  get profile$(): Observable<IProfile> {
    return this._profile$.asObservable();
  }

  private _fetch(): void {
    this._http.get('https://' + environment.firebase.projectId + '.firebaseio.com/linkedin.json')
      .subscribe((value: any) => {
        if (!value || value.expires < new Date().getTime()) {
          this._http.get('https://us-central1-' + environment.firebase.projectId + '.cloudfunctions.net/linkedin')
            .subscribe((success: IProfile) => this._profile$.next(success), (error: any) => { });
        }
        if (value && value.results) { this._profile$.next(value.results); }
      }, (error: any) => { });
  }

}
