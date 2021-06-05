import React, { Component } from 'react'
import { connect } from 'react-redux';
import { postProduct, autoLogin, getProducts, deleteProduct } from '../actions/actions';

class AddProduct extends Component {
    constructor(props){
        super(props)
       
        this.state = {
            avatar: '',
            description: '',
            price: '',
            name: '',
            category: ''
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
    this.props.addProduct(form_data)
      };

    render() {
      const { products, user, deleteProduct } = this.props
      user.admin === false ? this.props.history.push('/') : console.log('cool')
      const userProducts = products.length && products.filter((product) => (product.user_id) === user.id)
      const ImageThumb = ({ avatar }) => {
        return <img style={{ width: '150px', height: '150px'}} src={URL.createObjectURL(avatar)} alt={avatar.name} />;
      };
        return (
            <div>
               <form onSubmit={this.handleSubmit}>
               <div id="upload-box">
      <input type="file" onChange={this.handleFile} accept="image/png, image/jpeg, image/jpg"/>
      <p>Filename: {this.state.avatar.name}</p>
      <p>File type: {this.state.avatar.type}</p>
      <p>File size: {this.state.avatar.size} bytes</p>
      {this.state.avatar && <ImageThumb avatar={this.state.avatar} />}
    </div>                   <input onChange={this.handleChange} type='text' id='name' placeholder='product Name' />
                   <input onChange={this.handleChange} type='text' id='description' placeholder='description' />
                   <input onChange={this.handleChange} type='text' id='price' placeholder='product price' />
                   <label htmlFor="category">
              Pick choose a product Category:&nbsp;&nbsp;&nbsp;
              <select className="favCity" value={this.state.category} onChange={this.handleChange}>
                {' '}
                <option value="CATEGORY">Select</option>
                <option value="Sports">Sports</option>
                <option value="Electronics">Electronics</option>
                <option value='Mobile'>Mobile</option>
                <option value="Fashiony">Fashion</option>
                <option value="Automobile">Automobile</option>
                <option value="Accessories">Accessories</option>
                <option value="BestDeals">BestDeals</option>
              </select>
            </label>
            <button type="submit" className="btn pink lighten-1 z-depth-0">
              Add Product
            </button>
               </form>
               {userProducts && userProducts.map((x) => (
                 <div key={x.id}>
                   <p>{x.name}</p>
                   <p>{x.price}</p>
                   <p>{x.description}</p>
                   <p>{x.category}</p>
                   <img src={x.avatar.url} alt={x.name} />
                   <button type='submit' onClick={() => deleteProduct(x.id) }>Remove</button>
                 </div>
               ))} 
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