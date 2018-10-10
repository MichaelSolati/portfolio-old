import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ITalk } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class YouTubeService {

  private _talks$: BehaviorSubject<ITalk[]> = new BehaviorSubject<ITalk[]>([]);

  constructor(private _http: HttpClient) {
    this._fetch();
  }

  get talks$(): Observable<ITalk[]> {
    return this._talks$.asObservable();
  }

  private _fetch(): void {
    this._http.get(
      'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=12&playlistId=' +
      environment.youtube + '&key=' + environment.firebase.apiKey
    ).subscribe((value: any) => {
      this._talks$.next(value.items.map((video: any) => {
        return {
          title: video.snippet.title,
          description: video.snippet.description,
          url: 'https://youtu.be/' + video.contentDetails.videoId,
          createdOn: new Date(video.contentDetails.videoPublishedAt).getTime(),
          src: (video.snippet.thumbnails.standard) ? video.snippet.thumbnails.standard.url : video.snippet.thumbnails.high.url
        };
      }));
    }, (error: any) => { });
  }

}
