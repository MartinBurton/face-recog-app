import './App.css';
import Navigation from '../Components/Navigation/Navigation';
import Logo from '../Components/Logo/Logo';
import Rank from '../Components/Rank/Rank';
import ImageLinkForm from '../Components/ImageLinkForm/ImageLinkForm';
import 'tachyons'
import Particles from 'react-tsparticles';

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

function App() {
  return (
    <div className="App pa3">
      <Particles className='particles' options={particleOptions}/>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* {
      <FaceRecognition />} */}
    </div>
  );
}

export default App;
