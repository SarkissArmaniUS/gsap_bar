import gsap from 'gsap';
// import { useGSAP } from '@gsap/react'
// npm install gsap @gsap/react
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Cocktails from './components/Cocktails.jsx'
import About from './components/About.jsx'
import Art from './components/Art.jsx'
import Menu from './components/Menu.jsx'
import Contact from './components/Contact.jsx'

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
 return (
	<main>
	 <Navbar />
	 <Hero />
	 <Cocktails />
	 <About />
	 <Art />
   <Menu />
	 <Contact />
	</main>
 )
}

export default App