import React from 'react'
import { Link } from 'react-router-dom';


const EscapeRooms = ({ rooms , cart, setCart}) => {
    const addEscapeRoomsToCart = async (EscapeRoomsId) => {
        const token = window.localStorage.getItem('token');
        if(!token) return;
        const response = await fetch(`api/cart/${EscapeRoomsId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
        const updatedCart = await response.json();
         setCart(updatedCart);
    }
    return (
        <div className='roomForm'>

            <ul>
                <div>Cart ({cart.EscapeRooms.length})</div>
                {
                    rooms.map(room => {
                        return (
                            <div key={room.id}>
                                <p><Link to ={`/EscapeRooms/${room.id}`}>{room.name}</Link></p>
                                <p>{room.briefdescription}</p>
                                <button
                                    onClick={async () => {
                                     await addEscapeRoomsToCart(room.id);

                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default EscapeRooms;