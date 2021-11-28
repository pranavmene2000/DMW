import re
import nltk
import joblib
import tweepy
import datetime

import os
from dotenv import load_dotenv

load_dotenv()


class TwitterClient(object):

    def __init__(self):

        # Class constructor or initialization method.

        consumer_key = os.getenv('API_KEY')
        consumer_secret = os.getenv('API_SECRET_KEY')

        try:
            self.auth = tweepy.AppAuthHandler(consumer_key, consumer_secret)
            self.api = tweepy.API(self.auth)

        except:
            print("Error: Authentication Error")

    # Processing Tweets

    def preprocessTweets(self, tweet):

        # Convert www.* or https?://* to URL
        tweet = re.sub('((www\.[^\s]+)|(https?://[^\s]+))', 'URL', tweet)

        # Convert @username to __HANDLE
        tweet = re.sub('@[^\s]+', '__HANDLE', tweet)

        # Replace #word with word
        tweet = re.sub(r'#([^\s]+)', r'\1', tweet)

        # trim
        tweet = tweet.strip('\'"')

        # Repeating words like happyyyyyyyy
        rpt_regex = re.compile(r"(.)\1{1,}", re.IGNORECASE)
        tweet = rpt_regex.sub(r"\1\1", tweet)

        # Emoticons
        emoticons = \
            [
                ('__positive__', [':-)', ':)', '(:', '(-:', ':-D', ':D', 'X-D',
                                  'XD', 'xD', '<3', ':\*', ';-)', ';)', ';-D', ';D', '(;', '(-;', ]),
                ('__negative__', [':-(', ':(', '(:',
                                  '(-:', ':,(', ':\'(', ':"(', ':((', ]),
            ]

        def replace_parenth(arr):
            return [text.replace(')', '[)}\]]').replace('(', '[({\[]') for text in arr]

        def regex_join(arr):
            return '(' + '|'.join(arr) + ')'

        emoticons_regex = [(repl, re.compile(regex_join(replace_parenth(regx)))) for (
            repl, regx) in emoticons]

        for (repl, regx) in emoticons_regex:
            tweet = re.sub(regx, ' '+repl+' ', tweet)

         # Convert to lower case
        tweet = tweet.lower()

        return tweet

    # Stemming of Tweets

    def stem(self, tweet):
        stemmer = nltk.stem.PorterStemmer()
        tweet_stem = ''
        words = [word if(word[0:2] == '__') else word.lower()
                 for word in tweet.split()
                 if len(word) >= 3]
        words = [stemmer.stem(w) for w in words]
        tweet_stem = ' '.join(words)
        return tweet_stem

    # Predict the sentiment

    def predict(self, tweet, classifier):

        # Utility function to classify sentiment of passed tweet

        tweet_processed = self.stem(self.preprocessTweets(tweet))

        if (('__positive__') in (tweet_processed)):
            sentiment = 1
            return sentiment

        elif (('__negative__') in (tweet_processed)):
            sentiment = 0
            return sentiment
        else:
            X = [tweet_processed]
            sentiment = classifier.predict(X)
            return (sentiment[0])

    def get_tweets(self, classifier, query, count=1000):
        '''
        Main function to fetch tweets and parse them.
        '''
        # empty list to store parsed tweets
        tweets = []

        try:
            # call twitter api to fetch tweets
            # fetched_tweets = self.api.search_30_day(label='development',query=query)
            fetched_tweets = self.api.search_tweets(query, count=count)
            # parsing tweets one by one
            for tweet in fetched_tweets:
                # empty dictionary to store required params of a tweet
                parsed_tweet = {}

                # saving text of tweet
                parsed_tweet['text'] = tweet.text
                # saving sentiment of tweet
                parsed_tweet['sentiment'] = self.predict(
                    tweet.text, classifier)
                # appending parsed tweet to tweets list
                if tweet.retweet_count > 0:
                    # if tweet has retweets, ensure that it is appended only once
                    if parsed_tweet not in tweets:
                        tweets.append(parsed_tweet)
                else:
                    tweets.append(parsed_tweet)

            # return parsed tweets
            return tweets

        except tweepy.errors.TweepyException as e:
            print("Error : " + str(e))


# Main function

def main():
    print('Loading the Classifier, please wait....')
    classifier = joblib.load('svmClassifier.pkl')
    # creating object of TwitterClient Class
    api = TwitterClient()
    # calling function to get tweets
    q = 0
    while (q == 0):
        query = input("Enter the Topic for Opinion Mining: ")
        tweets = api.get_tweets(classifier, query, count=1000)
        ntweets = [tweet for tweet in tweets if tweet['sentiment'] == 0]
        ptweets = [tweet for tweet in tweets if tweet['sentiment'] == 1]
        neg = (100*len(ntweets)/len(tweets))
        pos = (100*len(ptweets)/len(tweets))

        # console output of sentiment
        print("Opinion Mining on ", query)

        # percentage of negative tweets
        print("Negative tweets percentage: ", neg)
        # percentage of positive tweets
        print("Positive tweets percentage: ", pos)

        now = datetime.datetime.now()
        print("Date and Time analysed: ", str(now))

        q = int(input("Do you want to exit[Press 1 for Yes/ 0 for No]? "))

        if(q == 0):
            break


if __name__ == "__main__":
    main()
