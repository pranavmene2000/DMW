from flask import Flask,render_template,request,jsonify,make_response
from datetime import datetime
from flask_cors import CORS, cross_origin
import os
import joblib
from opinion import TwitterClient

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/search/',methods=['GET'])
@cross_origin()
def search():
    query = request.args.get('query') or 'Spiderman'
    count = request.args.get('count') or 1000

    classifier = joblib.load('svmClassifier.pkl')
    api = TwitterClient()

    tweets = api.get_tweets(classifier, query, count = count)
    ntweets = [tweet['text'] for tweet in tweets if tweet['sentiment'] == 0]
    ptweets = [tweet['text'] for tweet in tweets if tweet['sentiment'] == 1]
    neg=(100*len(ntweets)/len(tweets))
    pos=(100*len(ptweets)/len(tweets))
    now = datetime.now()
    print ("Date and Time analysed: ",str(now))

    response = jsonify({"positive":pos,"negative":neg,"ntweets":ntweets,"ptweets":ptweets})
    return response
    
if __name__ =='__main__':
    app.run(debug=True)