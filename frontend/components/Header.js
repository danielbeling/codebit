import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { IoSearchSharp, IoMoonSharp, IoSearch } from 'react-icons/io5';
import { HiBars3BottomRight } from 'react-icons/hi2';
import { FaXmark } from 'react-icons/fa6';
import { LuSun } from 'react-icons/lu';
import useFetchData from '@/hooks/useFetchData';

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [asideOpen, setAsideOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', true);
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', false);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const { alldata, loading } = useFetchData('/api/getblog');
  const publishedBlogs = alldata?.filter(ab => ab.status === 'publish') || [];
  const filteredBlogs = searchQuery.trim() === '' ? publishedBlogs : publishedBlogs.filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()));

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
      <div className="header_sec">
        <div className="container header">
          <div className="logo">
            <Link href="/" passHref>
              <h1>
                <span style={{ color: "#6D28D9" }}>&lt;</span>
                Code
                <span style={{ color: "#6D28D9" }}>/</span>
                Bit
                <span style={{ color: "#6D28D9" }}>&gt;</span>
              </h1>
            </Link>
          </div>
          <div className="searchbar">
            <IoSearchSharp />
            <input onClick={() => setSearchOpen(!searchOpen)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="search" placeholder="Pesquisar códigos " />
          </div>
          <div className="nav_list_dark">
            <ul>
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/about">Sobre</Link></li>
              <li><Link href='https://danieldeveloper.vercel.app/' target='_blank'>Contato</Link></li>
            </ul>
            <div className="navlist_mobile_ul">
              <button onClick={() => setSearchOpen(!searchOpen)}><IoSearch /></button>
              <button onClick={toggleDarkMode}>{darkMode ? <LuSun /> : <IoMoonSharp />}</button>
              <button onClick={() => setAsideOpen(true)}><HiBars3BottomRight /></button>
            </div>
            <div className="darkmode">
              <label className="switch">
                <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                <span className="slider_header"></span>
              </label>
            </div>
          </div>
        </div>
        <div className={`search_click ${searchOpen ? 'open' : ''}`}>
          <div className="searchab_input">
            <IoSearchSharp />
            <input type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar códigos" />
          </div>
          <div className="search_data text-center">
            {loading ? <div className='wh_100 flex flex-center mt-2 pb-5'>
              <div className="loader"></div>
            </div> : <>
              {searchQuery ? <>
                {filteredBlogs.slice(0, 3).map((blog) => {
                  const firstImageUrl = extractFirstImageUrl(blog.description);
                  return <div className='blog' key={blog._id} onClick={() => setSearchOpen(false)}>
                    <div className="bloginfo">
                      <Link href={`/blog/${blog.slug}`} className='seach_result'>
                        <h3>{blog.slug}</h3>
                        <img src={firstImageUrl || "/img/no-image.png"} alt={blog.title} style={{ width: '500px', height: '200px', borderRadius: '10px' }} />
                      </Link>
                    </div>
                  </div>
                })}
              </> : <div>Nenhum resultado encontrado.</div>}
            </>
            }
          </div>
          <div className="exit_search" onClick={() => setSearchOpen(false)}>
            <div onClick={() => setAsideOpen(false)}><FaXmark /></div>
            <h4>ESC</h4>
          </div>
        </div>
        <div className={asideOpen ? 'navlist_mobile open' : 'navlist_mobile'}>
          <div className="navlist_m_title flex flex-sb">
            <h1>
              <span style={{ color: "#6D28D9" }}>&lt;</span>
              Code
              <span style={{ color: "#6D28D9" }}>/</span>
              Bit
              <span style={{ color: "#6D28D9" }}>&gt;</span>
            </h1>
            <button onClick={() => setAsideOpen(false)}><FaXmark /></button>
          </div>
          <hr />
          <h3 className="mt-3">Menu Principal</h3>
          <ul onClick={() => setAsideOpen(false)}>
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/about">Sobre</Link></li>
            <li><Link href="/contact">Contato</Link></li>
          </ul>
          <hr />
          <h3 className="mt-3">Tópicos</h3>
          <ul onClick={() => setAsideOpen(false)}>
            <li><Link href="/topics/htmlcssjs">HTML5, CSS3, JS</Link></li>
            <li><Link href="/topics/nextjs">Next Js</Link></li>
            <li><Link href="/topics/reactjs">React Js</Link></li>
            <li><Link href="/topics/database">Database</Link></li>
            <li><Link href="/topics/deploy">Deploy</Link></li>
          </ul>
        </div>
      </div >
    </>
  );
}
