import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';

import { FaHtml5 } from 'react-icons/fa6';
import { MdOutlineImageNotSupported } from "react-icons/md";
import { TbBrandNextjs } from "react-icons/tb";
import { FiDatabase } from "react-icons/fi";
import { GrDeploy } from "react-icons/gr";
import { FaGithub, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { AiOutlineGlobal } from "react-icons/ai";


export default function BlogPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (slug) {
      axios.get(`/api/getblog?slug=${slug}`)
        .then(res => {
          const alldata = res.data;
          setBlog(alldata);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erro ao buscar o blog', error);
          setLoading(false);
        });
    }
  }, [slug]);

  const Code = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');

    const handleCopy = () => {
      if (children && typeof children === 'string') {
        navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      }
    };

    if (inline) {
      return <code>{children}</code>;
    } else if (match) {
      return (
        <div style={{ position: 'relative' }}>
          <SyntaxHighlighter
            style={a11yDark}
            language={match[1]}
            PreTag='pre'
            {...props}
            codeTagProps={{ style: { padding: '0', borderRadius: '5px', overflowX: 'auto', whiteSpace: 'pre-wrap' } }}
          >
            {children}
          </SyntaxHighlighter>
          <button
            style={{
              position: 'absolute', top: '0', right: '0', zIndex: '1',
              background: '#3d3d3d', color: '#fff', padding: '10px'
            }}
            onClick={handleCopy}
          >
            {copied ? 'Copied' : 'Copy code'}
          </button>
        </div>
      );
    } else {
      return (
        <code className='md-post-code' {...props}>{children}</code>
      );
    }
  };

  return (
    <div className="slugpage">
      <div className="container">
        <div className="topslug_titles">
          <h1 className='slugtitle'>
            {loading ? 'Carregando...' : blog && blog[0]?.title}
          </h1>
          <h5>
            Por <span>Daniel Beling</span>. Publicado em {' '}
            {loading ? 'Carregando...' : blog && blog[0]?.blogcategory}.{' '}
            {blog && new Date(blog[0]?.createdAt).toLocaleDateString('pt-BR', { month: 'long', day: 'numeric', year: 'numeric' })}
          </h5>
        </div>
        <div className="flex flex-sb flex-left pb-5 flex-wrap">
          <div className="leftblog_data_markdown">
            {loading ? (
              <div className='wh-100 flex flex-center mt-3'>
                <div className="loader"></div>
              </div>
            ) : (
              <div className="w-100 blogcontent">
                {blog && blog[0]?.description ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{ code: Code }}
                  >
                    {blog[0].description}
                  </ReactMarkdown>
                ) : (
                  <p>The blog content could not be loaded.</p>
                )}
              </div>
            )}
          </div>
          <div className="rightslug_data">
            <div className="slug_profile_info">
              <div className="slugprofile_sec">
                <div className="profile_imgbg"></div>
                <div className="slug_profile_img">
                  <img src="/img/daniel.jpeg" alt="Author" />
                </div>
              </div>
              <h3>Daniel Beling</h3>
              <h4>WebSite Developer</h4>
              <div className="social_talks flex flex-center gap-1 mt-2">
                <div className="st_icon">
                  <Link href="https://github.com/danielbeling" target="_blank">
                    <FaGithub />
                  </Link>
                </div>
                <div className="st_icon">
                  <Link href="https://danieldeveloper.vercel.app/" target="_blank">
                    <AiOutlineGlobal />
                  </Link>

                </div>
                <div className="st_icon">
                  <Link href="https://www.instagram.com/danielbeling_/" target="_blank">
                    <FaInstagram />
                  </Link>

                </div>
                <div className="st_icon">
                  <Link href='https://wa.me/5569993758880' target='_blank'><FaWhatsapp /></Link>
                </div>
              </div>
            </div>
            <div className="topics_sec">
              <h2>Topicos</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
}
