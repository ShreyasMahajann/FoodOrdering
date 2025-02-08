function Cart({ cart }) {
  return (
    <div>
      <h1>Cart</h1>
      {cart.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default Cart;
