import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as httpRequest from 'request';
const cors = require('cors')({
  origin: true
});
// @ts-ignore
import { environment } from './environment';

export const github = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    admin.database().ref('github').once('value', (snapshot: admin.database.DataSnapshot) => {
      if (snapshot.exists() && snapshot.val().expires > new Date().getTime()) {
        return res.status(400).send('Functions only update data that\'s older than 24 hours.');
      } else {
        const tomorrow: number = new Date().getTime() + 86400000;
        if (environment.github === undefined) {
          return res.status(400).send('No GitHub username defined!');
        } else {
          httpRequest({
            method: 'GET',
            url: 'https://api.github.com/users/' + environment.github + '/repos',
            qs: {
              sort: 'updated'
            },
            headers: { 'User-Agent': 'request' }
          }, (error: any, response: Response, body: string) => {
            if (error) {
              return res.status(error.code).send(error.message);
            }
            try {
              let parsed = JSON.parse(body);
              if (parsed.error) {
                return res.status(parsed.error.code).send(parsed.error.message);
              }
              parsed = parsed.map((rep: any) => {
                return {
                  title: rep.name,
                  description: rep.description,
                  url: rep.html_url,
                  createdOn: new Date(rep.pushed_at).getTime()
                };
              })
                .sort((a, b) => b.createdOn - a.createdOn)
                .slice(0, 12)
              const result = {
                results: parsed,
                expires: tomorrow
              };
              admin.database().ref('github').set(result).then(() => res.send(JSON.stringify(result.results)));
            } catch (error) {
              return res.status(error.code).send(error.message);
            }
          });
        }
      }
    });
  });
});