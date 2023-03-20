import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const EscapeRoom = (props) => {

  const { rooms, cart, setCart, auth } = props

  const id = useParams().id;
  const room = rooms.find(room => room.id == id)

  const [selectedTime, setSelectedTime] = useState(null);

  const addEscapeRoomToCart = async (EscapeRoomId) => {
    const token = window.localStorage.getItem('token');
    if (!token) return;
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

  const imageFilenames = {
    1: 'space-room.jpg',
    2: 'factory-room.jpg',
    3: 'gallery-room.jpg',
    4: 'library-room.jpg',
    5: 'office-room.jpg',
    6: 'tavern-room.jpg'
  };

  const imageFilename = `/static/knafpics/${imageFilenames[room.id]}`;


  const times = ['9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm'];

  return (
    <div className='escape-room'>
      <div className="four">
        <h1 className='singleRoom'>{room.name}</h1>
      </div>
      <div className="singlePic">
        <img src={imageFilename} alt={`Image ${room.id}`} />
      </div>
      <div className='escape-room-details'>
        <p><span className="postHeaders">Description: </span>{room.maindescription}</p>
        <p><span className="postHeaders">Time: </span></p>
        <div>
          {times.map((time, index) => {
            const isDisabled = cart.EscapeRooms.some((room) => room.id === id && room.time === time);
            return (
              <button
                key={index}
                onClick={() => {
                  setSelectedTime(time);
                }}
                disabled={isDisabled}
                style={{ textDecoration: isDisabled ? 'line-through' : 'none' }}
                className="time-btn"
              >
                {time}
              </button>
            )
          })}
        </div>
        <button
          disabled={!auth.id || !selectedTime}
          onClick={async () => {
            await addEscapeRoomToCart(room.id, selectedTime);
            setSelectedTime(null);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default EscapeRoom;
