import gsap from 'gsap';
import { useGSAP } from '@gsap/react'

import { navLinks } from '../../constants/index.js'

const Navbar = () => {
 useGSAP(() => {
	gsap.set('nav', { backgroundColor: 'transparent' });
	
	gsap.to('nav', {
	 backgroundColor: '#00000080',
	 scrollTrigger: {
		trigger: '#hero',
		start: 'top top',
		end: 'bottom top',
		toggleActions: 'play none none reverse'
	 }
	});
 })
 
 return (
	<nav>
	 <div>
		<a href="#" className="flex items-center gap-2">
		 <img src="/images/logo.png" alt="logo" />
		 <p>Velvet Pour</p>
		</a>
		
		<ul>
		 {navLinks.map((link) => (
			<li key={link.id}>
			 <a href={`#${link.id}`}>{link.title}</a>
			</li>
		 ))}
		</ul>
	 </div>
	</nav>
 )
}
export default Navbar