import './styles/App.css';
import Box from './components/Box';
import FoundBox from './components/FoundBox';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firebaseConfig } from './firebase.config';

export default function App() {
  let characters = [];
  useEffect(() => {  
    const fetchData = async () => {
      const app = initializeApp(firebaseConfig); 
      const db = getFirestore(app);
      const response =  await getDocs(collection(db, "characters"));
      if(characters.length === 0){
        response.forEach((element) => {
          const character = element.data();
          character.id = element.id;
          characters.push(character);
        });  
      }
    }
    fetchData();
  });

  const [options, setOptions] = useState(characters);
  const [hidden, setHidden] = useState(true);
  const [coords, setCoords] = useState([0,0]);
  const [found, setFound] = useState([]);
  const [message, setMessage] = useState('');
  const [time, setTime] = useState(new Date());

  const handleClick = (e) => {
    createBox(e.pageX - 50, e.pageY - 50);
  }

  const createBox = (x,y) => {
    setCoords([x,y]);
    setHidden(false);
  } 

  const placeMarker = (char) => {
    setFound([...found, char]);
    if(found.length === 4){
      ShowScore(new Date() - time);
    }
  }

  const ShowScore = (timespan) => {
    const minutes = Math.round(timespan / 60000);
    const seconds = Math.round((timespan % 60000) / 1000);
    setMessage(`Congratulations! \n Your time is: ${minutes} minutes and ${seconds} seconds`);
  }

  return (
    <div onClick={handleClick} className="App">
      <Box coords={coords} hidden={hidden} setHidden={setHidden} characters={options} setOptions={setOptions} placeMarker={placeMarker}/>      
      {found.map((char) => {
        const avgCoords = [(char.coordsX[0] + char.coordsX[1])/2, (char.coordsY[0] + char.coordsY[1])/2]
        return <FoundBox key={char.id} coords={avgCoords} label={char.name} />
      })}
      <div className='message'>{message}</div>
    </div>
  );
}