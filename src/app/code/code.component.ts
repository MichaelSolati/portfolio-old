import { Component, OnInit } from '@angular/core';
import { NgMetaService } from 'ngmeta';
import { Observable } from 'rxjs/Observable';

import { GitHubService, IRepository } from '../core/services';
import { environment } from '../../environments/environment';

@Component({
  selector: 'ngp-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {

  constructor(private _gs: GitHubService, private _meta: NgMetaService) { }

  ngOnInit() {
    this._meta.title = 'Code | ' + environment.name;
  }

  get repositories$(): Observable<IRepository[]> {
    return this._gs.repositories$;
  }

}
