import React from 'react'


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
                    rooms.map(rooms => {
                        return (
                            <li key={rooms.id}>
                                {rooms.name}
                                {rooms.briefdescription}
                                <button
                                    onClick={async () => {
                                     await addEscapeRoomsToCart(rooms.id);

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