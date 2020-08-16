import React, { Component } from "react";
import firebase from "./firebase";
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      makeupItems: [],
      itemSearch: "",
      filteredMakeupItems: []
    }
  }

  componentDidMount() {
    console.log("Mounted");
    
    axios({
        url: "http://makeup-api.herokuapp.com/api/v1/products.json",
        method: 'GET',
        dataType: 'json',
        params: {
          product_tags: "Vegan",
          product_type: this.state.itemSearch
        }
    })
    .then( (res) => {
      const makeupArray = res.data;

      this.setState({
        makeupItems: makeupArray
      })
      //(e.g. price, link to purchase, color values, photo, original rating, would repurchase/wouldn’t repurchase rating)
      console.log(makeupArray);
    })
  }

  inputSearch = ( event ) => {
    event.preventDefault();
    this.setState({
      itemSearch: event.target.value
    })
    console.log(event.target.value);
  }

  handleClick = (event, userChoice) => {
    event.preventDefault();
    const filteredData = this.state.makeupItems.filter((items) => {
      return items[userChoice] === this.inputSearch(event);
    })
    console.log(filteredData);
    
  }

  render() {
    console.log('Rendering...')
    return (
      <div className="App">
        <h1>Moribus</h1>
        <form action="">
          <label htmlFor="item">Enter in a product name</label><br/>
          <input onChange={this.inputSearch} type="textarea" id="item" value={this.state.itemSearch}/><br/>

          <button onClick={this.handleClick}>Search</button>
        </form>
        {/* {
          this.state.makeupItems.map( (product) => {
            return (
              <div>
                <h2>{product.name}</h2>
                <p>{product.price}</p>
                <img src={product.image_link} alt=""/>
                <p>{product.product_link}</p>
                <p>{product.description}</p>
                <p>{product.product_type}</p>
                <p>{product.tag_list[0]}</p>
              </div>
            )
          })
        } */}
      </div>
    );
  }
}

export default App;
