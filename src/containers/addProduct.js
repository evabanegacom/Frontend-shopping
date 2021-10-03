import React, { Component } from 'react'
import { connect } from 'react-redux';
import { postProduct, autoLogin, getProducts, deleteProduct, editProduct } from '../actions/actions';
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
            show: false,
            editInfo: '',
            disable: '',
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

    editForm = (name, description, price, select, x) => {
      this.setState({
        show: true,
      })
      this.setState({editInfo: x})
      this.state.show && document.querySelector('.addProductModal').classList.remove('closeForm')
      this.setState({disable: 'disable-add'})
      document.querySelector('#name').value = name
      document.querySelector('#description').value = description
      document.querySelector('#price').value = price
      document.querySelector('#select').value = select
      // document.querySelector('#actionButton button').disabled
      // !document.getElementById('editingProduct').disabled
   }

    showForm = () => {
       this.setState({
         show: true,
       })
       this.state.show && document.querySelector('.addProductModal').classList.remove('closeForm')
      //  document.querySelector('#addingProduct').disabled = false
      //  document.querySelector('#editingProduct').disabled = true
      this.setState({disable: 'disable-edit'})

    }

    closeForm = () => {
      this.setState({
        show: false,
      })
    if(this.state.show === false)
      document.querySelector('.addProductModal').classList.add('closeForm')
     else console.log('null')
    }

    handleSubmit = e => {
        e.preventDefault();
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

      handleEdit = (e, id) => {
        e.preventDefault();
        const form_data = new FormData();
        (this.state.avatar === '') ? console.log('null') : form_data.append('avatar', this.state.avatar);
    form_data.append('name', document.querySelector('#name').value);
    form_data.append('price', document.querySelector('#price').value);
    form_data.append('description', document.querySelector('#description').value);
    form_data.append('category', document.querySelector('#select').value);
    for (var key of form_data.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }
          
    this.props.editProduct(id, form_data)
    document.querySelector('.contentForm').reset()
    
      };

    render() {
      console.log(this.state.editInfo.id)
      console.log(this.state.disable)
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
                   <Button fullWidth className='addProductButton' onClick={() => this.editForm(x.name, x.description, x.price, x.category, x)}>Edit</Button>
                   
                 </div>
               ))}
               </div>
               <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'green', marginTop: '20px', fontSize: '20px'}}><Button fullWidth className='addProductButton' onClick={this.showForm}>Add New Product</Button></div>
               <Paper className='addProductModal closeForm' elevation={10}>
               <form className='contentForm' onSubmit={this.handleSubmit} name='form'>
               <div id="upload-box">
               <label class="custom-file-upload">
      <input className='fileUpload' required type="file" onChange={this.handleFile} accept="image/png, image/jpeg, image/jpg"/>
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
              <select id='select' className="favCity" value={this.state.category} onChange={this.handleChange}>
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
            <div id='actionButton' style={{ width: '100%'}}><Button disabled={this.state.disable === 'disable-add' ? true : false} id='addingProduct' variant="contained" className='addButton' color='primary' fullWidth type="submit" >
              Add Product
            </Button>
            
            </div>
               </form>
               <Button disabled={this.state.disable === 'disable-edit' ? true : false} id='editingProduct' variant="contained" onClick={(e) => this.handleEdit(e, this.state.editInfo.id)} color='primary' className='addButton' color='primary' fullWidth type="submit">
        Edit Product
      </Button>
            <Button variant="contained" onClick={this.closeForm} className='addButton' color='secondary' fullWidth type="submit" >
              X
            </Button>
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
    editProduct: (id,productInfo) => dispatch(editProduct(id, productInfo)),
    autoLogin: () => dispatch(autoLogin()),
    getProducts: () => dispatch(getProducts()),
    deleteProduct: (id) => dispatch(deleteProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)