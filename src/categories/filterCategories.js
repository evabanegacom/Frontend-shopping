import React, { Component } from 'react'
import '../containers/filterCss.css';

class FilterCategories extends Component {
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
            </div>
        )
    }
}
export default FilterCategories;