from flask import Flask, jsonify, request
from firebase_admin import credentials, firestore, initialize_app
import json
import uuid
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='./build', static_url_path='/')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

cred = credentials.Certificate("firebasekey.json")
default_app = initialize_app(cred)
db = firestore.client()
survey_ref = db.collection('surveyID')

@app.route('/')
@cross_origin()
def get_html():
	return app.send_static_file('index.html')

@app.route('/getAnswer1/<surveyId>')
@cross_origin()
def getOne(surveyId):
	result = {
		"yes": 0,
		"no": 0
	}
	print("1")
	print(request)
	print("2")
	if request.json == None or request.json["filter"] == None:
		docs = survey_ref.document(surveyId).collection('responses').stream()
		for doc in docs:
			res = doc.to_dict()
			if (res["q1"] == 1):
				result["yes"] += 1
			else:
				result["no"] += 1
		return jsonify(result), 200
	else:
		filter = survey_ref.where(request.json['filter'], '==', request.json['value'])
		for surveyDoc in filter.stream():
			res = surveyDoc.id
			for doc in survey_ref.document(res).collection('responses').stream():
				d = doc.to_dict()
				if (d["q1"] == 1):
					result["yes"] += 1
				else:
					result["no"] += 1
	return jsonify(result), 200
	# survey = survey_ref.document('123').collection('responses').document('n8xs9YiTtLxou9pdC3Li').get()
	# return jsonify(survey.to_dict()), 200

@app.route('/getAnswer2/<surveyId>')
@cross_origin()
def getTwo(surveyId):
	result = {
		"0" : 0,
		"1" : 0,
		"2" : 0,
		"3" : 0,
		"4" : 0,
		"5" : 0
	}

	if request.json == None or request.json["filter"] == None:
		docs = survey_ref.document(surveyId).collection('responses').stream()
		for doc in docs:
			res = doc.to_dict()
			if (res["q2"] == "0"):
				result["0"] += 1
			elif (res["q2"] == "1"):
				result["1"] += 1
			elif (res["q2"] == "2"):
				result["2"] += 1
			elif (res["q2"] == "3"):
				result["3"] += 1
			elif (res["q2"] == "4"):
				result["4"] += 1
			else:
				result["5"] += 1
		return jsonify(result), 200
	else:
		filter = survey_ref.where(request.json['filter'], '==', request.json['value'])
		for surveyDoc in filter.stream():
			res = surveyDoc.id
			for doc in survey_ref.document(res).collection('responses').stream():
				d = doc.to_dict()
				if (d["q2"] == "0"):
					result["0"] += 1
				elif (d["q2"] == "1"):
					result["1"] += 1
				elif (d["q2"] == "2"):
					result["2"] += 1
				elif (d["q2"] == "3"):
					result["3"] += 1
				elif (d["q2"] == "4"):
					result["4"] += 1
				else:
					result["5"] += 1
		
	return jsonify(result), 200

@app.route('/comments/<surveyId>')
@cross_origin()
def get_comments(surveyId):
	result = {}
	index = 0
	if request.json == None or request.json["filter"] == None:
		docs = survey_ref.document(surveyId).collection('responses').stream()
		for doc in docs:
			actual_document = doc.to_dict()
			result[index] = actual_document['comments']
			index += 1
		return jsonify(result), 200
	else:
		filter = survey_ref.where(request.json['filter'], '==', request.json['value'])
		for surveyDoc in filter.stream():
			res = surveyDoc.id
			for doc in survey_ref.document(res).collection('responses').stream():
				actual_document = doc.to_dict()
				result[index] = actual_document['comments']
				index += 1
	return jsonify(result), 200


@app.route('/test')
@cross_origin()
def test_get(): 
	try:
		survey = survey_ref.document("123").get()
		return jsonify(survey.to_dict()), 200
	except Exception as e:
		return f"An Error Occured: {e}"

@app.route('/add-response', methods=["POST"])
@cross_origin()
def add_response():
	try:
		surveyId = request.json["surveyId"]
		q1 = request.json["q1"]
		q2 = request.json["q2"]
		comments = request.json["comments"]

		if (q1 == None or q2 == None or surveyId == None):
			return {"error": "one or more attributes missing"}

		response = {
			"q1": q1,
			"q2": q2,
			"comments": comments,
		}
		did = str(uuid.uuid4())
		response_ref = survey_ref.document(surveyId).collection('responses').document(did).set(response)
		return jsonify({"success": True}), 200
	except Exception as e:
		return f"An Error Occured: {e}"

@app.route('/surveyId/<surveyId>', methods=["GET"])
@cross_origin()
def does_survey_id_exist(surveyId):
	try:
		survey = survey_ref.document(surveyId).get()
		return json.dumps(survey.exists)
	except Exception as e:
		return f"An Error Occured: {e}"

if __name__ == '__main__':
	app.run()
