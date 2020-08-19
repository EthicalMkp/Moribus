import React, { createContext, Component } from 'react';

export const FilterDataContext = createContext();

// Call the API request and the function in context to set the state. 
// Call up the function to the component 



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