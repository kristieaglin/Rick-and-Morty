import React from 'react'
import './Search.css'
import axios from 'axios'

function Search({setCharacters}) {

    //create state to hold user input
    const [query, setQuery] = React.useState('')

    //https://rickandmortyapi.com/api/character/?name=beth

    const handleSubmit = (e) =>{
        //stop form from refreshing
        e.preventDefault()
        console.log('search', query)
        //make api call to get matching characters
        axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`)
        .then(res =>{ 
            console.log(res.data.results)
            setCharacters(res.data.results)
        })
        .catch(err => {
            console.log(err.response.status)
            if (err.response.status === 404) {
                alert( `No characters named ${query}`)
            }else{
                console.log(err)
            }
        })
        //clear textbox
        setQuery('')
    }

  return (
    <form className='search-container' onSubmit={handleSubmit}>
        <input type='text' onChange={(e)=>setQuery(e.target.value)} placeholder='Search all characters'></input>
    </form>
  )
}

export default Search