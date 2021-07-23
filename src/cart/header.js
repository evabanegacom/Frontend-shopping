import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { autoLogin, logout } from "../actions/actions";
import { AppBar, Typography, Toolbar, Tabs, Tab, Button, IconButton, Badge, useMediaQuery, useTheme,
Menu, MenuList, MenuItem, makeStyles, Paper } from "@material-ui/core";
import { NavLink, useHistory } from "react-router-dom";
import { GiBookAura } from 'react-icons/gi';
import { FiBookOpen } from 'react-icons/fi';
import { BsPeopleFill } from 'react-icons/bs';
import { BiLogOut, BiLogIn } from 'react-icons/bi';
import { FcContacts, FcPlus } from 'react-icons/fc';
import { FaShoppingBasket } from 'react-icons/fa';
import { RiShoppingBag2Fill, RiAccountCircleLine } from 'react-icons/ri'
import { ShoppingCart } from '@material-ui/icons';
import ejovialLogo from '../images/ejovial-logo.png';

const Header = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl ] = useState(null);
  const [value, setValue] = useState(0)
  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

  const styles = theme => ({
    // Load app bar information from the theme
    toolbar: theme.mixins.toolbar,
  });

  const newStyles = styles

  const useStyles = makeStyles(theme => ({
    icons: {
      fontSize: '1.4rem',
    },

    visual: {
      width: '100%',
      paddingLeft: 0,
    },

    smallerIcon: {
      color: '#ffffff',
      fontSize: '20px',
      fontWeight: 700,
    },

    logout: {
      color: 'red',
    },

    cartPosition: {
      margin: 'auto',
    },

    fixLogo: {
      float: 'left'
    },

    cartMargin: {
      marginLeft: '50px',
    },

    accountButton: {
      backgroundColor: 'blue',
      marginLeft: 'auto',
      '&:hover': {
        backgroundColor: '#003049'
      },
    },
  }))

  const classes = useStyles()

  const handleClickTab = (e, newValue) => {
   setValue(newValue)
  }

  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  const handleMenuOpen = e => {
   setAnchorEl(e.currentTarget)
  }

  const handleMenuClose = e => {
    setAnchorEl(null)
   }

  useEffect(() => {
    dispatch(autoLogin());
  }, [JSON.stringify(user)]);

  return (
    
    <div>
      <AppBar className={classes.visual} position='sticky'>
        <Toolbar>
        {user.loggedIn === false ? (<>
         <Link className='companyLogo' to='/'><img style={{ width: '50px', height: '64x'}} src={ejovialLogo} alt='company logo' /></Link>
            { isMatch ? (<>
              <IconButton className={classes.cartMargin} component={Link} to='/cart' aria-label='show cart items' color='inherit'>
                    <Badge badgeContent={cart.length} color='secondary'>
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
              <Button color='secondary' aria-controls='simple-menu' aria-haspopup={true} onClick={handleMenuOpen} className={classes.accountButton} variant='contained'><p className='nameOfUser'>Menu</p></Button>
              </>

            ) : (<>
              <IconButton className={classes.cartMargin} component={Link} to='/cart' aria-label='show cart items' color='inherit'>
                    <Badge badgeContent={cart.length} color='secondary'>
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
              <Tabs onChange={handleClickTab} indicatorColor='secondary' value={value}>
              <Tab icon={<Link to='/SignUp'><RiAccountCircleLine className={classes.smallerIcon}/></Link> } disableRipple label={<Link style={{ textDecoration: 'none', color: 'white', cursor: 'pointer'}} to='/SignUp'>SignUp</Link>} />

              <Tab icon={<Link to='/login'><BiLogIn className={classes.smallerIcon} /></Link> } label={<Link style={{ textDecoration: 'none', color: 'white'}} to='/login'>Login</Link>}/>

              <Tab icon={<Link to='/contact'><FcContacts/></Link>} label={<Link style={{ textDecoration: 'none', color: 'white'}} to='/contact'>Contact Us</Link>}/>

              <Tab icon={<Link to='/products'><FaShoppingBasket className={classes.smallerIcon}/></Link> } label={<NavLink to="/products" style={{ textDecoration: 'none', color: 'white', fontWeight: 700}} >Products</NavLink>} />

            </Tabs>

            <Button color='secondary' aria-controls='simple-menu' aria-haspopup={true} onClick={handleMenuOpen} className={classes.accountButton} variant='contained'><p className='nameOfUser'>Menu</p></Button>
             
            </>)}
            
            
            </>
        ) : (
          <>
          
          <Link className='companyLogo' to='/'><img style={{ width: '50px', height: '64x'}} src={ejovialLogo} alt='company logo' /></Link>
           { isMatch ? (<>
            <IconButton className={classes.cartPosition} component={Link} to='/cart' aria-label='show cart items' color='inherit'>
                    <Badge badgeContent={cart.length} color='secondary'>
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
            <Button color='secondary' aria-controls='simple-menu' aria-haspopup={true} onClick={handleMenuOpen} className={classes.accountButton} variant='contained'><p className='nameOfUser'>{user.user.name}</p></Button>
           </>) : (
             <>
             <IconButton className={classes.cartMargin} component={Link} to='/cart' aria-label='show cart items' color='inherit'>
                    <Badge badgeContent={cart.length} color='secondary'>
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
          <Tabs onChange={handleClickTab} indicatorColor='secondary' value={value}>
          <Tab icon={<Link onClick={handleClick} to='/'><BiLogOut className={classes.logout} /></Link> } label={<NavLink onClick={handleClick} to="/" style={{ textDecoration: 'none', color: 'white', fontWeight: 700}} >Logout</NavLink>} />

            {user.user.admin === true && <Tab icon={<Link to='/ejovial'><FcPlus style={{ fontSize: '25px', fontWeight: 700}}/></Link> } label={<Link style={{ textDecoration: 'none', color: 'white', fontWeight: 700}} to='/ejovial'>Add Product</Link>}/>}
 {user.user.admin === true && <Tab icon={<Link style={{ color: 'white', textDecoration: 'none'}} to='/customers'><BsPeopleFill style={{ fontSize: '25px', fontWeight: 700}}/></Link> } label={<Link style={{ textDecoration: 'none', color: 'white', fontWeight: 700}} to='/customers'>Customers</Link>}/>}
 <Tab icon={<Link to='/contact'><FcContacts className={classes.smallerIcon} /></Link>} label={<NavLink to="/contact" style={{ textDecoration: 'none', color: 'white', fontWeight: 700}} >Contact Us</NavLink>}/>
 <Tab icon={<Link to='/products'><FaShoppingBasket className={classes.smallerIcon}/></Link> } label={<NavLink to="/products" style={{ textDecoration: 'none', color: 'white', fontWeight: 700}} >Products</NavLink>} />
 <Tab icon={<NavLink to={`/users/${user.user.id}/orders`}><RiShoppingBag2Fill className={classes.smallerIcon} /></NavLink> } label={<NavLink to={`/users/${user.user.id}/orders`} style={{ textDecoration: 'none', color: 'white', fontWeight: 700}} >Orders</NavLink>} />

            </Tabs>
            <Button color='secondary' aria-controls='simple-menu' aria-haspopup={true} onClick={handleMenuOpen} className={classes.accountButton} variant='contained'><p className='nameOfUser'>{user.user.name}</p></Button>
             </>
           )}
            
            </>
        )}
          </Toolbar>
      </AppBar>
      {user.loggedIn === false ? 
      <Menu style={{ marginTop: '50px'}} id='simple-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem><Link style={{textDecoration: 'none', color: 'green'}} to='/'>Home</Link></MenuItem>
        <MenuItem><Link style={{textDecoration: 'none', color: 'green'}} to='/login'>signIn</Link></MenuItem>
        <MenuItem><Link style={{textDecoration: 'none', color: 'green'}} to='/products'>Products</Link></MenuItem>
        <MenuItem><Link style={{textDecoration: 'none', color: 'green'}} to='/signUp'>SignUp</Link></MenuItem>
        <MenuItem><Link style={{textDecoration: 'none', color: 'green'}} to='/contact'>Contact Us</Link></MenuItem>
      </Menu>
      : 
        <Menu style={{ marginTop: '50px'}} id='simple-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>

        <MenuItem><Link style={{textDecoration: 'none', color: 'green'}} to='/'>Home</Link></MenuItem>
        <MenuItem><Link style={{textDecoration: 'none', color: 'green'}} to='/products'>Products</Link></MenuItem>
        <MenuItem><Link style={{textDecoration: 'none', color: 'green'}} to='/contact'>Contact Us</Link></MenuItem>
        <MenuItem><Link style={{textDecoration: 'none', color: 'green'}} to={`/users/${user.user.id}/orders`}>Orders</Link></MenuItem>
        <MenuItem><Link onClick={handleClick} style={{textDecoration: 'none', color: 'green'}} to='/'>Logout</Link></MenuItem>
        {user.user.admin === true && 
        <MenuItem><Link style={{textDecoration: 'none', color: 'green'}} to='/ejovial'>Add Products</Link></MenuItem>
        }
        {user.user.admin === true && 
        <MenuItem><Link style={{textDecoration: 'none', color: 'green'}} to='/customers'>Customers</Link></MenuItem>
        }
        </Menu>
        }


      
    </div>
    
  );
};

// not logged in

{/* <p>
              <NavLink to="/signUp">Sign up</NavLink>
            </p>
            <p>
              <NavLink to="/login">Login</NavLink>
            </p> */}

export default Header;
