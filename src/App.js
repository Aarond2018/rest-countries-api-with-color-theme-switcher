import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Main from './Main';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CountryLookUp from './CountryLookUp';

class App extends React.Component {
  state = {
    countries: [],
    tempCountries: [],
    auxCountries: [],

    themeDark: {
      headerDark: "header-dark",
      themePDark: "theme-p-dark",
      mainDark: "main-dark",
      formWrapperDark: "form-wrapper-dark",
      fasDark: "fas-dark",
      filterOverviewDark: "filter-overview-dark",
      ulDark: "ul-dark",
      liDark: "li-dark",
      countryDetailsDark: "country-details-dark",

    },
    isDarkMode: false
  }

  toggleDarkMode = () => {
    this.setState( {isDarkMode: !this.state.isDarkMode} )
  }

  componentDidMount(){
    fetch("https://restcountries.eu/rest/v2/all")
    .then((res) => res.json())
    .then(data => {
      this.setState( {countries: data, tempCountries: data, auxCountries: data} )
    })
  }

  handleSearch = (e) => {
    let filteredArr = this.state.countries

    /* const filteredArr = e.target.value ? this.state.countries.filter(ct => ct.name.includes(e.target.value)) : this.state.countries; */
    filteredArr = this.state.tempCountries.filter(obj => obj.name.toLowerCase().includes(e.target.value.toLowerCase()))


    this.setState( {countries: filteredArr} )
  }

  handleRegionFilter = (id) => {
    const filteredArr = this.state.tempCountries.filter(country => country.region.includes(id))

    this.setState( {countries: filteredArr} )
  }

  handleCountryOpen = (name) => {
    let filteredArr = this.state.tempCountries

    filteredArr = this.state.tempCountries.filter(obj => obj.name === name)

    /* console.log(filteredArr) */
    localStorage.setItem("state", JSON.stringify(filteredArr))
    localStorage.setItem("data", JSON.stringify(this.state.auxCountries))
    /* this.setState( {countries: filteredArr} ) */
  }

  handleReset = () => {
    this.setState( {countries: this.state.tempCountries} )
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header 
            state={this.state}
            toggleDarkMode={this.toggleDarkMode}
          />
          <Switch>
            <Route exact path="/">
              <Main state={this.state} handleSearch={this.handleSearch} handleRegionFilter={this.handleRegionFilter} handleCountryOpen={this.handleCountryOpen}/>
            </Route>
            <Route exact path="/countryview">
              <CountryLookUp state={this.state} reset={this.handleReset}/>
            </Route>
          </Switch>
        </div>  
      </BrowserRouter>
    );
  }
}

export default App;
