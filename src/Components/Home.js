import React from 'react';

const Home = ({rooms}) => {
  return (
    <div>
      <div className="four">
        <h1><span>check out our selection</span> Explore our <em>Escape</em> rooms</h1>
      </div>
      <div className='gallery'>
        <div className="image-container">
          <img src='/static/knafpics/space-room.jpg' alt='Image 1' />
          <div className="overlay">
            <h3>Space Room</h3>
            <p>Description of the space room.</p>
          </div>
        </div>
        <div className="image-container">
          <img src='/static/knafpics/factory-room.jpg' alt='Image 2' />
          <div className="overlay">
            <h3>Factory Room</h3>
            <p>Description of the factory room.</p>
          </div>
        </div>
        <div className="image-container">
          <img src='/static/knafpics/gallery-room.jpg' alt='Image 3' />
          <div className="overlay">
            <h3>Gallery Room</h3>
            <p>Description of the gallery room.</p>
          </div>
        </div>
        <div className="image-container">
          <img src='/static/knafpics/library-room.jpg' alt='Image 4' />
          <div className="overlay">
            <h3>Library Room</h3>
            <p>Description of the library room.</p>
          </div>
        </div>
        <div className="image-container">
          <img src='/static/knafpics/office-room.jpg' alt='Image 5' />
          <div className="overlay">
            <h3>Office Room</h3>
            <p>Description of the office room.</p>
          </div>
        </div>
        <div className="image-container">
          <img src='/static/knafpics/tavern-room.jpg' alt='Image 6' />
          <div className="overlay">
            <h3>Tavern Room</h3>
            <p>Description of the tavern room.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
