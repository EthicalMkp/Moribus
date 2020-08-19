import React, { createContext, Component } from 'react';

export const FilterDataContext = createContext();


// write context that contains the search field state, the search results array, and the search API request
// pass all of the above as values in the provider
// wrap your entire app in this provider
// in your search component, consume all values from the provider, then use that to create and submit the form, as well as gather all the API results.

// You shouldn’t need to put any of the context onto your single item page.​


class FilterDataContextProvider extends Component {
  constructor(){
    super();
    this.state = {
      makeupItem: {}
    }
  }

  componentDidMount() {
    const {makeupId} = this.props.match.params
    console.log(makeupId)
    axios({
      url: `http://makeup-api.herokuapp.com/api/v1/products/${makeupId}.json`,
      method: "GET"
    }).then((res) => {
      console.log(res.data)
      this.setState({
        makeupItem: res.data,
      });
    
      //(e.g. price, link to purchase, color values, photo, original rating, would repurchase/wouldn’t repurchase rating)
      // console.log(makeupArray);
    });
  }

   toogleTheme = () => { 

   }
  render() { 
    return (
      <FilterDataContext value={{...this.state}}>
        {this.props.children}
      </FilterDataContext>
    );
  }
}
 
export default FilterDataContextProvider; 