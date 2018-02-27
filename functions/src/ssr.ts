/* tslint:disable */
import 'zone.js/dist/zone-node';
/* tslint:enable */
import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as fs from 'fs';

enableProdMode();
const document: string = fs.readFileSync(__dirname + '/app/index.html', 'utf8').toString();
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./app/main.bundle');

const app = express();
app.get('**', (req, res) => {
  const url: string = req.path;
  renderModuleFactory(AppServerModuleNgFactory, { document, url, extraProviders: [provideModuleMap(LAZY_MODULE_MAP)] })
    .then((html: string) => {
      res.set('Cache-Control', 'public, max-age=3600, s-maxage=43200');
      res.send(html);
    });
});

export const ssr = functions.https.onRequest(app);