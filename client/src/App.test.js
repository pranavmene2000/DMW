import App from './App';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

test('check title', () => {
  const { getByTestId } = render(<App />);
  const element = getByTestId('titleText').innerHTML
  expect(element).toBe('Twitter Opinion Miner')
});


test('check button disabled', () => {
  const { getByTestId } = render(<App />);

  const button = getByTestId("searchButton");
  expect(button).toHaveClass("Mui-disabled");

});

test('button onClick', async () => {
  const { queryByTestId } = render(<App />);

  const button = queryByTestId("searchButton");
  fireEvent.click(button);

  await waitFor(() => screen.queryByTestId("isLoader"))
  // expect(screen.queryByTestId("isLoader"))
});

test('tweet container present', async () => {
  const { queryByTestId } = render(<App />);

  const button = queryByTestId("searchButton");
  fireEvent.click(button);

  await waitFor(() => screen.queryByTestId("tweetsContainer"))
});

test('check search bar placeholder', async () => {
  const { getByPlaceholderText } = render(<App />);
  const input = getByPlaceholderText("Enter keyword here...");
  expect(input).toBeTruthy()
});


test('Simulates selection', () => {
  const { queryByTestId, queryAllByTestId } = render(<App />);
  // The value should be the key of the option
  const select = queryByTestId('select')
  fireEvent.change(select, {
    target: {
      value:
        500
    }
  })
  let options = queryAllByTestId('select-option')
  expect(options[3].textContent).toBe("500");
})

// 10, 100, 200, 500, 1000, 1500
test('Check select option values', () => {
  const { queryAllByTestId } = render(<App />);
  let options = queryAllByTestId('select-option')
  expect(options[0].textContent).toBe("10");
  expect(options[1].textContent).toBe("100");
  expect(options[2].textContent).toBe("200");
  expect(options[3].textContent).toBe("500");
  expect(options[4].textContent).toBe("1000");
  expect(options[5].textContent).toBe("1500");
})