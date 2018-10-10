import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { NgMetaService } from 'ngmeta';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { LinkedInService, IProfile } from '../core/services';
import { environment } from '../../environments/environment';

interface ISocial {
  alt: string;
  src: string;
  url: string;
}

@Component({
  selector: 'ngp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _email: string;
  private _phone: string;
  private _socials: ISocial[] = [];

  constructor(private _ls: LinkedInService, private _meta: NgMetaService, private _sanitizer: DomSanitizer) {
    if (environment.github) {
      this._socials.push(
        { alt: 'GitHub Logo', src: 'assets/social/github.png', url: 'https://github.com/' + environment.github }
      );
    }
    if (environment.linkedin) {
      this._socials.push(
        { alt: 'LinkedIn Logo', src: 'assets/social/linkedin.png', url: 'https://www.linkedin.com/in/' + environment.linkedin }
      );
    }
    if (environment.medium) {
      this._socials.push(
        { alt: 'Medium Logo', src: 'assets/social/medium.png', url: 'https://medium.com/@' + environment.medium }
      );
    }
    if (environment.twitter) {
      this._socials.push(
        { alt: 'Twitter Logo', src: 'assets/social/twitter.png', url: 'https://twitter.com/' + environment.twitter }
      );
    }
    if (environment.email) { this._email = environment.email; }
    if (environment.phone) { this._phone = environment.phone; }
  }

  ngOnInit() {
    this._meta.title = 'Home | ' + environment.name;
    this.profile$.pipe(first(profile => !!profile)).subscribe((profile: IProfile) => {
      this._meta.setHead({
        meta: [
          { attribute: 'name', type: 'description', content: profile.summary },
          { attribute: 'name', type: 'author', content: profile.name }
        ]
      });
    });
  }

  get email(): string {
    return this._email;
  }

  get phone(): string {
    return this._phone;
  }

  get profile$(): Observable<IProfile> {
    return this._ls.profile$;
  }

  get socials(): ISocial[] {
    return this._socials;
  }

  public goToURL(url: string): void {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  }

  public sanitizeImage(image: string): SafeStyle {
    return this._sanitizer.bypassSecurityTrustStyle('url(' + image + ')');
  }

}
