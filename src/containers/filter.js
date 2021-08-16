import React, { Component } from 'react'
import './filterCss.css';

class Filter extends Component {
    render() {
        return (
            <div className='theFilter'>
               <div className='filterOrder'>
                 <select value={this.props.sorting} onChange={this.props.sortProducts}>
                   <option>LATEST</option>
                   <option value="lowest">Lowest</option>
                   <option value="highest">Highest</option>
               </select>
               </div> 
               <div className='filterInput'><select value={this.props.size} onChange={this.props.filterProducts}>
                   <option value="">All Categories</option>
                   <option value="Home-Theatres">Home Theatres</option>
                   <option value="Electronics">Electronics</option>
                   <option value="Airconditioners-Coolers">Airconditioners/Coolers</option>
                   <option value="Home-Appliances">Home Appliances</option>
                   <option value="Power-Solutions-Generators">Power Solutions/Generators</option>
                   <option value="Television-sets">Television-sets</option>
                   <option value="Refrigerators-Freezers">Refrigerators</option>
               </select></div> 
            </div>
        )
    }
}
export default Filter;