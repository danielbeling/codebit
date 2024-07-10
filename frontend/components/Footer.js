import Link from 'next/link';

export default function Footer() {
  return <>
    <div className="footer">
      <div className="container flex flex-sb flex-wrap flex-left">
        <div className="footer_logo">
          <Link href="/" passHref>

            <h2>
              <span style={{ color: "#6D28D9" }}>&lt;</span>
              Code
              <span style={{ color: "#6D28D9" }}>/</span>
              Bit
              <span style={{ color: "#6D28D9" }}>&gt;</span>
            </h2>

          </Link>
          <h4>&copy; 2024 Todos os Direitos Reservados.</h4>
          <h3>Codificado por <span>Daniel Beling</span></h3>
        </div>
        <div className="q_links">
          <h3>Empresa</h3>
          <ul>
            <li><Link href='/'>Blogs</Link></li>
            <li><Link href='/about'>Sobre</Link></li>
            <li><Link href='/https://danieldeveloper.vercel.app/'>Contato</Link></li>
          </ul>
        </div>
        <div className="q_links">
          <h3>Assunto Jurídico</h3>
          <ul>

            <li><Link href='/privacy'>Politica de Privacidade</Link></li>
          </ul>
        </div>
        <div className="q_links">
          <h3>Mídias Social</h3>
          <ul>
            <li><Link href='https://github.com/danielbeling' target='_blank'>GitHub</Link></li>
            <li><Link href='https://www.instagram.com/danielbeling_/' target='_blank'>Instagram</Link></li>
            <li><Link href='https://danieldeveloper.vercel.app/' target='_blank'>Developer website</Link></li>
          </ul>
        </div>
      </div>
    </div>
  </>
}