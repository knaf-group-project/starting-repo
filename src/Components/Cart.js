import React from "react";

const Cart = ({ cart }) => {
    console.log('cart:', cart);
    return (
    <div>
        <h2>My Escape Room Purchases</h2>
        <ul>
        {cart.EscapeRooms?.map((room) => {
          return (
            <li key ={room.id}>
              {room.name}
              
            </li>
          );
        })}
        </ul>
      
    </div>
  );
};
 export default Cart