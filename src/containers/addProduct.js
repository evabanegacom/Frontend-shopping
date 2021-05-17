import React, { Component } from 'react'
import { connect } from 'react-redux';
import { postProduct } from '../actions/actions';

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
                <option value="Normandy">Normandy</option>
                <option value="Tokyo">Tokyo</option>
                <option value="Madrid">Madrid</option>
              </select>
            </label>
            <button type="submit" className="btn pink lighten-1 z-depth-0">
              Add Product
            </button>
               </form> 
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addProduct: productInfo => dispatch(postProduct(productInfo)),
})

export default connect(null, mapDispatchToProps)(AddProduct)