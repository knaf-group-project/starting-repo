import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({rooms}) => {
  const imageFilenames = [
    'space-room.jpg',
    'factory-room.jpg',
    'gallery-room.jpg',
    'library-room.jpg',
    'office-room.jpg',
    'tavern-room.jpg'
  ];

  return (
    <div>
      <div className="four">
        <h1> Explore <em>Your</em> Next Escape Room</h1>
      </div>
      <div className='gallery'>
        {rooms.map((room) => (
          <div className="image-container" key={room.id}>
            <Link to={`/EscapeRooms/${room.id}`}>
              <img src={`/static/knafpics/${imageFilenames[room.id - 1]}`} alt={`Image ${room.id}`} />
              <div className="overlay">
                <h3>{room.name}</h3>
                <p>{room.briefdescription}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
