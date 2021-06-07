import React from 'react'; 
import { 
Nav, 
NavLink, 
Bars, 
NavMenu, 
NavBtn, 
NavBtnLink, 
} from './NavbarElements'; 

const Navbar = () => { 
return ( 
	<> 
	<Nav> 
		<Bars /> 

		<NavMenu> 
		<NavLink to='/' activeStyle> 
			Home 
		</NavLink> 
		<NavLink to='/about' activeStyle> 
			About 
		</NavLink> 
		<NavLink to='/annual' activeStyle> 
			Annual Report 
		</NavLink> 
		<NavLink to='/team' activeStyle> 
			Teams 
		</NavLink> 
		<NavLink to='/blogs' activeStyle> 
			Blogs 
		</NavLink> 
		<NavLink to='/sign-up' activeStyle> 
			Sign Up 
		</NavLink> 
		{/* Second Nav */} 
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */} 
		</NavMenu> 
		
	</Nav> 
	</> 
); 
}; 

export default Navbar;
