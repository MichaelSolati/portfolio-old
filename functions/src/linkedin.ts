import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as inScrape from 'in-scrape';
import * as httpRequest from 'request';
const cors = require('cors')({
  origin: true
});

export const linkedin = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    admin.database().ref('linkedin').once('value', (snapshot: admin.database.DataSnapshot) => {
      if (snapshot.exists() && snapshot.val().expires > new Date().getTime()) {
        return res.status(400).send('Functions only update data that\'s older than 24 hours.');
      } else {
        const tomorrow: number = new Date().getTime() + 86400000;
        admin.storage().bucket().file('linkedin.html', {})
          .getSignedUrl({ action: 'read', expires: tomorrow })
          .then((url: string[]) => {
            if (url.length !== 1) return res.status(400).send('No profile found');
            httpRequest({ method: 'GET', url: url[0] }, (error: any, response: Response, body: string) => {
              if (error) { return res.status(error.code).send(error.message); }
              inScrape.getProfile(body)
                .then((profile) => {
                  const regex: RegExp = RegExp('<img.*?alt="' + profile.name + '".*?src=".\/linkedin_files\/(.*?)"', 'g');
                  const images: string[] = regex.exec(body);
                  if (Array.isArray(images) && images.length > 0) { profile.photo = 'https://media.licdn.com/mpr/mpr/' + images[1]; }
                  if (profile.experience && Array.isArray(profile.experience)) { profile.experience = orderExperience(profile.experience); }
                  const result = {
                    results: profile,
                    expires: tomorrow
                  };
                  admin.database().ref('linkedin').set(result).then(() => res.send(JSON.stringify(result.results)));
                }).catch(err => res.status(400).send(err));
            });
          })
          .catch(error => res.status(400).send(error));
      }
    });
  });
});

function orderExperience(list: any[]): any[] {
  const present: any[] = [];
  const past: any[] = [];

  list.forEach(element => {
    if (element.employment === 'past') {
      element.temp = new Date(element.dateRange.replace(/\s\((.*?)\)/g, '').split(' – ')[1]);
      past.push(element);
    } else if (element.employment === 'current') {
      element.temp = new Date(element.dateRange.split(' – ')[1]);
      present.push(element);
    }
  });

  present.sort((a, b) => b.temp - a.temp);
  past.sort((a, b) => b.temp - a.temp);

  return [...present, ...past];
}