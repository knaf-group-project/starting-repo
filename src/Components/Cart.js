import React, { useState } from 'react';

const Cart = ({ cart, setCart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

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
      body: JSON.stringify({ name, email, number }),
    });
    const newCart = await response.json();
    setCart({ EscapeRooms: [] });
  };

  const isFormValid = name && email && number;

  return (
    <main>
      <div className="containerSignup">
        <div className="cart">
          <i className="bx bx-cart"></i>
        </div>
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
        <form>
          <h3>Contact info</h3>
          <br></br>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Number:
            <input type="tel" value={number} onChange={(e) => setNumber(e.target.value)} />
          </label>
          <br></br>
          <div>
            <p>
              *Please note, the total price is $37.99 per person, per room.*
            </p>
          </div>
          <br></br>
          <div className="inputBox">
            <button
              className="submit"
              disabled={!isFormValid}
              onClick={async () => {
                const newCart = await purchaseCart();
              }}
            >
              PURCHASE CART
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Cart;
