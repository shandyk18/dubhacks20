from flask import Flask, jsonify, request
from firebase_admin import credentials, firestore, initialize_app

app = Flask(__name__, static_folder='./build', static_url_path='/')
cred = credentials.Certificate("firebasekey.json")
default_app = initialize_app(cred)
db = firestore.client()
survey_ref = db.collection('surveyID')

@app.route('/')
def get_html():
	return app.send_static_file('index.html')

@app.route('/test')
def test_get(): 
	try:
		survey = survey_ref.document("123").get()
		return jsonify(survey.to_dict()), 200
	except Exception as e:
		return f"An Error Occured: {e}"

@app.route('/add-response', methods=["POST"])
def add_response():
	data = request.data
	print(data)
	return "WOW!"

# @app.route('/')

if __name__ == '__main__':
	app.run()
