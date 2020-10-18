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

@app.route('/getAnswer1')
def getOne():
	surveyID = request.json["surveyID"]
	result = {
		"yes": 0,
		"no": 0
	}



	for survey in survey_ref:
		docs = survey_ref.document(surveyID).collection('responses').stream()
		for doc in docs:
			res = doc.to_dict()
			if (res["q1"]):
				result["yes"] += 1
			else:
				result["no"] += 1
	return jsonify(result), 200
	# survey = survey_ref.document('123').collection('responses').document('n8xs9YiTtLxou9pdC3Li').get()
	# return jsonify(survey.to_dict()), 200

@app.route('/getAnswer2')
def getTwo():
	result = {
		"1" : 0,
		"2" : 0,
		"3" : 0,
		"4" : 0,
		"5" : 0
	}

	docs = survey_ref.document('123').collection('responses').stream()
	
	for doc in docs:
		res = doc.to_dict()
		
	return jsonify(result), 200

@app.route('/comments')
def get_comments():
	result = {}
	index = 0
	docs = survey_ref.document('123').collection('responses').stream()
	for doc in docs:
		actual_document = doc.to_dict()
		result[index] = actual_document['comments']
		index += 1
	return jsonify(result), 200


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
		id = survey_ref.document(surveyID).collection('reponses').document().getId()
		response_ref = survey_ref.document(surveyID).collection('reponses').document(id).set(response)
		return jsonify({"success": True}), 200
	except Exception as e:
		return f"An Error Occured: {e}"

if __name__ == '__main__':
	app.run()
