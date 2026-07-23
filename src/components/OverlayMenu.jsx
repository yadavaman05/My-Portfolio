import {motion, AnimatePresence} from "framer-motion"
import { FiX } from "react-icons/fi";



export default function OverlayMenu({ isOpen, onClose }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const origin = isMobile ? "95% 8%" : "50% 8%";

  return(
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 flex items-center justify-center z-50"

          initial = {{clipPath: `circle(0% at ${origin})`}}
          animate = {{clipPath: `circle(150% at ${origin})`}}
          exit = {{clipPath: `circle(0% at ${origin})`}}
          transition = {{duration : 0.7 , ease: [0.4, 0, 0.2, 1]}}
          style = {{backgroundColor: "rgba(0, 0, 0, 0.95)"}}

        >
         <button onClick= {onClose}
         className="absolute top-6 right-6 text-white text-3xl" 
         aria-level="Close Menu">

          <FiX />
         </button>
         <ul className="space-y-6 text-center">
          {[
            { label: "Home", href: "#home" },
            { label: "About", href: "#about" },
            { label: "Skills", href: "#skills" },
            { label: "Experience", href: "#experience" },
            { label: "Projects", href: "#projects" },
            { label: "Education & Certs", href: "#education-certifications" },
            { label: "Contact", href: "#contact" },
          ].map((item, index)=>(
            <motion.li key={item.label}
            initial = {{opacity: 0 ,y:20}}
            animate = {{opacity: 1, y:0}}
            transition = {{delay: 0.3 + index *0.1}}

          >
            <a href={item.href}
            onClick = {onClose}
            className="text-4xl text-white font-semibold hover:text-[#00bf8f] transition-colors duration-300"
                >
              {item.label}
            </a>
            </motion.li>
          ))}
         </ul>

        </motion.div>
      )}


    </AnimatePresence>
  )
}