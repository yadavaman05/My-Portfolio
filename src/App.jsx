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
import EducationCertifications from "./sections/EducationCertifications";
import IntroAnimation from "./components/IntroAnimation";
import Chatbot from "./components/Chatbot";



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
  <Experience/>
  <Projects/>
  <EducationCertifications/>
  <Contact/>
  <Footer/>
  <Chatbot/>

</div>
)}
</>
  )
}