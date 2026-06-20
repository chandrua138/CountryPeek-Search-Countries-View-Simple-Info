import { Link } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext'

function CountryCard({ country }) {
  const { name, flags, population, region, capital, cca3 } = country
  const { favourites, dispatch } = useFavourites()
  const isSaved = favourites.some((fav) => fav.cca3 === cca3)

  const handleFavouriteClick = (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (isSaved) {
      dispatch({ type: 'REMOVE_FAVOURITE', payload: cca3 })
      return
    }

    dispatch({ type: 'ADD_FAVOURITE', payload: country })
  }

  return (
    <div className="card">
      <Link to={`/country/${cca3}`} className="card__link">
        <img
          src={flags.svg}
          alt={`Flag of ${name.common}`}
          className="card__flag"
        />
        <div className="card__body">
          <h3 className="card__name">{name.common}</h3>
          <p>
            <span>Population:</span> {population.toLocaleString()}
          </p>
          <p>
            <span>Region:</span> {region}
          </p>
          <p>
            <span>Capital:</span> {capital?.[0] ?? 'N/A'}
          </p>
        </div>
      </Link>
      <button
        type="button"
        className={isSaved ? 'fav-btn fav-btn--saved' : 'fav-btn'}
        onClick={handleFavouriteClick}
        aria-label={
          isSaved
            ? `Remove ${name.common} from favourites`
            : `Save ${name.common} to favourites`
        }
        aria-pressed={isSaved}
      >
        {isSaved ? '♥ Saved' : '♡ Save'}
      </button>
    </div>
  )
}

export default CountryCard
