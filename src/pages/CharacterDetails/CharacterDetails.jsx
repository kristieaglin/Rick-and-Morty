import React from 'react'
import './CharacterDetails.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function CharacterDetails() {
    //this pages will show details for a specific character
    //the id will be passed in the URL
    //retrieve id from params
    const {characterId} = useParams()

    //create state to hold data
    const [character, setCharacter] = React.useState('')

    //show details for character when the page loads
    //https://rickandmortyapi.com/api/character/2
    React.useEffect( 
        () => {
        //console.log(characterId)
        //make api call
        axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)
        .then(res => {
            console.log(res.data)
            setCharacter(res.data)
        }
        )
        .catch(err => console.log(err))

    }, [] //runs once when page loads
    )
    

  return (
    <div className='details-container'>
        <img src={character?.image} />
        <div className='container-info'>
            <p>Name: {character?.name}</p>
            <p>Gender: {character?.gender}</p>
            <p>Location: {character?.location?.name}</p>
            <p>Species: {character?.species}</p>
        </div>
    </div>
  )
}

export default CharacterDetails