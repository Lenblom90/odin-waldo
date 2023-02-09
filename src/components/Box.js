import '../styles/Box.css';

export default function Box({coords, hidden, setHidden, characters, setOptions, placeMarker}) {
    
    const compareCoords = (coords, charName) => {
        const selectedChar = characters.find(x => x.name === charName);
        if(selectedChar.coordsX[0] <= coords[0] && selectedChar.coordsX[1] >= coords[0]){
            if(selectedChar.coordsY[0] <= coords[1] && selectedChar.coordsY[1] >= coords[1]){
                console.log("You found " + charName + "!");
                setOptions(characters.filter(x => x !== selectedChar));
                placeMarker(selectedChar);
            }
        } else {
            console.log("Sorry, try again.");
            setHidden(true);
        }

    }

    const handleClick = (e) => {
        e.stopPropagation();
        compareCoords(coords, e.target.textContent);
    }

    return (
        <div className="box" hidden={hidden} style={{top: coords[1], left: coords[0]}}>
            <div className='character-list'>
                {characters.map((char) => {
                    return <button key={char.id} onClick={handleClick}>{char.name}</button>
                })}
            </div>
        </div>
    )
}