import React, { Component } from "react";
import firebase from "./firebase";
import axios from "axios";
import Catalogue from './Catalogue';
import MakeupDetails from './MakeupDetails';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './Footer';

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
  
  render() {
    console.log("Rendering...");
    return (
      <Router>
        <div className="App">
          <header>
            <h1>Moribus</h1>
          </header>

          <Route exact path="/" component={ Catalogue } />
          <Route exact path="/MakeupDetails/:makeupId" component={ MakeupDetails } /> 

          <Footer />
        </div>
      </Router> 
    );
  }
}

export default App;
