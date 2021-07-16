import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CountryLookUp extends Component {
  state = {
    country: JSON.parse(localStorage.getItem("state"))
  }

  handleNav = (obj) => {
      this.setState( {country: obj} )
  }

  render() {
    return (
      <div className={!this.props.state.isDarkMode?"countryView":"countryView bg-dark"}>
        <Link to="/" onClick={this.props.reset}>
          <div className="button-back">
            <i className="fas fa-arrow-left"></i>
            <p>Back</p>
          </div>
        </Link>
        <div className="main-country">
          <div className="main-country__img">
            <img src={this.state.country[0].flag} alt="img"></img>
          </div>
          <div className="main-country__details">
            <h2>{this.state.country[0].name}</h2>
            <div className="main-country__text">
              <div className="text-one">
                <p><span>Native Name:</span> {this.state.country[0].nativeName}</p>
                <p><span>Population:</span> {this.state.country[0].population.toLocaleString()}</p>
                <p><span>Region</span> {this.state.country[0].region}</p>
                <p><span>Sub region:</span> {this.state.country[0].subregion}</p>
                <p><span>Capital:</span> {this.state.country[0].capital}</p>
              </div>
              <div className="text-two">
                <p><span>Top Level Domain:</span> {this.state.country[0].topLevelDomain}</p>
                <p><span>Currencies:</span> {this.state.country[0].currencies.map(cr => cr.name)}</p>
                <p><span>Languages:</span> {this.state.country[0].languages.map(cr => cr.name + ", ")} </p> 
              </div>
            </div>
            <div className="border-countries">
              <div><h5>Border Countries:</h5> 
                {this.state.country[0].borders.map(cr =>  {
                  const obj = JSON.parse(localStorage.getItem("data")).filter(c => c["alpha3Code"] === cr)
                  
                  return <Link to="/countryView" onClick={()=>{this.handleNav(obj)}} key={obj[0].name}>
                    <p className={!this.props.state.isDarkMode?"border":"border bg-dark-2"}>{obj[0].name}</p>
                  </Link> 
                }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CountryLookUp
