import React from 'react';
import axios from 'axios';
import './App.css';
import Button from '@material-ui/core/Button';
import { InputSearch } from './Component/InputSearch';
import { ShowImageData } from './Component/ShowImageData';

const ApiKey= '3e7cc266ae2b0e0d78e279ce8e361736';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: "",
      imageData: [],
      filteredOptions: [],
      showMoreImages: false,
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      value: e.target.value,
    },() => {
      const filteredOptions = this.state.imageData.filter(
        (option) => option.title.toLowerCase().indexOf(this.state.value.toLowerCase()) > -1 &&
        this.state.value !== "")
      this.setState({filteredOptions});
      if(this.state.showMoreImages){
        this.setState({ showMoreImages : !this.state.showMoreImages})
      }
    })
  }

  handleClick = (e) => {
    this.setState({ showMoreImages: true});
  }

  fetchImageData = () => {
    const imageDateUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ApiKey}&format=json&nojsoncallback=1&safe_search=1&text=kittens`
    axios.get(imageDateUrl)
      .then(res => {
        const imageData = res.data.photos.photo;
        this.setState({ imageData });
      })
  }

  componentDidMount () {
    this.fetchImageData();
  }

  render() {
    const { value, imageData, filteredOptions, showMoreImages} = this.state;
    return(
      <div>
        <h1 className ="header">Image Search</h1>
        <div className = "search">
         <InputSearch 
           handleChange={this.handleChange} 
           value={value}
          />
        </div>
        <div className="showImageData">
        {filteredOptions && <ShowImageData
          imageData ={filteredOptions}
        />}
        </div>
        <div className="button">
          {filteredOptions.length !==0 && !showMoreImages && 
            <Button variant="contained" onClick= {this.handleClick} color="primary" href="#contained-buttons">
              More Images
          </Button>
          }
        </div>
        <div className="showImageData">
          {showMoreImages && <ShowImageData
            imageData ={imageData}
          />}
        </div>
      </div>
    )
  }
}

export default App;
