import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { NgMetaService } from 'ngmeta';
import { Observable } from 'rxjs';

import { MediumService, IArticle } from '../core/services';
import { environment } from '../../environments/environment';

@Component({
  selector: 'ngp-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor(private _meta: NgMetaService, private _ms: MediumService, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this._meta.title = 'Articles | ' + environment.name;
  }

  get articles$(): Observable<IArticle[]> {
    return this._ms.articles$;
  }

  public sanitizeImage(image: string): SafeStyle {
    return this._sanitizer.bypassSecurityTrustStyle('url(' + image + ')');
  }

}
