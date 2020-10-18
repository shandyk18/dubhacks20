from flask import Flask, jsonify, request
from firebase_admin import credentials, firestore, initialize_app
import json

app = Flask(__name__, static_folder='./build', static_url_path='/')
cred = credentials.Certificate("firebasekey.json")
default_app = initialize_app(cred)
db = firestore.client()
survey_ref = db.collection('surveyID')

@app.route('/')
def get_html():
	return app.send_static_file('index.html')

#@app.route('/getAnswer1')
#def getOne():

@app.route('/test')
def test_get(): 
	try:
		survey = survey_ref.document("123").get()
		return jsonify(survey.to_dict()), 200
	except Exception as e:
		return f"An Error Occured: {e}"

@app.route('/add-response', methods=["POST"])
def add_response():
	try:
		surveyID = request.json["surveyID"]
		q1 = request.json["q1"]
		q2 = request.json["q2"]
		comment = request.json["comment"]

		if (not q1 or not q2 or not surveyID):
			return {"error": "one or more attributes missing"}

		response = {
			"q1": q1,
			"q2": q2,
			"comment": comment,
		}
		response_ref = survey_ref.document(surveyID).collection('reponses').document('18').set(response)
		return jsonify({"success": True}), 200
	except Exception as e:
		return f"An Error Occured: {e}"

if __name__ == '__main__':
	app.run()
