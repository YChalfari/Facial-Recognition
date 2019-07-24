import React, { Component } from 'react';
import tachyons from 'tachyons';
import Particles from 'react-particles-js';
import Tilt from 'react-tilt';
import Navigation from './Components/Navigation/Navigation.js';
import FaceReco from './Components/FaceReco/FaceReco.js';
import Logo from './Components/Logo/Logo.js';
import Rank from './Components/Rank/Rank.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js';
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '80971066945147f69bd5e34c5471d008',
});

const particleOptions = {
  particles:{
    number: {
      value:100,
      density: {
        enable: true,
        value_area:800
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imgUrl: '',
      fetchFailed: false,
    }
  }

  onInputChange =(event)=> {
    this.setState({input: event.target.value});
    //console.log(event.target.value);
  }

  onButtonSubmit = () => {
    this.setState({imgUrl: this.state.input});
    
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(
    (response) => {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      this.setState({fetchFailed:false});
      
    },
    (err) => {
     console.log(err, 'Whups'); 
     console.log(this.state.fetchFailed);
     this.setState({fetchFailed: true});
      
    }
  );
  }
  render() {
  return (
    <div className="App">
    <Particles className='particles'
      params={particleOptions} />
    <Navigation />
    <Logo />
    <Rank />
    <ImageLinkForm 
     onInputChange={this.onInputChange} 
     onButtonSubmit={this.onButtonSubmit}/>
    <FaceReco fetchFailed={this.state.fetchFailed} imgUrl={this.state.imgUrl}/>
    </div>
  );
 }
}

export default App;
