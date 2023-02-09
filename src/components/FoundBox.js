import '../styles/Box.css';

export default function FoundBox({coords}) {

    return (
        <div className="box" style={{top: coords[1], left: coords[0], border: "3px solid green", position: 'absolute'}}>
        </div>
    )
}