import useFetchData from '@/hooks/useFetchData';
import Head from "next/head";
import Link from 'next/link';
import { useState } from 'react';
import { FaHtml5 } from 'react-icons/fa6';
import { MdOutlineImageNotSupported } from "react-icons/md";
import { TbBrandNextjs } from "react-icons/tb";
import { FiDatabase } from "react-icons/fi";
import { GrDeploy } from "react-icons/gr";
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { AiOutlineGlobal } from "react-icons/ai";

export default function Home() {

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  const { alldata, loading } = useFetchData('/api/getblog');

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const indexOfLastblog = currentPage * perPage;
  const indexOfFirstblog = indexOfLastblog - perPage;
  const currentBlogs = alldata.slice(indexOfFirstblog, indexOfLastblog);

  const allblog = alldata.length;

  const publishedblogs = currentBlogs.filter(ab => ab.status === 'publish');

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  function extractFirstImageUrl(markdownContent) {
    if (!markdownContent || typeof markdownContent !== 'string') {
      return null;
    }

    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
  }

  return (
    <>
      <Head>
        <title>CodeBit | Melhores Códigos Open Source </title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="header_data_section">
        <div className="container flex flex-sb w-100">
          <div className="leftheader_info">
            <h1>Bem vindo(a) <span>CodeBit</span>. <br />
              Melhores Códigos Aberto
            </h1>
            <h3>Descubra uma vasta coleção de código aberto gratuito,
              pronto para integrar em seus projetos. Inove com facilidade,
              colabore globalmente e transforme suas ideias.</h3>
            <div className="flex gap-2">
              <a href="#publish"><button>Obter Códigos</button></a>
              <Link href='https://danieldeveloper.vercel.app/' target='_blank'><button>Contato</button></Link>
            </div>
          </div>
          <div className="rightheader_img">
            <img src="/img/layers.png" alt="code" />
          </div>
        </div>
      </section >

      <section id='publish' className="main_blog_section">
        <div className="container flex flex-sb flex-left flex-wrap">
          <div className="leftblog_sec">
            <h2>Publicações Recentes</h2>
            <div className="blogs_sec">
              {loading ? <div className='wh-100 flex flex-center mt-2 pb-5'>
                <div className="loader"></div>
              </div> : <>
                {publishedblogs.map((blog) => {
                  const firstImageUrl = extractFirstImageUrl(blog.description);
                  return <div className='blog' key={blog._id}>
                    <div className="blogimg">
                      <Link href={`/blog/${blog.slug}`}>
                        <img src={firstImageUrl || "/img/no-image.png"} alt={blog.title} />
                      </Link>
                    </div>
                    <div className="bloginfo">
                      <Link href={`/tag/${blog.tags[0]}`}>
                        <div className="blogtag">{blog.tags[0]}</div>
                      </Link>
                      <Link href={`/blog/${blog.slug}`}><h3>{blog.title}</h3></Link>
                      <p>{blog.description.slice(0, 100)}...</p>
                      <div className="blogauthor flex gap-1">
                        <div className="blogaimg">
                          <img src="/img/daniel.jpeg" alt="Author" />
                        </div>
                        <div className="flex flex-col flex left gap-05">
                          <h4>Daniel Beling</h4>
                          <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                })}
              </>

              }
            </div>
            <div className="blogpagination">
              <div className="blogpagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Back</button>
                {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map
                  (number => (
                    <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
                      {number}
                    </button>
                  ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>Next</button>
              </div>
            </div>
          </div>
          <div className="rightblog_info">
            <div className="topics_sec">
              <h2>Tópicos</h2>
              <div className="topics_list">
                <Link href='/topics/htmlcssjs'>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaHtml5 />
                    </div>
                    <h3>HTML, CSS, JavaScript</h3>
                  </div>
                </Link>
                <Link href='/topics/nextjs'>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <TbBrandNextjs />
                    </div>
                    <h3>Next Js, React Js </h3>
                  </div>
                </Link>
                <Link href='/topics/database'>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FiDatabase />
                    </div>
                    <h3>Database</h3>
                  </div>
                </Link>
                <Link href='/topics/deployment'>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <GrDeploy />
                    </div>
                    <h3>Deployment</h3>
                  </div>
                </Link>
              </div>
            </div>
            <div className="tags_sec mt-3">
              <h2>Tags</h2>
              <div className="tags_list">
                <Link href='/tag/html'>#HTML</Link>
                <Link href='/tag/css'>#CSS</Link>
                <Link href='/tag/javascript'>#JavaScript</Link>
                <Link href='/tag/tailwindcss'>#TailwindCss</Link>
                <Link href='/tag/nextjs'>#Next Js</Link>
                <Link href='/tag/reactjs'>#React Js</Link>
                <Link href='/tag/database'>#Database</Link>
                <Link href='/tag/deployment'>#Deploy</Link>
              </div>
            </div>
            <div className="letstalk_sec mt-3">
              <h2>Vamos conversar</h2>
              <div className="talk_sec">
                <h4>Quer saber como posso resolver problemas específicos do seu negócio? vamos conversar.</h4>
                <div className="social_talks flex flex-center gap-1 mt-2">
                  <Link href='https://github.com/danielbeling' target='_blank'>
                    <div className="st_icon">
                      <FaGithub />
                    </div>
                  </Link>

                  <Link href='https://danieldeveloper.vercel.app/' target='_blank'>
                    <div className="st_icon">
                      <AiOutlineGlobal />
                    </div>
                  </Link>

                  <Link href="https://www.instagram.com/danielbeling_/" target='_blank'>
                    <div className="st_icon">
                      <FaInstagram />
                    </div>
                  </Link>

                  <Link href='https://www.linkedin.com/in/daniel-beling-293146236/' target='_blank'>
                    <div className="st_icon">
                      <FaLinkedin />
                    </div>
                  </Link>

                </div>
              </div>
            </div>
          </div >
        </div >
      </section >
    </>
  );
}