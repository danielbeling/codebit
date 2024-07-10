
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoHome } from 'react-icons/io5';
import { BsPostcard } from "react-icons/bs";
import { MdOutlinePostAdd, MdOutlinePending } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { useRouter } from 'next/router';


export default function Aside() {

  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

  const handleClick = () => {
    setClicked(!clicked);
  }

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setClicked(false);
  }
  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname])

  return <>
    <aside className='asideleft'>
      <ul>
        <Link href="/">
          <li className={activeLink === '/' ? 'navactive' : ''}
            onClick={() => handleClick('/')}>
            <IoHome />
            <span>Dashboard</span>
          </li>
        </Link>
        <Link href="/blogs">
          <li className={activeLink === '/blogs' ? 'navactive' : ''}
            onClick={() => handleClick('/blogs')}>
            <BsPostcard />
            <span>Blogs</span>
          </li>
        </Link>
        <Link href="/blogs/addblog">
          <li className={activeLink === '/blogs/addblog' ? 'navactive' : ''}
            onClick={() => handleClick('/blogs/addblog')}>
            <MdOutlinePostAdd />
            <span>AddBlog</span>
          </li>
        </Link>
        <Link href="/draft">
          <li className={activeLink === '/draft' ? 'navactive' : ''}
            onClick={() => handleClick('/draft')}>
            <MdOutlinePending />
            <span>Pending</span>
          </li>
        </Link>
        <Link href="/setting">
          <li className={activeLink === '/setting' ? 'navactive' : ''}
            onClick={() => handleClick('/setting')}>
            <IoMdSettings />
            <span>Settings</span>
          </li>
        </Link>
      </ul>
    </aside>
  </>
}