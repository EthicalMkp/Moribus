import React, { Component } from 'react';
import axios from 'axios';

class MakeupDetails extends Component {
  constructor(){
    super();
    this.state = {
      makeupItem: {},
      makeupItemColours: [],
      showColours: false
    }
  }

  componentDidMount() {
    const {makeupId} = this.props.match.params
    console.log(makeupId)
    axios({
      url: `http://makeup-api.herokuapp.com/api/v1/products/${makeupId}.json`,
      method: "GET"
    }).then((res) => {
      console.log(res.data.product_colors)
      this.setState({
        makeupItem: res.data,
        makeupItemColours: res.data.product_colors
      });
    });
  }

  // Below code (and ternary condition in the render) was referenced from the following website:
  // https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe
  // Credit goes to Abinav Seelan

  // This function is setting the state of showColours to true on click; this will render the names of the available colours onto the page
  displayColours = (event) => {
    event.preventDefault();
    
    this.setState({ 
      showColours: true 
    }, 
    () => {document.addEventListener('click', this.hideColours)});
  }
  
  // This function is setting the state of showColours to false on click; this will remove the colour names
  hideColours = () => {
    this.setState({ 
      showColours: false 
    }, 
    () => {document.removeEventListener('click', this.hideColours)});
  }

  render() {
    const {image_link, name, price_sign, price, currency, description } = this.state.makeupItem;
    return(
      <div className="moreInfo">
        <div className="image">
          <img src={image_link}/>
        </div>
        <div className="description">
          <h1>{name}</h1>
          <h2>{price_sign, price, currency}</h2>
          <p>{description}</p>
        </div>
        <div className="colourMenuContainer">
          <button onClick={this.displayColours}>
            See available colours
          </button>
          {/* A ternary condition that checks the state of showColours. The button above toggles the state from true to false. When true it will show the colour names of the makeupItem and on false it will remove the items from the screen */}
          {
            this.state.showColours
              ? 
              (
                this.state.makeupItemColours.map((color) => {
                  return (
                    <div className="swatch">
                      <ul>
                        <li><span>{color.colour_name}</span></li>
                      </ul>
                    </div>
                  ); 
                })
              )
              : (
                null
              )
          }
        </div>
      </div>
    )
  }
}

export default MakeupDetails;