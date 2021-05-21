import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { addOne, removeFromCart, removeOne, postOrder, clearOrder } from '../actions/actions';

class Basket extends Component {
    constructor(props){
        super(props)

        this.state = {
            showCheckout: false,
            name: '',
            email: '',
            address: '',
            phone: '',
            cartitems: this.props.cartItems,
            total: this.props.cartItems.reduce((a, c) => a + c.price*c.count, 0),
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
        cartitems: this.props.cartItems,
       phone: this.state.phone,
       total: this.props.cartItems.reduce((a, c) => (a + c.price*c.count), 0),
     }
      this.props.createOrder(order)
    }

    closeModal = () => {
      this.props.clearOrder()
      document.querySelector('.orderform').reset()
      this.setState({
        showCheckout: false
      })
    }

  render() {
    const { cartItems, orders } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div> cart is empty</div>
        ) : (
          <div>you have{cartItems.length}in the cart</div>
        )}

        {
           orders && <Modal isOpen={true} onRequestClose={this.closeModal}>
             <Zoom>
               <button onClick={this.closeModal}>X</button>
               <div>
                 <h3>your order has been placed</h3>
                 <h2>order number{orders.id}</h2>
                 <ul>
                   <li>
                     <div>Name</div>
                     <div>Name: {orders.name}</div>
                   </li>
                   <li>
                     <div>Email</div>
                     <div>Email: {orders.email}</div>
                   </li>
                   <li>
                     <div>Address</div>
                     <div>Address: {orders.address}</div>
                   </li>
                   <li>
                     <div>Phone</div>
                     <div>Phone: {orders.phone}</div>
                   </li>
                   <li>
                     <div>Total</div>
                     <div>Total: {Number(orders.total)}</div>
                   </li>
                   <li>
                     {/* {orders.cartitems.length ? (orders.cartitems.map((x) =>(
                       <div>
                         {x}
                       </div>
                     ))) : (<p>no items</p>)} */}
                     { orders.cartitems.map((x)=> {
                       const replacement = x.replace(/[&\/\\=]/g, '');
                       const remove = replacement.replace(/[&\/\\>]/g, ':')
                       const parsing = JSON.parse(remove)
                       console.log(JSON.stringify(parsing))
                       return(
                         <div>
                           {parsing.count} {"x"} {parsing.price} {parsing.name}
                         </div>
                       )
                     })}
                   </li>
                 </ul>
               </div>
             </Zoom>
           </Modal>
        }


        <div>
          <div>
          <Fade left cascade>
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
                      <button onClick={() => this.props.removeItem(item)}>Remove</button>
                      <button onClick={() => this.props.removeOne(item)}>-</button>
                      <button onClick={() => this.props.addOne(item)}>+</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            </Fade>
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
          <Fade right cascade>
            <div>
                <form onSubmit={this.createOrder} className='orderform'>
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
                          <label>phone</label>
                          <input name='phone' type='text' required onChange={this.handleInput} />
                      </li>
                      <li>
                          <button type='submit'>Checkout</button>
                      </li>    
                    </ul>
                </form>
            </div>
            </Fade>
        ) }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cartItems: state.cart.cartItems,
  orders: state.orders.order
})

const mapDispatchToProps = dispatch => ({
  removeItem: (product) => dispatch(removeFromCart(product)),
  addOne: (product) => dispatch(addOne(product)),
  removeOne: (product) => dispatch(removeOne(product)),
  createOrder: (items) => dispatch(postOrder(items)),
  clearOrder: () => dispatch(clearOrder())
})

export default connect(mapStateToProps, mapDispatchToProps)(Basket)


