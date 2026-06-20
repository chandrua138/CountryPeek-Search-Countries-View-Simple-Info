import { createContext, useContext, useEffect, useReducer } from 'react'

const FavouritesContext = createContext()

function favouritesReducer(state, action) {
  switch (action.type) {
    case 'ADD_FAVOURITE':
      if (state.some((country) => country.cca3 === action.payload.cca3)) {
        return state
      }
      return [...state, action.payload]
    case 'REMOVE_FAVOURITE':
      return state.filter((country) => country.cca3 !== action.payload)
    default:
      return state
  }
}

export function FavouritesProvider({ children }) {
  const initialFavourites = () => {
    const saved = localStorage.getItem('favourites')
    return saved ? JSON.parse(saved) : []
  }

  const [favourites, dispatch] = useReducer(favouritesReducer, [], initialFavourites)

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }, [favourites])

  return (
    <FavouritesContext.Provider value={{ favourites, dispatch }}>
      {children}
    </FavouritesContext.Provider>
  )
}

export function useFavourites() {
  return useContext(FavouritesContext)
}
