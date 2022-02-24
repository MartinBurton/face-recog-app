import './App.css';
import Navigation from '../Components/Navigation/Navigation';
import Logo from '../Components/Logo/Logo';
import Rank from '../Components/Rank/Rank';
import ImageLinkForm from '../Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../Components/FaceRecognition/FaceRecognition';
import SignIn from '../Components/SignIn/SignIn';
import Register from '../Components/Register/Register';
import 'tachyons';
import Particles from 'react-tsparticles';
import Clarifai from 'clarifai';
import { Component } from 'react';

const app = new Clarifai.App({
  apiKey: 'cb453aebe8d643cebb9e813937d86038'
});

const particleOptions = {
    fpsLimit: 120, 
    particles: { 
      links: {
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: true,
        speed: 0.6,
        straight: false,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: "star",
      },
      size: {
        random: true,
        value: 3,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 100,
      }
    } 
  };

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow:  height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log('clarifai error:',err));
  }

  onRouteChange = (route) => {
    if(route === 'signin') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageURL, route, box} = this.state
    return (
      <div className="App pa3">
        <Particles className='particles' options={particleOptions}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        { 
          route === 'home' 
            ?
              <div>
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                <FaceRecognition imageURL={imageURL} box={box}/>
              </div>
            : (
                route === 'signin' 
                  ? <SignIn onRouteChange={this.onRouteChange}/>
                  : <Register onRouteChange={this.onRouteChange}/>
            )
        }   
      </div>
    )
  }
}

export default App;
