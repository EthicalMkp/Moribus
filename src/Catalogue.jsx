import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Catalogue extends Component {
  constructor(){
    super();
    this.state = {
      makeupItems: [],
      itemSearch: "",
      filteredMakeupItems: [],
    }
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
      console.log(res)
      const AllData = res.data
      console.log(AllData)
      this.setState({
        makeupItems: AllData
      })
      console.log(this.state.makeupItems[0].product_colors[0].hex_value)
      console.log(this.state.makeupItems[0].product_colors[0].colour_name)
    })
  }
  
  inputSearch = (event) => {
    this.setState({
      itemSearch: event.target.value,
    });
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
    if (this.state.itemSearch === "") {
      alert("Please enter a product")
    } else {
      const productName = this.state.itemSearch;
      const lowercase = productName.toLowerCase();
      const finalSearch = lowercase.replace(/\s/g, "_")
      const filteredData = this.state.makeupItems.filter((items) => {
        return items.product_type === finalSearch;
      });
      if (filteredData.length > 0) {
        this.setState({
          filteredMakeupItems: filteredData,
          itemSearch: ""
        });
      } else {
        alert("Product not found. Please try again")
      }
    };
  }

  render() {
    console.log("filtered makeup", this.state.filteredMakeupItems)
    return (
      <div className="allItems">
        <form action="">
          <label htmlFor="item">Enter in a product name</label>
          <br />
          <input
            onChange={this.inputSearch}
            type="textarea"
            id="item"
            value={this.state.itemSearch}
            />
          <br />
          <button onClick={this.handleClick}>Search</button>
        </form>
        {
          this.state.filteredMakeupItems.map((product) => {
            return (
              <div key={product.id} className="makeup">
                <h2>{product.name}</h2>
                <Link to={`/makeupDetails/${product.id}`}>
                  <img src={product.image_link} alt={`${product.name}`} />
                </Link>
              </div>
            ); 
          })
        }
      </div>
    )
  }
}

export default Catalogue;