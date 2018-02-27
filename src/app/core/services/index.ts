import { GitHubService } from './github.service';
export * from './github.service';
import { LinkedInService } from './linkedin.service';
export * from './linkedin.service';
import { MediumService } from './medium.service';
export * from './medium.service';
import { YouTubeService } from './youtube.service';
export * from './youtube.service';

export * from '../interfaces';

export const SERVICES: any[] = [
  GitHubService,
  LinkedInService,
  MediumService,
  YouTubeService
];
