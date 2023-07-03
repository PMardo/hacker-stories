import { useState } from 'react';
import './App.css';

function MyButton({fun, count}) {
  return (
    <button onClick={fun}>Clicked {count} times</button>
  )
}

const welcome = {
  name: 'World'
}

const myList = [{
  title: 'G',
  url: 'google.com',
  objectID: 0}, 
  {
    title: 'FB',
    url: 'facebook.com',
    objectID: 1
  }];

  const myListItems = myList.map((item) => {
    return (
      <div key={item.objectID}>
        <span><a href={item.url}><h3>{item.title}</h3></a></span>
      </div>
    );
  })
function App() {

  let [count, setCount] = useState(0);

  function handleClick(){
    setCount(count+1);
  }

  return (
    <>
      <h1>Hacker Stories</h1>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
      <hr />
      <MyButton count={count} fun={handleClick} />
      <MyButton count={count} fun={handleClick} />
    <ul>{myListItems}</ul>
    </>
);
}

export default App;
