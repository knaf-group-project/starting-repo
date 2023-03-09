import React from 'react'


const EscapeRooms = ({ rooms , cart}) => {
    const addEscapeRoomsToCart = async (EscapeRoomsId) => {
        const token = window.localStorage.getItem('token');
        if(!token) return;
        const response = await fetch(`/cart/${EscapeRoomsId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
        const updatedCart = await response.json();
        return updatedCart;
    }
    return (
        <div className='roomForm'>

            <ul>
                <div>Cart ({cart.length})</div>
                {
                    rooms.map(rooms => {
                        return (
                            <li key={rooms.id}>
                                {rooms.name}
                                {rooms.briefdescription}
                                <button
                                    onClick={async () => {
                                        const updatedCart = await addEscapeRoomsToCart(rooms.id);
                                        // setCart(updatedCart)
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default EscapeRooms;