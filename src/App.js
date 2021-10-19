import './App.css';
import React from 'react'
import { Container, Typography } from '@material-ui/core'
import { useState } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import Select from './components/Select/Select';
import Button from './components/Button/Button';
import SearchIcon from '@material-ui/icons/Search';
import TweetsContainer from './components/TweetsContainer/TweetsContainer';
import Loader from './components/Loader/Loader';
import ErrorSnackbar from './components/ErrorSnackbar/ErrorSnackbar';

function App() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(100);
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = () => {
    if(text.trim().length <= 2){
      setError("Please Enter a query with more than 2 characters!")
    }else{
      setLoading(true);
      fetch(`http://localhost:5000/search/?query=${text}&count=${count}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          const D = {
            negative: myJson.negative,
            positive: myJson.positive,
            ntweets: myJson.ntweets,
            ptweets: myJson.ptweets
          }
          setData(D);
          setLoading(false);
        })
    }
    
  }

  return (
    <Container>
      <Typography align="center" color="textSecondary" variant="h4">
        Twitter Opinion Miner
      </Typography>
      <Searchbar text={text} setText={setText} setData={setData} />
      <Select count={count} setCount={setCount} />
      <Button
        color="secondary"
        size="medium"
        variant="contained"
        text="Search"
        startIcon={<SearchIcon />}
        textTransform="capitalize"
        onClick={handleClick}
        disabled={!text}
      />

      {loading ? (
        <Loader />
      ) : <TweetsContainer data={data} />}
      <ErrorSnackbar error={error} setError={setError}/>
    </Container>
  );
}

export default App;