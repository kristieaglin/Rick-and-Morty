import React, {useContext} from 'react'
import './CharacterCard.css'
import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FavoritesContext } from '../../contexts/FavoritesContext';

function CharacterCard({character}) {

  const {favorites, addCharacter, removeCharacter} = useContext(FavoritesContext)

  //create variable to control icons
  //const isFavorite = false;
  //need state to control icons
  const [isFavorite, setIsFavorite] = React.useState(false)

  React.useEffect(
    ()=>{
      //is this character in favorites?
      setIsFavorite(favorites.find(item=> item.id == character.id))

    }, [favorites]
  )


  return (
    <div className='character-card'>
        <img src={character?.image} />
        <p>{character?.name}</p>
        <Link to={`/details/${character?.id}`}>See Details</Link>
        {
          isFavorite?
          <FaHeart className='heart-icon' onClick={()=>removeCharacter(character?.id)} />
          :
          <FaRegHeart className='heart-icon' onClick={()=>addCharacter(character)} />
        }
    </div>
  )
}

export default CharacterCard