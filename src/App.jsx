import React from "react";
import CustomCursor from "./components/CustomCursor"
import Navbar from "./components/Navbar";
import ParticlesBackground from "./components/ParticlesBackground";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Testimonial from "./sections/Testimonial";
import IntroAnimation from "./components/IntroAnimation";



export default function App(){
  const [introDone, setIntroDone] = React.useState(false);
  return(
    <>
    {!introDone && <IntroAnimation onFinish={()=> setIntroDone(true)}/>}
{introDone && (

<div className="relative gradient text-white">
  <CustomCursor/>
  {/* <ParticlesBackground/> */}

  <Navbar/>
  <Home/>
  <About/>
  <Skills/>
  <Projects/>
  <Experience/>
  <Testimonial/>
  <Contact/>
  <Footer/>

</div>
)}
</>
  )
}