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

export default function Draft() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [perPage] = useState(5);
  const { alldata, loading } = useFetchData('/api/blogapi');
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading' || loading) {
    return (
      <div className='loadingdata flex flex-col flex-center wh_100'>
        <Loading />
        <h1>Carregando...</h1>
      </div>
    );
  }

  // Filter and pagination logic
  const filteredBlog = searchQuery.trim() === '' ? alldata : alldata.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const draftBlogs = filteredBlog.filter(ab => ab.status === 'draft');
  const allblog = draftBlogs.length;
  const indexOfFirstblog = (currentPage - 1) * perPage;
  const indexOfLastblog = currentPage * perPage;
  const currentBlogs = draftBlogs.slice(indexOfFirstblog, indexOfLastblog);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div data-aos="fade-right">
            <h2>Todos os <span>Blogs</span> Pendentes</h2>
            <h3>PAINEL ADMINISTRADOR</h3>
          </div>
          <div className="breadcrumb" data-aos="fade-left">
            <BsPostcard /> <span>/</span> <span>Pendentes</span>
          </div>
        </div>
        <div className="blogstable">
          <table className='table table-styling' data-aos="fade-up">
            <thead>
              <tr>
                <th>#</th>
                <th>Título</th>
                <th>Slug</th>
                <th>Editar / Deletar</th>
              </tr>
            </thead>
            <tbody>
              {draftBlogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className='text-center'>Nenhum Rascunho Pendente</td>
                </tr>
              ) : (
                currentBlogs.map((blog, index) => (
                  <tr key={blog._id}>
                    <td>{indexOfFirstblog + index + 1}</td>
                    <td><h3>{blog.title}</h3></td>
                    <td><pre>{blog.slug}</pre></td>
                    <td>
                      <div className="flex gap-2 flex-center">
                        <Link href={'/blogs/edit/' + blog._id}>
                          <button title='Editar'><FaEdit /></button>
                        </Link>
                        <Link href={'/blogs/delete/' + blog._id}>
                          <button title='Deletar'><RiDeleteBin6Fill /></button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {draftBlogs.length > 0 && (
            <div className="blogpagination">
              <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
              {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`${currentPage === number ? 'active' : ''}`}
                >{number}</button>
              ))}
              <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage || indexOfLastblog >= allblog}>Próximo</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
