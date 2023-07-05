import { useState } from 'react';
import './App.css';


const welcome = {
  name: 'World'
}

const List = ({ items }) => {
  return items.map((item) => {
    return (
      <div key={item.objectID}>
        <span><a href={item.url}><h3>{item.title}</h3></a></span>
      </div>
    );
  })
} 

const App = () =>  {
  const stories =  [{
    title: 'G',
    url: 'google.com',
    objectID: 0}, 
    {
      title: 'FB',
      url: 'facebook.com',
      objectID: 1
    }];

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = event => {
    setSearchTerm(event.target.value)
  };

  return (
    <>
      <h1>Hacker Stories</h1>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange}/>
      <p>Searching for <strong>{searchTerm}</strong></p>
      <hr />
    <ul><List items={stories}/></ul>
    </>
);
}

export default App;
