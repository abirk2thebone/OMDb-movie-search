import React, { Component } from 'react';
import logo from './logo.svg';
import axios from "axios"
import './App.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Search from 'react-search-box';
import _ from 'lodash';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import Module from 'react-bootstrap';



class App extends Component {

  constructor(){
    super()
    this.state = {movies:[]}
  }

  optionsSort = [{ value: 'one', label: 'Choose a sorting option' }, { value: 'two', label: 'Year' }]
  optionsFilter = [{ value: 'one', label: 'Choose a filtering option' }, { value: 'two', label: '2005 onwards' }]
  
  search = async () => {
    const response = await axios(`http://www.omdbapi.com/?apikey=63175308&s=${this.state.search}`)
    this.setState({movies:response.data.Search})
    console.log("state",this.state)
  }

  sortSelection = (selection) => {
    if (selection.value === 'two') {
      this.setState({movies:_.sortBy(this.state.movies, 'Year')})
    }
  }


  filterSelection = (selection) => {
    if (selection.value === 'two') {
     this.setState({movies:_.filter(this.state.movies, movie => movie.Year >= 2005)})
    }
  }


  render() {
    return (
      <div className="App">
      <input placeholder="Search movie" onChange = {e => this.setState({search:e.target.value})}/> 
      <button onClick = {this.search}> Search </button>
      <div className="filter-lists">
      <Dropdown options={this.optionsSort} onChange={this.sortSelection} value={this.optionsSort[0]} />
      <Dropdown options={this.optionsFilter} onChange={this.filterSelection} value={this.optionsFilter[0]} />
      </div>
      {_.map(this.state.movies, (movie,i) => <p key={i}> {movie.Title}, ({movie.Year}) </p>)}
      </div>
    );
  }
}

export default App;
