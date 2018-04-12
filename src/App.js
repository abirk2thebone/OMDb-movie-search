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

  optionsSort = [
  { value: 'one', label: 'Choose a sorting option' }, 
  { value: 'two', label: 'Year' }, 
  { value: 'three', label: 'Title' }]

  optionsFilter = [
  { value: 'one', label: 'Choose a filtering option' }, 
  { value: 'two', label: '1990 and onwards' }, 
  { value: 'three', label: '2005 and onwards'}]
  
  search = async (movieSearch) => {
    console.log(movieSearch)
    const response = await axios(`http://www.omdbapi.com/?apikey=63175308&s=${movieSearch}`)
    this.setState({movies:response.data.Search})
  }

  sortSelection = (selection) => {
    if (selection.value === 'two') {
      this.setState({movies:_.sortBy(this.state.movies, 'Year')})
    }
    else if (selection.value === 'three'){
      this.setState({movies:_.sortBy(this.state.movies, 'Title')})
    }
  }


  filterSelection = (selection) => {
    if (selection.value === 'two') {
     this.setState({movies:_.filter(this.state.movies, movie => movie.Year >= 1990)})
    }
    else if (selection.value === 'three'){
     this.setState({movies:_.filter(this.state.movies, movie => movie.Year >= 2005)})
    }
  }


  render() {
    return (
      <div className="App">
      <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"/>      
      <div className="box">
      <div className="container-1">
      <span className="icon"><i className="fa fa-search"></i></span>
      <input type="search" id="search" placeholder="Search movie" onKeyPress = {e => {if (e.key === 'Enter'){ {this.search(e.target.value)}}}} />
      </div>
      </div>
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
