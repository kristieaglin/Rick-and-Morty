import React from 'react'
import './Episodes.css'
import axios from 'axios'
import CharacterCard from '../../components/CharacterCard/CharacterCard';

function Episodes() {
  //create state to hold numbers
  const [options, setOptions] = React.useState([])
  //state for option selected by user
  const [selectedOption, setSelectedOption] = React.useState(1)
  //state for data for episodes
  const [selectedEpisode, setselectedEpisode] = React.useState('')
  //state for characters
  const [characterList, setCharacterList] = React.useState([])

  //https://rickandmortyapi.com/api/episode

  //need to find number of episodes
  React.useEffect(
    ()=>{
      //make api call to get number of episodes
      axios.get(`https://rickandmortyapi.com/api/episode`)
      .then(res=>{
        //number of episodes
        console.log(res.data.info.count)
        //use loop to array through all episode numbers 1-51
        const newOptions = []
        for (let i=1; i<=res.data.info.count; i++){
          newOptions.push(i)

        }
        setOptions(newOptions)
      })
      .catch(err => console.log(err))
    }, [] //run once when page loads
  )

    const handleSelectChange = (e) => {
      console.log(e.target.value)
      setSelectedOption(e.target.value)
    }

    //need to get data when user selects another episode
    React.useEffect(
      ()=>{
        console.log("get data")
        //call function to get data
        fetchEpisodeData()

      }, [selectedOption] //runs anytime this value changes

    )

    const fetchEpisodeData = async () =>{
      console.log("make call")
      try{
        //make api call to get data for episodes
        const res = await axios.get(`https://rickandmortyapi.com/api/episode/${selectedOption}`)
        console.log(res.data)
        //store this in state
        setselectedEpisode(res.data)
        //console.log(res.data.characters)
        //we need to make all these api calls to get character data
        const episodeCharacters = await Promise.all(
          res.data.characters.map(url => {
            return axios.get(url).then(res => res.data)
          })
        )
          console.log(episodeCharacters)
          //store this data in state
          setCharacterList(episodeCharacters)

      } catch(err){
        //any api errors will go here
        console.log(err)
      }
    }

  return (
    <div className='episodes-container'>
      <div>
        <label htmlFor='select-episode'>Select an episode:</label>
        <select id='select-episode' onChange={handleSelectChange}>
          {
            options.map(num => <option key={num} value={num} >{`Episode ${num}`}</option>)
          }
        </select>
      </div>
      <div>
          <div className='episode-info'>
            <p>Episode Name: {selectedEpisode?.name}</p>
            <p>Air Date: {selectedEpisode?.air_date}</p>
          </div>
          <div className='character-container'>
          {
          characterList.map(item=><CharacterCard key={item.id} character={item} />)
        }
          </div>
      </div>
    </div>
  )
}

export default Episodes