// dependancies
import React from 'react'
import { Grid, Typography, Divider } from '@material-ui/core'
import { FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
// file imports
import AboutStyles from './AboutStyles'

const About = () => {
	// classes and queries
	const classes = AboutStyles();
	return (
		<Grid id="about" container>
			{/* Title */}
			<Grid className={classes.title} item xs={12}>
				<br />
				<Typography variant="h4">Curious To Know  Me </Typography>
				<br /><br />
			</Grid>
			<Grid item xs={1}></Grid>
			

			{/* Text */}
			<Grid item xs={10} md={5}>
				<br />
				<Typography variant="h6" className={classes.subTitle} display="inline">My name is Rajendra kumar and I am a Computer Science and Engineering student at IIT tirupati</Typography>
				<div style={{ paddingBottom: "2%" }} />
				<Typography variant="body1">
				    Currently, I am exploring the computer science field. Logical problem solving has always appealed to me and this explains my interests in mathematics, programming and computing in general. 
				    Previously, I have worked on various web development projects
                    and continousely i am developing more tools which help in real life of human. Some on my hobbies are playing sports,
                    farming and exploring different games.
				</Typography>
				<br />
				<Divider />
				<br />
             
				
			</Grid>
		
			
				<Grid item xs={1}></Grid>
			   <Grid item xs={10} md={5}>
				<Typography variant="h4"><b>Get in Touch!</b></Typography>
				<Divider></Divider>
				<br />
				<MdEmail />&nbsp;
				<Typography display="inline"><b> Email:</b></Typography>
				<a rel="noopener noreferrer" target="_blank" className={classes.contact} href="mailto:cs19b034@iittp.ac.in">
					<Typography display="inline">cs19b034@iittp.ac.in</Typography>
				</a>
				<div /><br />
				<FaPhone />&nbsp;
				<Typography display="inline"><b> Phone:</b></Typography>
				<a rel="noopener noreferrer" target="_blank" className={classes.contact} href="+919772694734">
					<Typography className={classes.contact}  display="inline">+919772694734</Typography>
				</a>
				<div /><br />
				<FaGithub />&nbsp;
				<Typography display="inline"><b> Github:</b></Typography>
				<a rel="noopener noreferrer" target="_blank" className={classes.contact} href="https://github.com/raj2770">
					<Typography  display="inline"> github.com/raj2770</Typography>
				</a>
				<div /><br />
				<FaLinkedin />&nbsp;
				<Typography display="inline"><b> LinkedIn:</b></Typography>
				<a rel="noopener noreferrer" target="_blank" className={classes.contact} href="https://www.linkedin.com/in/rajendra-kumar-3313211a0/">
					<Typography  display="inline"> linkedin.com/in/rajendrakumar</Typography>
				</a>
				<br /><br /><br />
			</Grid>
			<Grid item xs={1}></Grid>
		
			<Grid item xs={12}>
				<div style={{ paddingBottom: "7%" }} />
			</Grid>
		</Grid>
	)
}

export default About;