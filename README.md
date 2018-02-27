# NgPortfolio
An Angular portfolio designed for lazy developers all over the worls. With little configuration and maintanince let this application automatically update itself without you having to lift a finger!

## Configuration
We'll keep our first step simple and just run a `npm install` command. You will also want to have the `@angular/cli` and `firebase-tools` installed as global dependencies on your machine. Just run the command `npm i -g @angular/cli firebase-tools` and be sure to sign into your Google account for the `firebase-tools` with the command `firebase login`. 

### Firebase
This application takes advantage of Firebase for the use of it's [Realtime Database](https://firebase.google.com/products/realtime-database/), [Cloud Functions](https://firebase.google.com/products/functions/), [Cloud Storage](https://firebase.google.com/products/storage/), and [Hosting](https://firebase.google.com/products/hosting). In the [Firebase console](https://console.firebase.google.com/) create a new application, and ensure that these features are enabled. Typically they would be enabled from the get-go, but you may want to check just in case.

Update the `.firebaserc` file in the root directory so that `projects.default` is assigned to your Project ID. The easiest way to do this is just to delete the file and run the command `firbase init` to assign it to your project.

Next update the `firebase` sub-object of your `environment` object in both `src/environments/environment.ts` and `src/environments/environment.prod.ts` with your Firebase config details (click 'Add Firebase to your web app' in your application overview).

Finally, and this is very important, in your Project Settings on the Firebase dashboard, go to the "Service Accounts" tab and "Generate New Private Key." Rename that JSON to `serviceAccountKey.json` and place it in the `/functions` folder.

### LinkedIn
LinkedIn makes it ridiculously difficult to get your profile information, but we don't want to manually have to input all your professional information. To keep things easy all you need to do is visit your LinkedIn profile and save the webpage (in Chrome you'll want to set the Format to 'Webpage Complete') as `linkedin.html`. In the your Firebase application overview just visit the Storage section (found in the left side menu), and upload your `linkedin.html` into the root of your bucket.

### YouTube Talks
If you've given talks or have YouTube videos you'd like to showcase update the `youtube` field of the `environment` object in both `src/environments/environment.ts` and `src/environments/environment.prod.ts` to be the string value of a YouTube playlist id.

You will also need to enable the YouTube Data API v3 for your Firebase application, which [you can do easily here](https://console.developers.google.com/apis/library/youtube.googleapis.com/).

### Others... (GitHub, Medium, etc...)
The portfolio site will also consume and display information from a few other resources such as GitHub and Medium. Like with our YouTube playlist id, update the various remaining fields of the `environment` object in both `src/environments/environment.ts` and `src/environments/environment.prod.ts` with your username for GitHub, Medium, Twitter, your full name as well as your email address and phone number (if you'd like people have that information). Importantly do not include symbols such as @ in your usernames!

### Finally
With everything configured you can easily deploy the application in order to test it. You will have needed to go through the above steps however in order for the Firebase Cloud Functions API endpoints this application uses to work. Run the command `npm run firebase:deploy`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Please ensure you went through all the steps listed in [Configuration](#configuration) first though.
