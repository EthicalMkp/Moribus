import React, { Component } from "react";
import firebase from "./firebase";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      makeupItems: [],
      itemSearch: "",
      filteredMakeupItems: [],
    };
  }

  componentDidMount() {
    console.log("Mounted");

    axios({
      url: "http://makeup-api.herokuapp.com/api/v1/products.json",
      method: "GET",
      dataType: "json",
      params: {
        product_tags: "Vegan",
        product_type: this.state.itemSearch,
      },
    }).then((res) => {
      this.setState({
        makeupItems: res.data,
      });
      //(e.g. price, link to purchase, color values, photo, original rating, would repurchase/wouldn’t repurchase rating)
      // console.log(makeupArray);
      console.log(res.data);
    });
    
  }

  inputSearch = (event) => {
    event.preventDefault();
    this.setState({
      itemSearch: event.target.value,
    });
    console.log(event.target.value);
  };

  turnToLowerCase = () => {
    const productName = this.state.itemSearch;
    const lowercase = productName.toLowerCase();
    const finalSearch = lowercase.replace(/\s/g, "_")
    this.setState({ 
      itemSearch: finalSearch
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    const filteredData = this.state.makeupItems.filter((items) => {
      return items.product_type === this.state.itemSearch;
    });
    this.setState({
      filteredMakeupItems: filteredData,
      itemSearch: ""
    });
  };

  render() {
    console.log("Rendering...");
    return (
      <div className="App">
        <h1>Moribus</h1>
        <form action="">
          <label htmlFor="item">Enter in a product name</label>
          <br />
          <input
            onChange={this.inputSearch}
            onKeyPress={this.turnToLowerCase}
            type="textarea"
            id="item"
            value={this.state.itemSearch}
          />
          <br />
          <button onClick={this.handleClick}>Search</button>
        </form>
        {this.state.filteredMakeupItems.map((product) => {
          return (
            <div>
              <h2>{product.name}</h2>
              <p>{product.price}</p>
              <img src={product.image_link} alt="" />
              <p>{product.product_link}</p>
              <p>{product.description}</p>
              <p>{product.product_type}</p>
              <p>{product.tag_list[0]}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
