import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { BsPostcard } from 'react-icons/bs';
import Loading from '@/components/Loading';
import { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Link from 'next/link';
import useFetchData from '@/hooks/useFetchData';
import Dataloading from '@/components/Dataloading';

export default function Blog() {

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const { alldata, loading } = useFetchData('/api/blogapi');

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredBlog = searchQuery.trim() === '' ? alldata : alldata.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const publishedBlogs = filteredBlog.filter(ab => ab.status === 'publish');

  const indexOfFirstblog = (currentPage - 1) * perPage;
  const indexOfLastblog = currentPage * perPage;
  const currentPublishedBlogs = publishedBlogs.slice(indexOfFirstblog, indexOfLastblog);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(publishedBlogs.length / perPage); i++) {
    pageNumbers.push(i);
  }

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  if (status === 'loading') {
    return (
      <div className='loadingdata flex flex-col flex-center wh_100'>
        <Loading />
        <h1>Carregando...</h1>
      </div>
    );
  }

  if (session) {
    return (
      <>
        <div className="blogpage">
          <div className="titledashboard flex flex-sb">
            <div data-aos="fade-right">
              <h2>Todos os <span>Blogs</span> Publicados</h2>
              <h3>PAINEL ADMINISTRADOR</h3>
            </div>
            <div className="breadcrumb" data-aos="fade-left">
              <BsPostcard /> <span>/</span> <span>Blogs</span>
            </div>
          </div>
          <div className="blogstable">
            <div className="flex gap-2 mb-1" data-aos="fade-up">
              <h2>Pesquisar blogs</h2>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Pesquisar por título..'
              />
            </div>
            <table className='table table-styling' data-aos="fade-up">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Titulo</th>
                  <th>Slug</th>
                  <th>Editar / Deletar</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4}>
                      <Dataloading />
                    </td>
                  </tr>
                ) : (
                  publishedBlogs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className='text-center'>Nenhum Blog Publicado</td>
                    </tr>
                  ) : (
                    currentPublishedBlogs.map((blog, index) => (
                      <tr key={blog._id}>
                        <td>{indexOfFirstblog + index + 1}</td>
                        <td><h3>{blog.title}</h3></td>
                        <td><pre>{blog.slug}</pre></td>
                        <td>
                          <div className="flex gap-2 flex-center">
                            <Link href={'/blogs/edit/' + blog._id}><button title='Editar'><FaEdit /></button></Link>
                            <Link href={'/blogs/delete/' + blog._id}><button title='Deletar'><RiDeleteBin6Fill /></button></Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
            {publishedBlogs.length > 0 && (
              <div className="blogpagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                  Anterior
                </button>
                {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`${currentPage === number ? 'active' : ''}`}
                  >
                    {number}
                  </button>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage >= pageNumbers.length}>
                  Próximo
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
