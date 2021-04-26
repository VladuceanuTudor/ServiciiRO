import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import SearchBar from 'material-ui-search-bar';
import { useHistory } from 'react-router-dom';
import { judete, category } from './data/filters';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';


import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import LocationOnIcon from '@material-ui/icons/LocationOn';


const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));




const ITEM_HEIGHT = 48;

const Posts = (props) => {
	
    let history = useHistory();
	const [data, setData] = useState({ search: '' });
	const [anchorEl, setAnchorEl] = React.useState(null);

	function verify (e) {
		if( e === null) {
			return false} else if (anchorEl.id === "jud") {
				return true} else return false;
			
	}
	function verify1 (e) {
		if( e === null) {
			return false} else if (anchorEl.id === "cat") {
				return true} else return false;
			
	}

  	const open = verify(anchorEl);
	const open1 = verify1(anchorEl);
	
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	
	const handleClose = () => {
		setAnchorEl(null);
	};

	function handleCategoryJ (e)  {
		console.log(e);
		history.push({
			pathname: '/filtruj/',
			search: '?search=' + e,
		});
		window.location.reload();
	  };

	function handleCategoryC (e)  {
		console.log(e);
		history.push({
			pathname: '/filtruc/',
			search: '?search=' + e,
		});
		window.location.reload();
	  };


	const goSearch = (e) => {
		history.push({
			pathname: '/search/',
			search: '?search=' + e,
		});
		window.location.reload();
	};
	const { posts } = props;
	const classes = useStyles();
	if (!posts || posts.length === 0) return <p>Momentan nu exista postari.</p>;
	return (
		<React.Fragment >
			
					<SearchBar
						placeholder="Cauta"
						style={{ margin: "-8px 12px 12px", backgroundColor: "#ECECEC"}}
						value={data.search}
						onChange={(newValue) => setData({ search: newValue })}
						onRequestSearch={() => goSearch(data.search)}
					/>
				
					<div>
					{/* <FiltruJudete 
						style={{ backgroundColor: "#ECECEC"}}
					/> */}
					<IconButton
						id="jud"
						aria-label="more"
						aria-controls="long-menu"
						aria-haspopup="true"
						onClick={handleClick}
					>
						<LocationOnIcon />
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
						{judete.map((option) => (
						<MenuItem 
							key={option.name} 
							selected={option === 'Toata tara'} 
							onClick={() =>{
            					handleClose()
            					handleCategoryJ(option.name)}}  >
						{option.name}
						</MenuItem>
						))}
					</Menu>
					<IconButton
						id="cat"
						aria-label="more"
						aria-controls="long-menu"
						aria-haspopup="true"
						onClick={handleClick}
					>
						<BusinessCenterIcon />
					</IconButton>
					<Menu
						id="long-menu"
						anchorEl={anchorEl}
						keepMounted
						open={open1}
						onClose={handleClose}
						PaperProps={{
						style: {
							maxHeight: ITEM_HEIGHT * 4.5,
							width: '20ch',
						},
						}}
					>
						{category.map((option) => (
						<MenuItem 
							key={option.name} 
							selected={option === 'Toata tara'} 
							onClick={() =>{
            					handleClose()
            					handleCategoryC(option.name)}}  >
						{option.name}
						</MenuItem>
						))}
					</Menu>
					</div>
				<Container maxWidth="md" component="main">
					<Grid container spacing={5} alignItems="flex-end">
					{posts.map((post) => {
						return (
							// Enterprise card is full width at sm breakpoint
							<Grid item key={post.id} xs={12} md={4}>
								<Card className={classes.card}>
									<Link
										color="textPrimary"
										href={'post/' + post.slug}
										className={classes.link}
									>
										<CardMedia
											className={classes.cardMedia}
											image={post.image}
											title="Image title"
										/>
									</Link>
									<CardContent className={classes.cardContent}>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											className={classes.postTitle}
										>
											{post.title.substr(0, 50)}...
										</Typography>
										<div className={classes.postText}>
											<Typography color="textSecondary">
												{post.descriere.substr(0, 40)}...
											</Typography>
										</div>
										<Link
										color="textPrimary"
										href={'https://www.google.com/maps/place/' + post.locatie}
										className={classes.link}
									>Locatie pe harta
									</Link>
									</CardContent>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</React.Fragment>
	);
};
export default Posts;
