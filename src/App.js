import './styles/App.css';
import Box from './components/Box';
import FoundBox from './components/FoundBox';
import { useState } from 'react';

export default function App() {
  const characters = [{
    id: 1,
    name: "waldo",
    coordsX: [630,730],
    coordsY: [230,330]
},
{
    id: 2,
    name: "smoke",
    coordsX: [325,425],
    coordsY: [100,200]
},
{
    id: 3,
    name: "tower",
    coordsX: [500,600],
    coordsY: [80,180]
},
{
    id: 4,
    name: "boat",
    coordsX: [75,300],
    coordsY: [250,350]
},
{
    id: 5,
    name: "devil",
    coordsX: [730,830],
    coordsY: [180,280]
}]

const [options, setOptions] = useState(characters);
const [hidden, setHidden] = useState(true);
const [coords, setCoords] = useState([0,0]);
const [found, setFound] = useState([]);

  const handleClick = (e) => {
    createBox(e.pageX - 50, e.pageY - 50);
  }

  const createBox = (x,y) => {
    setCoords([x,y]);
    setHidden(false);
  } 

  const placeMarker = (char) => {
    setFound([...found, char]);
  }
 
  return (
    <div onClick={handleClick} className="App">
      <Box coords={coords} hidden={hidden} setHidden={setHidden} characters={options} setOptions={setOptions} placeMarker={placeMarker}/>      
      {found.map((char) => {
        const avgCoords = [(char.coordsX[0] + char.coordsX[1])/2, (char.coordsY[0] + char.coordsY[1])/2]
        return <FoundBox coords={avgCoords} label={char.name} />
      })}
    </div>
  );
}