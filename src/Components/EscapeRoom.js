import React from 'react';
import { useParams, Link } from 'react-router-dom';

const EscapeRoom = (props) => { 

  const { rooms } = props
  const id = useParams().id;
  const room = rooms.find(room => room.id == id)


  if (!room) {
    return null;
  }

  return (
    <div>
      <div>
        <h1><Link to={'/EscapeRooms'}>{room.name}</Link></h1>
        <p><span className="postHeaders">Description: </span>{room.maindescription}</p>
        <p><span className="postHeaders">Time: </span></p>
      </div>
    </div>
  )
}
 
export default EscapeRoom