import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import App from './App';

test('check title', () => {
  const{getByTestId} = render(<App/>);
  const element = getByTestId('titleText').innerHTML
  expect(element).toBe('Twitter Opinion Miner')
});


test('check button disabled', () => {
  const{getByTestId} = render(<App/>);
 
  const button = getByTestId("searchButton");
  expect(button).toHaveClass("Mui-disabled");

});

test('button onClick', async() => {
  const{queryByTestId} = render(<App/>);
 
  const button = queryByTestId("searchButton");
  fireEvent.click(button);

  await waitFor(()=>screen.queryByTestId("isLoader"))
  // expect(screen.queryByTestId("isLoader"))
});

test('tweet container present', async() => {
  const{queryByTestId} = render(<App/>);
 
  const button = queryByTestId("searchButton");
  fireEvent.click(button);

  await waitFor(()=>screen.queryByTestId("tweetsContainer"))
});