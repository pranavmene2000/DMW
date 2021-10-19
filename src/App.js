import './App.css';
import { Container, Typography } from '@material-ui/core'
import { useState } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import Select from './components/Select/Select';
import Button from './components/Button/Button';
import SearchIcon from '@material-ui/icons/Search';
import TweetsContainer from './components/TweetsContainer/TweetsContainer';
import Loader from './components/Loader/Loader';
import Charter from './components/Chart/Chart';

function App() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(10);
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    fetch('./data.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(function (response) {
        console.log(response)
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson)
        const D = {
          negative: myJson.negative,
          positive: myJson.positive,
          ntweets: myJson.ntweets.filter(c => c.includes(text)),
          ptweets: myJson.ptweets.filter(c => c.includes(text)),
        }
        setData(D);
        setTimeout(() => setLoading(false), 1200)
      });
  }

  return (
    <Container>
      <Typography align="center" color="textSecondary" variant="p" component="h1">
        Opinion miner for tweets 🍉
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
    </Container>
  );
}

export default App;
