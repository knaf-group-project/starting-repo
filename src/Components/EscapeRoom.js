import React from 'react';
import { useParams, Link } from 'react-router-dom';

const EscapeRoom = (props) => { 

  const { rooms, cart, setCart, auth } = props
  
  const id = useParams().id;
  const room = rooms.find(room => room.id == id)

  const addEscapeRoomToCart = async (EscapeRoomId) => {
    const token = window.localStorage.getItem('token');
    if(!token) return;
    const response = await fetch(`api/cart/${EscapeRoomId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    const updatedCart = await response.json();
    setCart(updatedCart);
  }

  if (!room) {
    return null;
  }

  return (
    <div>
      <div>
        <h1><Link to={'/EscapeRooms'}>{room.name}</Link></h1>
        <p><span className="postHeaders">Description: </span>{room.maindescription}</p>
        <p><span className="postHeaders">Time: </span></p>
        <button
          disabled={!auth.id}
          onClick={async () => {
            await addEscapeRoomToCart(room.id);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
 
export default EscapeRoom
