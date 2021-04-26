import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import { judete, category } from '../posts/data/filters';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Create() {
	
	function slugify(string) {
		const a =
			'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
		const b =
			'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
		const p = new RegExp(a.split('').join('|'), 'g');

		return string
			.toString()
			.toLowerCase()
			.replace(/\s+/g, '-') // Replace spaces with -
			.replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
			.replace(/&/g, '-and-') // Replace & with 'and'
			.replace(/[^\w\-]+/g, '') // Remove all non-word characters
			.replace(/\-\-+/g, '-') // Replace multiple - with single -
			.replace(/^-+/, '') // Trim - from start of text
			.replace(/-+$/, ''); // Trim - from end of text
	}
	//
	const [anchorEl, setAnchorEl] = React.useState(null);
	const ITEM_HEIGHT = 48;

	function verify (e) {
		if( e == null) {
			return false} else if (anchorEl.id == "jud") {
				return true} else return false;
			
	}
	function verify1 (e) {
		if( e == null) {
			return false} else if (anchorEl.id == "cat") {
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
		updateFormData({
			...postData,
			['judet']: e,
		});
	  };

	function handleCategoryC (e)  {
		updateFormData({
			...postData,
			['category']: e,
		});
	  };
	const history = useHistory();
	const initialFormData = Object.freeze({
		title: '',
		slug: '',
		category: '',
		descriere: '',
		email: '',
		judet: '',
		locatie: '',
		nrtel: '',
	});

	const [postData, updateFormData] = useState(initialFormData);
	const [postimage, setPostImage] = useState(null);

	const handleChange = (e) => {
		if ([e.target.name] == 'image') {
			setPostImage({
				image: e.target.files,
			});
			console.log(e.target.files);
		}
		if ([e.target.name] == 'title') {
			updateFormData({
				...postData,
				[e.target.name]: e.target.value.trim(),
				['slug']: slugify(e.target.value.trim()),
			});
		} else {
			updateFormData({
				...postData,
				[e.target.name]: e.target.value.trim(),
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('title', postData.title);
		formData.append('slug', postData.slug);
		formData.append('author', 1);
		formData.append('category', postData.category);
		formData.append('descriere', postData.descriere);
		formData.append('email', postData.email);
		formData.append('judet', postData.judet);
		formData.append('locatie', postData.locatie);
		formData.append('nrtel', postData.nrtel);
		formData.append('image', postimage.image[0]);
		axiosInstance.post(`admin/create/`, formData);
		console.log(formData);
		history.push({
			pathname: '/admin/',
		});
		window.location.reload();
	};

	// const config = { headers: { 'Content-Type': 'multipart/form-data' } };
	// const URL = 'http://127.0.0.1:8000/api/admin/creats/';
	// let formData = new FormData();
	// formData.append('title', postData.title);
	// formData.append('slug', postData.slug);
	// formData.append('author', 1);
	// formData.append('excerpt', postData.excerpt);
	// formData.append('content', postData.content);
	// formData.append('image', postimage.image[0]);
	// axios
	// 	.post(URL, formData, config)
	// 	.then((res) => {
	// 		console.log(res.data);
	// 	})
	// 	.catch((err) => console.log(err));

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Posteaza un nou serviciu
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="title"
								label="Post Title"
								name="title"
								autoComplete="title"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
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
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="descriere"
								label="descriere"
								name="descriere"
								autoComplete="descriere"
								onChange={handleChange}
								multiline
								rows={4}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="email"
								name="email"
								autoComplete="email"
								onChange={handleChange}
								multiline
								rows={4}
							/>
						</Grid>
						<Grid item xs={12}>
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
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="locatie"
								label="locatie"
								name="locatie"
								autoComplete="locatie"
								onChange={handleChange}
								multiline
								rows={4}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="nrtel"
								label="nrtel"
								name="nrtel"
								autoComplete="nrtel"
								onChange={handleChange}
								multiline
								rows={4}
							/>
						</Grid>
						<h8> Incarca o poza:   </h8>
						<br />
						<input
							accept="image/*"
							className={classes.input}
							id="post-image"
							onChange={handleChange}
							name="image"
							type="file"
						/>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Posteaza serviciul
					</Button>
				</form>
			</div>
		</Container>
	);
}