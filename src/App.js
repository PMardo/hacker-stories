import React, { useState, useEffect, useRef, useReducer} from 'react';
import './App.css';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query='; 

const List = ({ items, handleRemoveItem }) => {
  return items.map(( item ) => <Item key={item.objectID} onRemoveItem={handleRemoveItem} item={item} />);
} 

const Item = ({ item, onRemoveItem }) => {
  return (
    <>
      <a href={item.url}><h3>{item.title} by {item.author}</h3></a>
      <button type="button" onClick={() => onRemoveItem(item)}>Dismiss</button>
    </>
  )
}

const InputWithLabel = (
  { id, input, type="text", handleInput, isFocused, children }) => {
  
  // isFocused use is just an imperative example (what's going to happen vs how)
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

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INITIALIZE': return {
      ...state,
      isLoading: true,
      isError:false
    } 
    case 'STORIES_FETCH_SUCCESS': return {
      ...state,
      isLoading: false,
      isError: false,
      data: action.payload
    }
    case 'STORIES_FETCH_FAILURE': return {
      ...state,
      isLoading: false,
      isError: true
    }
    case 'STORIES_REMOVE_ITEM': return {
      ...state,
      data: state.data.filter(
        (story) => story.objectID != action.payload.objectID)
    }
    default: throw new Error();
  }
}

const App = () =>  {
    const [stories, dispatchStories] = useReducer(storiesReducer, 
      {data: [], isLoading: false, isError: false});
    React.useEffect(() => {
      dispatchStories({ type: 'STORIES_FETCH_INITIALIZE' });
      fetch(`${API_ENDPOINT}react`)
        .then(response => response.json())
        .then(result => {
          dispatchStories({
            type: 'STORIES_FETCH_SUCCESS',
            payload: result.hits,
          });
        })
        .catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' }));
    }, []);
    
    const removeStory = (removeStory) => {
      dispatchStories({type: 'STORIES_REMOVE_ITEM', payload: removeStory});
    }
  
    const [searchTerm, setSearchTerm] = useSemiPermanentState(
      'search', 'Javascript');
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
    const searchedStories = stories.data.filter((story) => {
      return story.title.toLowerCase().includes(searchTerm.toLowerCase()) && story.title;
    })
    
  return (
    <>
      <h1>Hacker Stories</h1>

      <InputWithLabel id="search" handleInput={handleSearch} input={searchTerm} ><strong>Search</strong></InputWithLabel> 
      <hr />
     {stories.isError && (<p>Something went wrong...</p>)}
     {stories.isLoading ? 
      (<p>Loading...</p>) : 
      (<ul>
        <List items={searchedStories} handleRemoveItem={removeStory}/>
      </ul>
      )}

      
    </>
);
}

export default App;
