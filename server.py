from flask import Flask, request, jsonify
from datetime import datetime
from flask_cors import CORS, cross_origin
import joblib
from opinion import TwitterClient

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/search/', methods=['GET'])
@cross_origin()
def search():
    query = request.args.get('query') or 'Spiderman'
    count = request.args.get('count') or 1000

    classifier = joblib.load('svmClassifier.pkl')
    api = TwitterClient()

    tweets = api.get_tweets(classifier, query, count=count)
    ntweets = [tweet['text'] for tweet in tweets if tweet['sentiment'] == 0]
    ptweets = [tweet['text'] for tweet in tweets if tweet['sentiment'] == 1]
    neg = (100*len(ntweets)/len(tweets))
    pos = (100*len(ptweets)/len(tweets))
    now = datetime.now()
    print("Date and Time analysed: ", str(now))

    #
    # new_tweets = []
    # for tweet in tweets:
    #     obj = {}
    #     if(tweet['sentiment'] == 0):
    #         obj['tweet'] = tweet['text']
    #         obj['sentiment'] = tweet['sentiment']
    #     else:
    #         obj['tweet'] = tweet['text']
    #         obj['sentiment'] = tweet['sentiment']
    #     new_tweets.append(obj)
    #

    response = jsonify({"positive": pos, "negative": neg,
                        "ntweets": ntweets, "ptweets": ptweets})
    return response


if __name__ == '__main__':
    app.run(debug=True)
