import React, {useContext} from 'react'
import './Favorites.css'
import { FavoritesContext } from '../../contexts/FavoritesContext'
import CharacterCard from '../../components/CharacterCard/CharacterCard'

function Favorites() {
    const {favorites, addCharacter} = useContext(FavoritesContext)

  return (
    <div className='favorites-container'>
        <h1>My Favorite Characters</h1>
        <div className='favorite-characters'>
        {
            favorites.length > 0?
          favorites.map(item=><CharacterCard key={item.id} character={item} />)
          :
          <p>No favorites characters selected yet</p>
        }
        </div>
    </div>
  )
}

export default Favorites