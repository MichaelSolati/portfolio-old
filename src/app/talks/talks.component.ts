import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { NgMetaService } from 'ngmeta';
import { Observable } from 'rxjs/Observable';

import { YouTubeService, ITalk } from '../core/services';
import { environment } from '../../environments/environment';

@Component({
  selector: 'ngp-talks',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.scss']
})
export class TalksComponent implements OnInit {

  constructor(private _meta: NgMetaService, private _sanitizer: DomSanitizer, private _ys: YouTubeService) { }

  ngOnInit() {
    this._meta.title = 'Talks | ' + environment.name;
  }

  get talks$(): Observable<ITalk[]> {
    return this._ys.talks$;
  }

  public sanitizeImage(image: string): SafeStyle {
    return this._sanitizer.bypassSecurityTrustStyle('url(' + image + ')');
  }

}
