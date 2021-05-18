import React, { Component } from "react";

class Basket extends Component {
    constructor(props){
        super(props)

        this.state = {
            showCheckout: false,
            name: '',
            email: '',
            address: ''
        }
    }

    handleInput = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }

    createOrder = (e) => {
      e.preventDefault()
      const order = {
        name: this.state.name,
        email: this.state.email,
        address: this.state.address,
        cartItems: this.props.cartItems
      }
      this.props.createOrder(order)
    }

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
                      <button onClick={() => this.props.removeFromCart(item)}>Remove</button>
                      <button onClick={() => this.props.removeOneItem(item)}>Remove 1</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {cartItems.length!==0 && (
            <div>
            <div>
                <div>
                  Total: {" "}
                    {cartItems.reduce((a, c) => a + c.price*c.count, 0)}
                </div>
                <button onClick={() => {this.setState({showCheckout: true})}}>Proceed to checkout</button>
            </div>
        </div>
        )}
        {this.state.showCheckout && (
            <div>
                <form onSubmit={this.createOrder}>
                    <ul>
                      <li>
                          <label>Email</label>
                          <input name='email' type='email' required onChange={this.handleInput} />
                      </li>
                      <li>
                          <label>Name</label>
                          <input name='name' type='text' required onChange={this.handleInput} />
                      </li>
                      <li>
                          <label>Address</label>
                          <input name='address' type='text' required onChange={this.handleInput} />
                      </li>
                      <li>
                          <button type='submit'>Checkout</button>
                      </li>    
                    </ul>
                </form>
            </div>
        ) }
      </div>
    );
  }
}

export default Basket;
