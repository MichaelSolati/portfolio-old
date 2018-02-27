import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgMetaModule } from 'ngmeta';

import { GUARDS } from './guards';
import { SERVICES } from './services';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgMetaModule.forRoot()
  ],
  providers: [
    ...SERVICES,
    ...GUARDS
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: CoreModule };
  }
}
