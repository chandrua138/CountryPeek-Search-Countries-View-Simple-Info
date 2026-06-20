import { useNavigate, useParams } from 'react-router-dom'
import useCountry from '../hooks/useCountry'

function CountryPage() {
  const { code } = useParams()
  const navigate = useNavigate()
  const { country, loading, error } = useCountry(code)

  if (loading) {
    return <p className="page-status">Loading...</p>
  }

  if (error) {
    return <p className="page-status page-status--error">{error}</p>
  }

  if (!country) {
    return null
  }

  const { name, flags, population, region, subregion, capital, languages, currencies, borders } = country
  const languageNames = languages ? Object.values(languages) : []
  const currencyNames = currencies ? Object.values(currencies).map((currency) => currency.name) : []

  return (
    <div className="country-page">
      <button type="button" className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="country-page__layout">
        <img src={flags.svg} alt={`${name.common} flag`} className="country-page__flag" />

        <div className="country-page__info">
          <h2 className="country-page__name">{name.common}</h2>
          <p className="country-page__official">{name.official}</p>

          <div className="country-page__details">
            <div>
              <p><span>Population:</span> {population.toLocaleString()}</p>
              <p><span>Region:</span> {region}</p>
              <p><span>Subregion:</span> {subregion || 'N/A'}</p>
              <p><span>Capital:</span> {capital?.[0] || 'N/A'}</p>
            </div>
            <div>
              <p><span>Languages:</span> {languageNames.join(', ')}</p>
              <p><span>Currencies:</span> {currencyNames.join(', ')}</p>
            </div>
          </div>

          {borders && borders.length > 0 && (
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
    </div>
  )
}

export default CountryPage
