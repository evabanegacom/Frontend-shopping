import React, { Component } from 'react'
import { connect } from 'react-redux';
import { postProduct, autoLogin, getProducts, deleteProduct } from '../actions/actions';
import './addProduct.css';
import { Button, TextField, Input, Paper } from '@material-ui/core'
import ShowMoreText from "react-show-more-text";

class AddProduct extends Component {
    constructor(props){
        super(props)
       
        this.state = {
            avatar: '',
            description: '',
            price: '',
            name: '',
            selected: null,
            readMore: true,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
      const { autoLogin, getProducts } = this.props;
      autoLogin()
      getProducts()
    }

    componentDidUpdate(prevProps, prevState){
      const { products, getProducts } = this.props
      if(JSON.stringify(prevProps.products) !== JSON.stringify(products)){
        getProducts()
      }
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
          });

          this.setState({
            category: e.target.value,
          });
    }

    handleFile = e => {
        this.setState({
            avatar: e.target.files[0]
        })
    }

    toggleReadMore = () => {
        this.setState({
          readMore: !this.state.readMore
        })
        
    };

    handleSubmit = e => {
        e.preventDefault();
        // console.log(this.state)
        const form_data = new FormData();
    form_data.append('avatar', this.state.avatar);
    form_data.append('name', this.state.name);
    form_data.append('price', this.state.price);
    form_data.append('description', this.state.description);
    form_data.append('category', this.state.category);
    for (var key of form_data.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }
    if(document.querySelector('.fileUpload').files.length === 0){
        console.log('hi error')
    }else {        
    this.props.addProduct(form_data)
    document.querySelector('.contentForm').reset()
    }
      };

    render() {
      const { products, user, deleteProduct } = this.props
      user.admin === false && this.props.history.push('/')
      const userProducts = products.length && products.filter((product) => (product.user_id) === user.id)
      const ImageThumb = ({ avatar }) => {
        return <img style={{ width: '150px', height: '150px'}} src={URL.createObjectURL(avatar)} alt={avatar.name} />;
      };
        return (
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px'}}>
            <div className='addProduct'>
            {userProducts && userProducts.map((x) => (
                 <div  className='addProductItem' key={x.id}>
                   <img src={x.avatar.url.replace(/http/g, "https")} alt={x.name} />
                   
                   <p style={{ color: 'cyan'}}>{x.name}</p>
                   <p style={{ color: 'cyan'}}>{x.price}</p>
                   {/* <p style={{ color: 'cyan'}} className='productDesc'>
                   {this.state.readMore ? x.description.slice(0, 20) : x.description}
                   <span id={x.id.toString()} onClick={this.toggleReadMore} 
                   className="read-or-hide">{this.state.readMore ? "...read more" : " show less"}
                   </span>
                   </p> */}
                   <ShowMoreText
                   lines={3}
                more="Show more"
                less="Show less"
                className="content-css"
                anchorClass="my-anchor-css-class"
                onClick={this.executeOnClick}
                expanded={false}
                width={200}
                truncatedEndingComponent={"... "}
                   >{x.description}
                   </ShowMoreText>
                   <p style={{ color: 'cyan'}}>{x.category}</p>
                   <Button color='secondary' type='submit' onClick={() => deleteProduct(x.id) }>Remove</Button>
                 </div>
               ))}
               </div>
               <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'green', marginTop: '20px', fontSize: '20px'}}><Button fullWidth className='addProductButton' onClick={this.openTheModal}>Add New Product</Button></div>
               <Paper className='addProductModal' elevation={10}>
               <form className='contentForm' onSubmit={this.handleSubmit} name='form'>
               <div id="upload-box">
               <label class="custom-file-upload">
      <input  className='fileUpload' required type="file" onChange={this.handleFile} accept="image/png, image/jpeg, image/jpg"/>
      custom upload
      </label>
      <div style={{marginTop: '20px'}}>
      <p>Filename: {this.state.avatar.name}</p>
      <p>File type: {this.state.avatar.type}</p>
      <p>File size: {this.state.avatar.size} bytes</p>
      </div>
      {this.state.avatar && <ImageThumb avatar={this.state.avatar} />}
    </div>                   <TextField fullWidth  required onChange={this.handleChange} type='text' id='name' placeholder='product Name' />
                   <TextField fullWidth required onChange={this.handleChange} multiline type='text' id='description' placeholder='description' />
                   <TextField fullWidth required onChange={this.handleChange} type='text' id='price' placeholder='product price' />
                   <label htmlFor="category">
              Pick choose a product Category:&nbsp;&nbsp;&nbsp;
              <select className="favCity" value={this.state.category} onChange={this.handleChange}>
                {' '}
                <option value="CATEGORY">Select</option>
                <option value="Home-Theatres">Home-Theatres</option>
                <option value="Airconditioners-Coolers">Airconditioners-Coolers</option>
                <option value='Refrigerators-Freezers'>Refrigerators-Freezers</option>
                <option value="Television-sets">Television-sets</option>
                <option value="Power-Solutions-Generators">Power-Solutions-Generators</option>
                <option value="Home-Appliances">Home-Appliances</option>
                <option value="BestDeals">BestDeals</option>
              </select>
            </label>
            <Button variant="contained" className='addButton' color='primary' fullWidth type="submit" >
              Add Product
            </Button>
               </form>
               </Paper>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  products: state.products.products,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
    addProduct: productInfo => dispatch(postProduct(productInfo)),
    autoLogin: () => dispatch(autoLogin()),
    getProducts: () => dispatch(getProducts()),
    deleteProduct: (id) => dispatch(deleteProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)