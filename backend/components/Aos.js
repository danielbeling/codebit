import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS file for AOS

export default function Aos({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 600,
      offset: 200,
      easing: 'ease',
      once: true,
    });
  }, []);

  return <div>{children}</div>;
}
