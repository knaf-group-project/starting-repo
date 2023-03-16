import React from "react";

const Cart = ({ cart, setCart }) => {

    const deleteRoomFromCart = async (EscapeRoomsId) => {
        const token = window.localStorage.getItem('token');
        if (!token) return;
        const response = await fetch(`/api/cart/${EscapeRoomsId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        const updatedCart = await response.json();
        setCart(updatedCart);
        return updatedCart;
      };
    
      const purchaseCart = async () => {
        const token = window.localStorage.getItem('token');
        if (!token) return;
        const response = await fetch(`/api/cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        const newCart = await response.json();
        setCart(newCart);
      };

    console.log('cart:', cart);
    return (
    <div>
        <h2>My Escape Room Purchases</h2>
        <ul>
        {cart.EscapeRooms?.map((room) => {
          return (
            <li key={room.id}>
            {room.name}
            <button
              onClick={async () => {
                const updatedCart = await deleteRoomFromCart(room.id);
                setCart(updatedCart);
              }}
            >
              Remove Room
            </button>
          </li>
        );
      })}
    </ul>
    <button
      onClick={async () => {
        const newCart = await purchaseCart();
        setCart(newCart)
      }}
    >
      PURCHASE CART
    </button>
  </div>
);
};
 export default Cart