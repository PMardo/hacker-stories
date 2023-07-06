import { useState } from 'react';
import './App.css';


const welcome = {
  name: 'World'
}

const List = ({ items }) => {
  return items.map(( {objectID, ...item}) => <Item key={objectID} {...item} />);
} 

const Item = ({ title, author, url }) => {
  return (
    <span><a href={url}><h3>{title} by {author}</h3></a></span>
  )
}

const Search = ({ onSearch, searchTerm }) => {


  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" value={searchTerm} onChange={onSearch}/>
      <p>Searching for <strong>{searchTerm}</strong></p>
    </div>
  )
}

const App = () =>  {
  const stories =  [{
    title: '1984',
    author: 'George Orwell',
    url: 'https://en.wikipedia.org/wiki/Nineteen_Eighty-Four',
    objectID: 0}, 
    {
      title: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      url: 'https://en.wikipedia.org/wiki/The_Lord_of_the_Rings',
      objectID: 1
    },
    {
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      url: 'https://en.wikipedia.org/wiki/Harry_Potter',
      objectID: 3,
    }];
    const [searchTerm, setSearchTerm] = useState('1984');

    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };

    const searchedStories = stories.filter((story) => {
      return story.title.toLowerCase().includes(searchTerm.toLowerCase()) && story.title;
    })
    
  return (
    <>
      <h1>Hacker Stories</h1>
      <Search onSearch={handleSearch} searchTerm={searchTerm} /> 
      <hr />
      <ul>
        <List items={searchedStories} />
      </ul>
    </>
);
}

export default App;
