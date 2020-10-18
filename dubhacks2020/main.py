from flask import Flask, jsonify
from firebase_admin import credentials, firestore, initialize_app

app = Flask(__name__, static_folder='./build', static_url_path='/')
cred = credentials.Certificate("firebasekey.json")
default_app = initialize_app(cred)
db = firestore.client()
survey_ref = db.collection('surveyID')

@app.route('/')
def get_html():
	return app.send_static_file('index.html')

@app.route('/api/test')
def test_get():
	try:
		survey = survey_ref.document("123").get()
		return jsonify(survey.to_dict()), 200
	except Exception as e:
		return f"An Error Occured: {e}"

if __name__ == '__main__':
	app.run()
