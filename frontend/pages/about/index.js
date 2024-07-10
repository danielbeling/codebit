import React from 'react';
import Image from 'next/image';
import BannerDev from '@/public/img/layers.png';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedin, FaDev } from 'react-icons/fa';

function AboutSection() {
  return (
    <section id="about" className='about-section'>
      <div className="about-content">
        <div className="text-container">
          <h1 className='title'>Sobre</h1>
          <p className='text'>
            <span className='highlight'>CodeBit</span> é uma plataforma inovadora dedicada
            a fornecer uma vasta coleção de código aberto gratuito, projetada para acelerar
            a criatividade e a inovação para desenvolvedores de todos os níveis. Nosso objetivo
            é facilitar a colaboração global, permitindo que os desenvolvedores compartilhem, aprendam
            e integrem código de alta qualidade em seus próprios projetos.
          </p>
          <p className='text'>
            Na <span className='highlight'>CodeBit</span>,  acreditamos que a inovação deve ser acessível a todos.
            É por isso que nos esforçamos para criar um ambiente colaborativo onde os desenvolvedores podem explorar,
            contribuir e crescer juntos. Nossa missão é capacitar a comunidade de desenvolvedores com recursos valiosos
            que fomentem a criatividade e a inovação contínuas.
          </p>

          <h3 className='subtitle'>Developer social</h3>
          <div className="social-links">
            <Link href="https://www.instagram.com/danielbeling_/" target="_blank" passHref>
              <FaInstagram className='social-icon' />
            </Link>
            <Link href="https://github.com/danielbeling" target="_blank" passHref>
              <FaGithub className='social-icon' />
            </Link>
            <Link href="https://www.linkedin.com/in/daniel-beling-293146236/" target="_blank" passHref>
              <FaLinkedin className='social-icon' />
            </Link>
            <Link href="https://danieldeveloper.vercel.app/" target="_blank" passHref>
              <FaDev className='social-icon' />
            </Link>
          </div>
        </div>
        <div className="image-container">
          <Image
            src={BannerDev}
            alt='Banner Development'
            width={350}
            height={350}
            quality='95'
            priority={true}
            className='image'
          />
        </div>
      </div>
    </section>
  )
}

export default AboutSection;
