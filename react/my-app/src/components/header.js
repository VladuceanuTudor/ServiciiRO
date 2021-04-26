import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';


const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		flexGrow: 1,
	},
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));





const refreshToken = localStorage.getItem('refresh_token');

function HideOnScroll(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({ target: window ? window() : undefined });
  
	return (
	  <Slide appear={false} direction="down" in={!trigger}>
		{children}
	  </Slide>
	);
  }

function Header(props) {
	const classes = useStyles();
	let history = useHistory();
	const [data, setData] = useState({ search: '' });
	// const [auth, setAuth] = React.useState(true);
  	const [anchorEl, setAnchorEl] = React.useState(null);
  	const open = Boolean(anchorEl);

  	// const handleChange = (event) => {
    // setAuth(event.target.checked);
  	// };

  	const handleMenu = (event) => {
     setAnchorEl(event.currentTarget);
 	};

	// const handleClick = (event) => {
	// 	setAnchorEl(event.currentTarget);
	// };
	
	const handleClose = () => {
		setAnchorEl(null);
	};

	// const goSearch = (e) => {
	// 	history.push({
	// 		pathname: '/search/',
	// 		search: '?search=' + data.search,
	// 	});
	// 	window.location.reload();
	// };
	if (refreshToken != null) {
	return ( 
		<React.Fragment>
			<CssBaseline />
			<HideOnScroll {...props}>
			<AppBar
				position="static"
				style={{ backgroundColor: "#383038"}}
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
					>
						<Link
							component={NavLink}
							to="/"
							underline="none"
							style={{ color: "#afbf9c", fontFamily: "verdana", fontSize: "140%"}}
						>
							Servicii.ro
						</Link>
					</Typography>
					{/* <div>
					<IconButton
						aria-label="more"
						aria-controls="long-menu"
						aria-haspopup="true"
						onClick={handleClick}
					>
						<MoreVertIcon />
					</IconButton>
					<Menu
						id="long-menu"
						anchorEl={anchorEl}
						keepMounted
						open={open}
						onClose={handleClose}
						PaperProps={{
						style: {
							maxHeight: ITEM_HEIGHT * 4.5,
							width: '20ch',
						},
						}}
					>
						{options.map((option) => (
						<MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
							{option}
						</MenuItem>
						))}
					</Menu>
					</div>
					<SearchBar 
						style={{ marginRight: "95px"}}
						placeholder="Cauta"
						value={data.search}
						onChange={(newValue) => setData({ search: newValue })}
						onRequestSearch={() => goSearch(data.search)}
					/>*/}
					
					<div> 
					<IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} className={classes.link}
						component={NavLink}
						to="/admin" > Contul meu </MenuItem>
                <MenuItem onClick={handleClose} className={classes.link}
						component={NavLink}
						to="/logout" > Logout </MenuItem>
              </Menu>
            </div>
          
					{/* <Button
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/admin"
					>
						Contul meu
					</Button>
					<Button
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/logout"
					>
						Logout
					</Button> */}
				</Toolbar>
			</AppBar>
			</HideOnScroll>
		</React.Fragment>
		 );} else {
			 return(
<React.Fragment>
			<CssBaseline />
			<HideOnScroll {...props}>
			<AppBar
				position="static"
				color="default"
				elevation={0}
				className={classes.appBar}
				style={{ backgroundColor: "#383038"}}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
					>
						<Link
							component={NavLink}
							to="/"
							underline="none"
							color="textPrimary"
							style={{ color: "#afbf9c", fontFamily: "verdana", fontSize: "140%"}}
						>
							Servicii.ro
						</Link>
					</Typography>

					{/* <SearchBar
						value={data.search}
						onChange={(newValue) => setData({ search: newValue })}
						onRequestSearch={() => goSearch(data.search)}
					/> */}
					

					<nav>
						<Link
							style={{ color: "white"}}
							href="#"
							className={classes.link}
							component={NavLink}
							to="/register"
						>
							Register
						</Link>
					</nav>
					<Button
						href="#"
						style={{ color: "white"}}
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/login"
					>
						Login
					</Button>
				</Toolbar>
			</AppBar>
			</HideOnScroll>
		</React.Fragment>
		 );}
}

export default Header;
