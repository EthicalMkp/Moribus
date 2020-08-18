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
      emptyErrorMsg: false,
      typoErrorMsg: false
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
      console.log(res.data[0].id)
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
      this.setState({
          errorMsg: true,
      })
  } else {
    const productName = this.state.itemSearch;
    const lowercase = productName.toLowerCase();
    const finalSearch = lowercase.replace(/\s/g, "_")
      const filteredData = this.state.makeupItems.filter((items) => {
        return items.product_type === this.state.itemSearch;
      });
      this.setState({
        filteredMakeupItems: filteredData,
        itemSearch: finalSearch
      });
    };
  }


  render() {
  console.log("filtered makeup", this.state.filteredMakeupItems)
    return (
      <div className="allItems">
        { 
          this.state.errorMsg ?
          alert("Please enter a product")
          : null
        }
        <form action="">
          <label htmlFor="item">Enter in a product name</label>
          <br />
          <input
            onChange={this.inputSearch}
            // onKeyPress={this.turnToLowerCase}
            type="textarea"
            id="item"
            value={this.state.itemSearch}
          />
          <br />
          <button onClick={this.handleClick}>Search</button>
        </form> 
          {
            this.state.makeupItems.map( (product) => {
              return ( 
                <div key={product.id} className="makeup">
                {this.state.filteredMakeupItems.map((product) => {
                  return (
                    <div>
                      <h2>{product.name}</h2>
                      {/* <p>{product.price_sign} {product.price} {product.currency}</p>
                      <p>{product.product_link}</p>
                      <p>{product.description}</p> */}
                      <Link to={`/makeupDetails/${product.id}`}>
                        <img src={product.image_link} alt={`${product.name}`} />
                      </Link>
                      {/* <p>{product.product_type}</p> */}
                      {/* <p>{product.tag_list[0]}</p> */}
                    </div>
                  ); 
                })
              }
            </div>
            )
          })
        }
      </div>
    )
  }
}

export default Catalogue;