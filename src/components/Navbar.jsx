import gsap from 'gsap';
import { useGSAP } from '@gsap/react'
import { useRef } from 'react';

import { navLinks } from '../../constants/index.js'

const Navbar = () => {
	const navRef = useRef(null);

	useGSAP(() => {
		gsap.fromTo(navRef.current,
			{ backgroundColor: 'rgba(0,0,0,0)' },
			{
				backgroundColor: 'rgba(0,0,0,0.5)',
				scrollTrigger: {
					trigger: '#hero',
					start: 'top top',
					end: 'bottom top',
					toggleActions: 'play none none reverse',
				},
			});
	}, { scope: navRef });

 return (
	 <header>
		<nav ref={navRef}>
	 		<div>
				<a href="#" className="flex items-center gap-2">
		 		<img src="/images/logo.png" alt="logo" />
		 		<p>Velvet Pour</p>
				</a>
		
				<ul>
		 			{navLinks.map((link) => (<li key={link.id}>
			 		<a href={`#${link.id}`}>{link.title}</a>
					</li>
		 			))}
				</ul>
	 		</div>
		</nav>
	 </header>
 )
}
export default Navbar