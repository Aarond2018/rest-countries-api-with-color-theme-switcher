import React from 'react';
import './App.css';

class Header extends React.Component {
  
  render (){
    return (
      <header className={!this.props.state.isDarkMode?"header":"header header-dark"}>
        <h2>Where in the world?</h2>
        <div className="theme-toggle" onClick={this.props.toggleDarkMode}>
          <i className="far fa-moon"></i>
          <p className={!this.props.state.isDarkMode?"":"theme-p-dark"}>Dark Mode</p>
        </div>
      </header>
    )
    }
}

export default Header
