import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useHistory, useParams } from 'react-router-dom';
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
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const ITEM_HEIGHT = 48;

export default function Create() {
	const history = useHistory();
	const { id } = useParams();
	const initialFormData = Object.freeze({
		id: '',
		title: '',
		slug: '',
		category: '',
		descriere: '',
		email: '',
		judet: '',
		locatie: '',
		nrtel: '',
	});

	const [formData, updateFormData] = useState(initialFormData);
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
		updateFormData({
			...formData,
			['judet']: e,
		});
	  };

	function handleCategoryC (e)  {
		updateFormData({
			...formData,
			['category']: e,
		});
	  };

	useEffect(() => {
		axiosInstance.get('admin/edit/postdetail/' + id).then((res) => {
			updateFormData({
				...formData,
				['title']: res.data.title,
				['slug']: res.data.slug,
				['category']: res.data.category,
				['descriere']: res.data.descriere,
				['email']: res.data.email,
				['judet']: res.data.judet,
				['locatie']: res.data.locatie,
				['nrtel']: res.data.nrtel,
			});
			console.log(res.data);
		});
	}, [updateFormData]);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance.put(`admin/edit/` + id + '/', {
			title: formData.title,
			author: 1,
			slug: formData.slug,
			category: formData.category,
			descriere: formData.descriere,
			email: formData.email,
			judet: formData.judet,
			locatie: formData.locatie,
			nrtel: formData.nrtel,
		});
		history.push({
			pathname: '/admin/',
		});
		window.location.reload();
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="sm">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Editeaza postarea
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="title"
								label="Titlul"
								name="title"
								autoComplete="title"
								value={formData.title}
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
							{/* <TextField
								variant="outlined"
								required
								fullWidth
								id="category"
								label="category"
								name="category"
								autoComplete="category"
								value={formData.category}
								onChange={handleChange}
								multiline
								rows={8}
							/> */}
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
								value={formData.descriere}
								onChange={handleChange}
								multiline
								rows={8}
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
								value={formData.email}
								onChange={handleChange}
								multiline
								rows={8}
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
							{/* <TextField
								variant="outlined"
								required
								fullWidth
								id="judet"
								label="judet"
								name="judet"
								autoComplete="judet"
								value={formData.judet}
								onChange={handleChange}
								multiline
								rows={8}
							/> */}
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
								value={formData.locatie}
								onChange={handleChange}
								multiline
								rows={8}
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
								value={formData.nrtel}
								onChange={handleChange}
								multiline
								rows={8}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Aplica schimbarile
					</Button>
				</form>
			</div>
		</Container>
	);
}
