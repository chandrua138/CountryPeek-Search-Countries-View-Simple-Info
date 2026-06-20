import { Link } from 'react-router-dom'
import CountryCard from '../components/CountryCard'
import { useFavourites } from '../context/FavouritesContext'

function Favourites() {
  const { favourites } = useFavourites()

  if (favourites.length === 0) {
    return (
      <div className="home">
        <p className="home__status">You haven't saved any countries yet.</p>
        <Link to="/" className="back-btn">
          Explore countries
        </Link>
      </div>
    )
  }

  return (
    <div className="home">
      <div className="cards-grid">
        {favourites.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  )
}

export default Favourites
