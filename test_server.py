from flask import Flask,request
import json
from server import app

def test_search():
    response = app.test_client().get('/search/')
    count = 0
    with app.test_request_context('/?query=Spiderman&count=10'):
        assert request.args['query'] != ''
        assert int(request.args['count']) >= 1
        count = int(request.args['count'])
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert isinstance(data['negative'], float)
    assert data['negative'] >= 0 and data['negative']<=100 
    assert isinstance(data['positive'], float)
    assert data['positive'] >= 0 and data['positive']<=100
    assert data['positive'] + data['negative'] == 100
    assert isinstance(data['ntweets'], list)
    assert len(data['ntweets']) > 0
    assert isinstance(data['ptweets'], list)
    assert len(data['ptweets']) > 0