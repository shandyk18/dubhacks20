# dubhacks20

To start the server locally:

```
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install flask python-dotenv
$ python main.py
```

Also make sure to create the file `firebasekey.json` that stores the private key for the Firebase service account.

To upload to GCloud, run the following on Node.js:
```
$ npm run build
```

Then run the following on normal command prompt:
```
$ gcloud app deploy
```
