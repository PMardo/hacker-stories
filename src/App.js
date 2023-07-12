import React, { useState, useEffect, useRef } from 'react';
import './App.css';


const welcome = {
  name: 'World'
}

const List = ({ items, handleRemoveItem }) => {

  return items.map(( item ) => <Item key={item.objectID} onRemoveItem={handleRemoveItem} item={item} />);
} 

const Item = ({ item, onRemoveItem }) => {

  // Normal Handler
  // const handleRemoveItem = () => {
  //   return onRemoveItem(item);
  // }
  // Inline Handler: 
  return (
    <>
      <a href={item.url}><h3>{item.title} by {item.author}</h3></a>
      <button type="button" onClick={() => onRemoveItem(item)}>Dismiss</button>
    </>
  )
}

// Imperative example: This is what you're going to do (what vs how)
const InputWithLabel = (
  { id, input, type="text", handleInput, isFocused, children }) => {
  const inputRef = useRef();
  useEffect(() => {
    if (isFocused) {
    inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div>
      <label htmlFor={id}>{children}:</label>
      &nbsp;
      <input id={id} type={type} value={input} onChange={handleInput} ref={inputRef} />
    </div>
  )
}

const useSemiPermanentState = (key, initialValue) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialValue);
  useEffect(() => localStorage.setItem(key, value), [value]);

  return [value, setValue]
}

const initStories = [{
  title: '1984',
  author: 'George Orwell',
  url: 'https://en.wikipedia.org/wiki/Nineteen_Eighty-Four',
  objectID: 0}, {
  title: 'The Lord of the Rings',
  author: 'J.R.R.Tolkien',
  url: 'https://en.wikipedia.org/wiki/The_Lord_of_the_Rings',
  objectID: 1}, {
  title: 'Harry Potter',
  author: 'J.K. Rowling',
  url: 'https://en.wikipedia.org/wiki/Harry_Potter',
  objectID: 3}];

const getAsyncStories = () => {
  return new Promise(res => setTimeout(
    () => res({data: {stories: initStories}}), 
    2000));
}



const App = () =>  {

    const [stories, setStories] = useState([]);
    React.useEffect(() => {
      getAsyncStories().then(result => {
        setStories(result.data.stories);
      });
    }, []);
  
    const removeStory = (removeStory) => {
      const keepStories = stories.filter((story) => story.objectID != removeStory.objectID);
      setStories(keepStories);
    }

    const [searchTerm, setSearchTerm] = useSemiPermanentState('search', '1984');
    
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };

    const searchedStories = stories.filter((story) => {
      return story.title.toLowerCase().includes(searchTerm.toLowerCase()) && story.title;
    })
    
  return (
    <>
      <h1>Hacker Stories</h1>

      <InputWithLabel id="search" handleInput={handleSearch} input={searchTerm} ><strong>Search</strong></InputWithLabel> 
      <hr />
      <ul>
        <List items={searchedStories} handleRemoveItem={removeStory}/>
      </ul>
    </>
);
}

export default App;
