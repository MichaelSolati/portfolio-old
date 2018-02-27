// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  email: null,
  firebase: {
    apiKey: null,
    authDomain: null,
    databaseURL: null,
    projectId: null,
    storageBucket: null,
    messagingSenderId: null
  },
  github: null,
  linkedin: null,
  medium: null,
  name: null,
  phone: null,
  twitter: null,
  youtube: null
};
