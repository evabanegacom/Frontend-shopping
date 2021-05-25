import React, { Component } from 'react'

class Filter extends Component {
    render() {
        return (
            <div>
               <div>{this.props.count} Products</div>
               <div> order {" "}  <select value={this.props.sorting} onChange={this.props.sortProducts}>
                   <option>LATEST</option>
                   <option value="lowest">Lowest</option>
                   <option value="highest">Highest</option>
               </select>
               </div> 
               <div>Filter  <select value={this.props.size} onChange={this.props.filterProducts}>
                   <option value="">ALL</option>
                   <option value="Mobile">Mobile</option>
                   <option value="Electronics">Electronics</option>
                   <option value="Sports">Sports</option>
                   <option value="Accessories">Accessories</option>
                   <option value="Automobile">Automobile</option>
                   <option value="Fashion">Fashion</option>
               </select></div> 
            </div>
        )
    }
}
export default Filter;