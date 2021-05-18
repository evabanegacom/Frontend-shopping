import React, { Component } from "react";

class Basket extends Component {
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div> cart is empty</div>
        ) : (
          <div>you have{cartItems.length}in the cart</div>
        )}
        <div>
          <div>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div>
                    <img src={item.avatar.url} alt="" />
                  </div>
                  <div>
                    <div>{item.name}</div>
                    <div>
                      { item.price} x {item.count}
                      <button onClick={() => this.props.removeFromCart()}>Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Basket;
