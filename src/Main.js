import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class Main extends React.Component {
  state = {
    filterOpen: false
  }

  handleFilterToggle = () => {
    this.setState( {filterOpen: !this.state.filterOpen} )
  }

  render() {
    return (
      <main className={!this.props.state.isDarkMode?"main":"main main-dark"}>
        <div className="main-header">
          <div className={!this.props.state.isDarkMode?"form-wrapper":"form-wrapper form-wrapper-dark"}>
            <i className={!this.props.state.isDarkMode?"fas fa-search":"fas fa-search fas-dark"}></i>
            <input type="text" className={!this.props.state.isDarkMode?"":"color-dark"} onChange={this.props.handleSearch} placeholder="Search for a country..."></input>
          </div>
          <div className="filter">
            <div className={!this.props.state.isDarkMode?"filter-overview":"filter-overview filter-overview-dark"} onClick={this.handleFilterToggle}>
              <p>Filter by Region</p>
              <i className="fas fa-angle-down"></i>
            </div>
            {this.state.filterOpen ? 
              <ul className={!this.props.state.isDarkMode?"":"ul-dark"}>
              <li onClick={()=>{this.props.handleRegionFilter("Africa")}}><p>Africa</p></li>
              <li onClick={()=>{this.props.handleRegionFilter("America")}}><p>America</p></li>
              <li onClick={()=>{this.props.handleRegionFilter("Asia")}}><p> Asia</p></li>
              <li onClick={()=>{this.props.handleRegionFilter("Europe")}}><p>Europe</p></li>
              <li onClick={()=>{this.props.handleRegionFilter("Oceania")}}><p>Oceania</p></li>
            </ul> : null
            }
            
          </div>
        </div>
        <CountryList 
          countries={this.props.state.countries} 
          state={this.props.state}
          handleCountryOpen={this.props.handleCountryOpen}
          />
      </main>
    )
}
}

class CountryList extends React.Component {
  
  render() {
    const countryComp = this.props?.countries.map(country => (
      <Country
        key={country.name.common} 
        flag={country.flags.png}
        name={country.name.common}
        population={country.population}
        region={country.region}
        capital={country.capital ? country.capital[0] : ""}
        state={this.props.state}
        handleCountryOpen={this.props.handleCountryOpen}
      />
    ))

    return (
      <ul className="country-list">
        {countryComp}
      </ul>
    )
  }
}

class Country extends React.Component {
  handleCountryOpen = (name) => {
    this.props.handleCountryOpen(name)
  }

  render() {
    return (
      <Link to="/countryview" onClick={()=>{this.handleCountryOpen(this.props.name)}}>
        <li className={!this.props.state.isDarkMode?"":"li-dark"}>
          <div className="country-flag">
            <img src={this.props.flag} alt={this.props.name}></img>
          </div>
          <div className={!this.props.state.isDarkMode?"country-details":"country-details country-details-dark color-white"}>
            <h4>{this.props.name}</h4>
            <p><span>Population:</span> {this.props.population.toLocaleString()}</p>
            <p><span>Region:</span> {this.props.region}</p>
            <p><span>Capital:</span> {this.props.capital}</p>
          </div>
        </li>
      </Link>
    )
  }
}


export default Main;
