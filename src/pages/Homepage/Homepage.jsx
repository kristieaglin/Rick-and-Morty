import React, {useEffect, useState} from 'react'
import './Homepage.css'
import axios from 'axios'
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import Search from '../../components/Search/Search';

function Homepage() {
  //show characters when page loads
  //create state to hold characters
  const [characters, setCharacters] = useState([])

  //https://rickandmortyapi.com/api/character

  useEffect(
    ()=>{
      //make api call to get data
      axios.get(`https://rickandmortyapi.com/api/character`)
      .then(res => {
        console.log(res.data.results)
        //store data in state
        setCharacters(res.data.results)
      })
      .catch(err => console.log(err))

    }, [] //runs only once when page loads
  )


  
  return (
    <div className='homepage-container'>
      <Search setCharacters={setCharacters} />
      <h1>Main Charaters</h1>
      <div className='characters-container'>
        {
          characters.map(item=><CharacterCard key={item.id} character={item} />)
        }
      </div>
    </div>
  )
}

export default Homepage