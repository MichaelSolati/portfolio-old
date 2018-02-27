import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatChipsModule, MatCardModule, MatIconModule,
  MatListModule, MatSidenavModule, MatTabsModule, MatToolbarModule
} from '@angular/material';

import { PIPES } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatChipsModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule
  ],
  declarations: [
    ...PIPES
  ],
  exports: [
    MatButtonModule,
    MatChipsModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    ...PIPES
  ]
})
export class SharedModule { }
