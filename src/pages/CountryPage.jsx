import { useNavigate, useParams } from 'react-router-dom'
import useCountry from '../hooks/useCountry'

function CountryPage() {
  const { code } = useParams()
  const navigate = useNavigate()
  const { country, loading, error } = useCountry(code)

  if (loading) {
    return <p className="page-status">Loading country details...</p>
  }

  if (error || !country) {
    return (
      <p className="page-status page-status--error">
        {error || 'Country not found.'}
      </p>
    )
  }

  const {
    name,
    flags,
    population,
    region,
    subregion,
    capital,
    languages,
    currencies,
    borders,
  } = country
  const languageNames = languages ? Object.values(languages) : []
  const currencyNames = currencies
    ? Object.values(currencies).map((currency) => currency.name)
    : []

  return (
    <section className="country-page">
      <button
        type="button"
        className="back-btn"
        onClick={() => navigate(-1)}
        aria-label="Go back to the previous page"
      >
        ← Back
      </button>

      <div className="country-page__layout">
        <img
          src={flags.svg || flags.png}
          alt={`Flag of ${name.common}`}
          className="country-page__flag"
        />

        <div className="country-page__info">
          <h2 className="country-page__name">{name.common}</h2>
          <p className="country-page__official">{name.official}</p>

          <div className="country-page__details">
            <div>
              <p>
                <span>Population:</span> {population?.toLocaleString() || 'N/A'}
              </p>
              <p>
                <span>Region:</span> {region || 'N/A'}
              </p>
              <p>
                <span>Subregion:</span> {subregion || 'N/A'}
              </p>
              <p>
                <span>Capital:</span> {capital?.[0] || 'N/A'}
              </p>
            </div>
            <div>
              <p>
                <span>Languages:</span> {languageNames.join(', ') || 'N/A'}
              </p>
              <p>
                <span>Currencies:</span> {currencyNames.join(', ') || 'N/A'}
              </p>
            </div>
          </div>

          {Array.isArray(borders) && borders.length > 0 && (
            <div>
              <h3>Border Countries</h3>
              <div className="border-list">
                {borders.map((border) => (
                  <span key={border} className="border-badge">
                    {border}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CountryPage
