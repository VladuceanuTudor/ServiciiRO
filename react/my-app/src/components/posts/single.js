import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';
//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

export default function Post() {
	const { slug } = useParams();
	const classes = useStyles();

	const [data, setData] = useState({
		posts: [],
	});

	useEffect(() => {
		axiosInstance.get('post/' + slug).then((res) => {
			setData({
				posts: res.data,
			});
			console.log(res.data);
		});
	}, [setData]);

	return (
		<Container component="main" maxWidth="md">
			<CssBaseline />
			<div className={classes.paper}> </div>{' '}
			<div className={classes.heroContent}>
				<Container maxWidth="md">
				
					<Container maxWidth="md">
					<img class="img" src={data.posts.image} ></img>
					</Container>
					<div style={{ backgroundColor: "#DEDADE", borderRadius: "5px"}}>
					<Typography
						
						component="h2"
						variant="h3"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						{data.posts.title}{' '}
					</Typography>{'Descriere: '}
					<div > 
					<Typography
						style={{ margin: "5px"}}
						variant="h6"
						align="left"
						color="textPrimary"
						gutterBottom
						
						
					>
						{data.posts.descriere}
					</Typography></div></div><div style={{backgroundColor: "#DEDADE", borderRadius: "5px"}}>
					<div style={{ margin: "5px"}}>
					<b>{'INFORMATII DE CONTACT :'}</b>
					
					<Typography
						
						component="h5"
						align="left"
						color="textPrimary"
						gutterBottom
					>
						{'Jud. '}{data.posts.judet}{'  Localitate: '}{data.posts.locatie}
					</Typography>{' '}
					<Typography
						
						component="h5"
						align="left"
						color="textPrimary"
						gutterBottom
					>
						{'Email: '}{data.posts.email}
					</Typography>{' '}
					<Typography
						
						component="h5"
						align="left"
						color="textPrimary"
						gutterBottom
					>
						{'Numar de telefon: '}{data.posts.nrtel}
					</Typography>{' '}
					</div></div>
				</Container>{' '}
			</div>{' '}
		</Container>
	);
}
