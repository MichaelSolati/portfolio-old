import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContainer } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';

import { environment } from '../environments/environment';

interface Page {
  title: string;
  path: string[];
}

@Component({
  selector: 'ngp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('container') container: MatSidenavContainer;
  @ViewChild('sidenav') sidenav: MatSidenav;
  private _pages: Page[] = [{ title: 'Home', path: ['/', 'home'] }];
  private _scrollArea: any;

  constructor(private _router: Router) {
    this._router.events.subscribe((evt: any) => {
      this._scrollToTop(evt);
    });
    if (environment.medium) { this._pages.push({ title: 'Articles', path: ['/', 'articles'] }); }
    if (environment.github) { this._pages.push({ title: 'Code', path: ['/', 'code'] }); }
    if (environment.youtube) { this._pages.push({ title: 'Talks', path: ['/', 'talks'] }); }
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 601) {
          this.sidenav.close();
        }
      });
    }
  }

  ngAfterViewInit() {
    this._scrollArea = this.container['_element'].nativeElement.lastChild;
  }

  get name(): string {
    return environment.name;
  }

  get pages(): Page[] {
    return this._pages;
  }

  public navClose(): any {
    if (window.innerWidth < 601) { this.sidenav.close(); }
  }

  public navOpen(): void {
    if (window.innerWidth < 601) { this.sidenav.open(); }
  }

  public navToggle(): void {
    if (window.innerWidth < 601) { this.sidenav.toggle(); }
  }

  private _scrollToTop(evt: any): void {
    if ((evt instanceof NavigationEnd) && !evt.url.includes('#') && this._scrollArea) {
      this._scrollArea.scrollTop = 0;
    }
  }
}
