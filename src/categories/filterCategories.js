import React, { Component } from 'react'
import '../containers/filterCss.css';
import { Box, Grid, Button, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

const FilterCategories = ({sorting, sortProducts}) =>  {

    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
        return (
            <div className='theFilter'>
               <div className='filterOrder'>
                 <select value={sorting} onChange={sortProducts}>
                   <option>LATEST</option>
                   <option value="lowest">Lowest</option>
                   <option value="highest">Highest</option>
               </select>
               </div>
               <div className='filterInput'>
      <Button aria-controls="simple-menu" aria-haspopup="true" className='dropdownButton' onClick={handleClick}>
        More options
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><Link className='categoryLinks' to='/home-theatre'>Home Theatres</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link className='categoryLinks' to='/home-appliance'>Home Appliances</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link className='categoryLinks' to='/home-theatre'>Television sets</Link></MenuItem>
      </Menu>
    </div>
            </div>
        )
    }

export default FilterCategories;