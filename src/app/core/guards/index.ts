import { ArticlesGuard } from './articles.guard';
export * from './articles.guard';
import { CodeGuard } from './code.guard';
export * from './code.guard';
import { TalksGuard } from './talks.guard';
export * from './talks.guard';

export const GUARDS: any[] = [
  ArticlesGuard,
  CodeGuard,
  TalksGuard
];
