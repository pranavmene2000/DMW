import csv
import os
import sklearn.metrics
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import svm
import joblib
from sklearn.pipeline import Pipeline
from opinion import TwitterClient

#Generating the Training and testing vectors

def getTrainingAndTestData():
        X = []
        y = []

        #Training data 1: Sentiment 140
        f=open('./stanford140.csv','r', encoding='ISO-8859-1')
        reader = csv.reader(f)

        for row in reader:
            X.append(row[5])
            y.append(1 if (row[0]=='4') else 0)

        X_train, X_test, y_train, y_test = sklearn.model_selection.train_test_split(X,y,test_size=0.20, random_state=42)
        return X_train, X_test, y_train, y_test

#Process Tweets (Stemming+Pre-processing)

def processTweets(X_train, X_test):
        ap = TwitterClient()
        X_train = [ap.stem(ap.preprocessTweets(tweet)) for tweet in X_train]
        X_test = [ap.stem(ap.preprocessTweets(tweet)) for tweet in X_test]
        return X_train,X_test
        
# SVM classifier

def classifier(X_train,y_train):
        vec = TfidfVectorizer(min_df=5, max_df=0.95, sublinear_tf = True,use_idf = True,ngram_range=(1, 2))
        svm_clf =svm.LinearSVC(C=0.1)
        vec_clf = Pipeline([('vectorizer', vec), ('pac', svm_clf)])
        vec_clf.fit(X_train,y_train)
        joblib.dump(vec_clf, 'svmClassifier.pkl', compress=3)
        return vec_clf

# Main function

def main():
        print("In main")
        X_train, X_test, y_train, y_test = getTrainingAndTestData()
        print("After getting training and test data")
        X_train, X_test = processTweets(X_train, X_test)
        print("After processing")
        vec_clf = classifier(X_train,y_train)
        print("After classification")
        y_pred = vec_clf.predict(X_test)
        print("After prediction")
        print(sklearn.metrics.classification_report(y_test, y_pred))
        
if __name__ == "__main__":
    print("Training....")
    main()