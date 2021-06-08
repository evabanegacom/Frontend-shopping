import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import Paystack from './paystack';
import emailjs from 'emailjs-com';
import { Button, TextField, Typography, Paper, Box } from '@material-ui/core';
import { addOne, removeFromCart, removeOne, postOrder, clearOrder } from '../actions/actions';
import './cartCss.css';

class Basket extends Component {
    constructor(props){
        super(props)

        this.state = {
            showCheckout: false,
            nameError: '',
            emailError: '',
            addressError: '',
            phoneError: '',
            email: '',
            phone: '',
            address: '',
            name: '',
        }
    }

    handleInput = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }

    isValid = () => {
      const { name, email, address, phone } = this.state
      let nameError = '';
      let addressError = '';
      let phoneError = '';
      let emailError = '';
      if(name.length < 5){
        nameError = 'please input full name'
        console.log(nameError)
      }

      if(email.length < 5){
        emailError = 'please input email'
      }

      if(address.length < 5){
        addressError = 'please input full name'
      }

      if(phone.length < 5){
        phoneError = 'please input full name'
      }

      if (emailError || nameError || phoneError || addressError) {
        this.setState({ emailError, phoneError, addressError, nameError });
        return false;
      }
  
      return true;
    }

    createOrder = (e) => {
      e.preventDefault()
      const validate = this.isValid()
      const order = {
        name: this.state.name,
        email: this.state.email,
       address: this.state.address,
        cartitems: this.props.cartItems,
       phone: this.state.phone,
       total: Number(this.props.cartItems.reduce((a, c) => (a + c.price*c.count), 0),)
     }
     if(validate){
       this.props.createOrder(order)
       this.sendEmail(e)
     }
    }

    createOrderPaystack = () => {
      // e.preventDefault()
      const order = {
        name: this.state.name,
        email: this.state.email,
       address: this.state.address,
        cartitems: this.props.cartItems,
       phone: this.state.phone,
       total: Number(this.props.cartItems.reduce((a, c) => (a + c.price*c.count), 0),)
     }
      this.props.createOrder(order)
    }

    sendEmail = e => {
      e.preventDefault();
      let totals = this.props.cartItems.map((x)=> {
        const items = [['  Product-ID: ' + ' ' + x.id + ' '] +' ' + ' ' + ' ' + ['  Quantity: ' + ' ' + x.count + ' '] +' ' + ' ' + ' ' + ['  Name: ' + ' ' + x.name + ' '] +' ' + ' ' + ' ' + ['  Description: ' + ' ' + x.description + ' ']+
        ' ' + ' ' + ' ' + ['  Price: ' + ' ' + x.price + ' '] +' ' + ' ' + ' ' +  ['  Image: ' + ' ' + x.avatar.url + ' ']]

        return items
      });
      
      const order = {
        name: this.state.name,
        email: this.state.email,
       address: this.state.address,
        cartitems: totals,
       phone: this.state.phone,
       type: 'Payment On deilvery',
       business: this.state.email,
       total: Number(this.props.cartItems.reduce((a, c) => (a + c.price*c.count), 0),)
     }
      emailjs.send('service_ey6p9rp', 'template_l4w8jep', order, 'user_p6RgQH7YhWPsKwWBkmYPP')
      .then(result => {
      console.log(result.text);
      }, error => {
      console.log(error.text);
      });
      // e.target.reset();
      }

      sendEmailPaystack = () => {
        // e.preventDefault();
        let totals = this.props.cartItems.map((x)=> {
          const items = [['  Product-ID: ' + ' ' + x.id + ' '] +' ' + ' ' + ' ' + ['  Quantity: ' + ' ' + x.count + ' '] +' ' + ' ' + ' ' + ['  Name: ' + ' ' + x.name + ' '] +' ' + ' ' + ' ' + ['  Description: ' + ' ' + x.description + ' ']+
          ' ' + ' ' + ' ' + ['  Price: ' + ' ' + x.price + ' '] +' ' + ' ' + ' ' +  ['  Image: ' + ' ' + x.avatar.url + ' ']]
  
          return items
        });
        
        const order = {
          name: this.state.name,
          email: this.state.email,
         address: this.state.address,
          cartitems: totals,
         phone: this.state.phone,
         type: 'Paid with credit card',
         business: this.state.email,
         total: Number(this.props.cartItems.reduce((a, c) => (a + c.price*c.count), 0),)
       }
        emailjs.send('service_ey6p9rp', 'template_l4w8jep', order, 'user_p6RgQH7YhWPsKwWBkmYPP')
        .then(result => {
        console.log(result.text);
        }, error => {
        console.log(error.text);
        });
        // e.target.reset();
        }

    closeModal = () => {
      this.props.clearOrder()
      const form = document.querySelector('.orderform')
      form && form.reset()
      this.setState({
        showCheckout: false
      })
    }

    // SENDING ORDERED EMAIL CONTENT

  render() {
    const { cartItems, orders, user } = this.props;
    const { nameError, emailError, addressError, phoneError } = this.state
    console.log(cartItems)

    return (
      <div className='basket'>
       {/* <Link to={`/users/${user.id}/orders`}>Orders</Link> */}
        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '20px'}}> cart is empty</div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '20px'}}>you have {cartItems.length} items in the cart</div>
        )}

        {
           orders && <Modal className='modalOrder' isOpen={true} onRequestClose={this.closeModal}>
             <Zoom>
               <Button className='modalCloseOrder' onClick={this.closeModal}>X</Button>
               <Box component='div' display="flex" flexDirection="column" border={1} justifyContent="center">
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
                     { orders.cartitems.map((x)=> {
                       const replacement = x.replace(/[&\/\\=]/g, '');
                       const remove = replacement.replace(/[&\/\\>]/g, ':')
                       const parsing = JSON.parse(remove)
                       {/* console.log(JSON.stringify(parsing)) */}
                       return(
                         <div>
                           {parsing.count} {"x"} {parsing.price} {parsing.name}
                         </div>
                       )
                     })}
                   </li>
                 </ul>
               </Box>
             </Zoom>
           </Modal>
        }


        <div>
         
          <Fade left cascade>
            <div className='cartItems'>
              {cartItems.map((item) => (
                <div className='cartItemsDiv' key={item.id}>
                  
                    <img src={item.avatar.url} alt="" />
                  
                  <div style={{ background: 'blue', color: 'white'}}>
                    <div style={{ textAlign: 'center', lineHeight: '20px'}}>
                    <p><strong>{item.name}</strong></p>
                    <p>{ item.price} x {item.count}</p>
                    </div>
                    <div className='cartItemsButtons' style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '10px'}}>
    
                      <button style={{ color: 'rgb(29, 18, 18)'}} onClick={() => this.props.removeItem(item)}>X</button>
                      <button onClick={() => this.props.removeOne(item)}>-</button>
                      <button onClick={() => this.props.addOne(item)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </Fade>
          
        </div>
        {cartItems.length!==0 && (
           
            <div className='checkoutDiv'>
                <Button color='primary' className='totalPrice'>
                  Total: {" "}
                    {cartItems.reduce((a, c) => a + c.price*c.count, 0)}
                </Button>
                <Button onClick={() => {this.setState({showCheckout: true})}}>Proceed to checkout</Button>
            </div>
        
        )}
        {this.state.showCheckout && cartItems.length!==0 &&(
          <Fade right cascade>
            <div className='orderForm'>
            <Paper className='orderField' style={{ borderRadius: '20px'}} elevation={10}>
                <form>
                    
                         
                          <TextField id='inputemail' name='email' fullWidth type='email' label='Email' required onChange={this.handleInput} />
                          <p>{emailError}</p>
                          
                          <TextField id='inputname' name='name' type='text' fullWidth label='Name' required onChange={this.handleInput} />
                          <p style={{color: 'red'}}>{nameError}</p>
                     
                         
                          <TextField id='inputAddress' fullWidth name='address' type='text' label='Address' required onChange={this.handleInput} />
                          <p>{addressError}</p>

                      
                          
                          <TextField id='inputphone' fullWidth name='phone' type='text' label='Phone' required onChange={this.handleInput} />
                          <p>{phoneError}</p>

                      
                      <Button fullWidth color='secondary' onClick={() => {this.setState({showCheckout: false})}}>Cancel</Button>
                          <Button color='primary' fullWidth onClick={this.createOrder} type='submit'>Pay On Delivery</Button>
                          <Paystack createOrderPaystack={this.createOrderPaystack} paidWithCard={this.sendEmailPaystack} isValid={this.isValid}/>
                     
                </form>
                </Paper>
            </div>
            </Fade>
        ) }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cartItems: state.cart.cartItems,
  orders: state.orders.order,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  removeItem: (product) => dispatch(removeFromCart(product)),
  addOne: (product) => dispatch(addOne(product)),
  removeOne: (product) => dispatch(removeOne(product)),
  createOrder: (items) => dispatch(postOrder(items)),
  clearOrder: () => dispatch(clearOrder()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Basket)


