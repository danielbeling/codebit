import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function CategoryPage() {

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);
  const [blog, setBlog] = useState([]);
  const router = useRouter();

  const { category } = router.query;

  useEffect(() => {
    const fetchBlogdata = async () => {
      try {
        const res = await axios.get(`/api/getblog?blogcategory=${category}`);
        const alldata = res.data;
        setBlog(alldata);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog data', error);
        setLoading(false);
      }
    }

    if (category) {
      fetchBlogdata();
    } else {
      router.push('/404');
    }
  }, [category]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const indexOfLastblog = currentPage * perPage;
  const indexOfFirstblog = indexOfLastblog - perPage;
  const currentBlogs = blog.slice(indexOfFirstblog, indexOfLastblog);

  const allblog = blog.length;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  const publisedhblogs = blog.filter(ab => ab.status === 'publish');

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
      <div className='blogpage'>
        <div className="category_slug">
          <div className="container">
            <div className="category_title">
              <div className="flex gap-1">
                <h1>
                  {loading ? <div>Loading...</div> : publisedhblogs.length > 0 ? publisedhblogs[0].blogcategory : 'No category'}
                </h1>
                <span>
                  {loading ? <div>0</div> : publisedhblogs.filter(blog => blog.blogcategory).length}
                </span>
              </div>
              <p>
                Todos os códigos disponíveis estão acessíveis nesta página. Por favor, utilize-os de forma responsável.
              </p>
            </div>
            <div className="category_blogs mt-3">
              {loading ? (
                <div className="wh-100 flex flex-center mt-2 pb-5">
                  <div className="loader"></div>
                </div>
              ) : (
                publisedhblogs.map((item) => {
                  const firstImageUrl = extractFirstImageUrl(item.description);
                  return (
                    <div className='cate_blog' key={item._id}>
                      <Link href={`/blog/${item.slug}`}>
                        <img src={firstImageUrl || "/img/no-image.png"} alt={item.title} />
                      </Link>
                      <div className="bloginfo mt-2">
                        <Link href={`/tag/${item.tags[0]}`}>
                          <div className="blogtag">{item.tags[0]}</div>
                        </Link>
                        <Link href={`/blog/${item.slug}`}><h3>{item.title}</h3></Link>
                        <p>{item.description.slice(0, 100)}...</p>
                        <div className="blogauthor flex gap-1">
                          <div className="blogaimg">
                            <img src="/img/daniel.jpeg" alt="Author" />
                          </div>
                          <div className="flex flex-col flex left gap-05">
                            <h4>Daniel Beling</h4>
                            <span>{new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="blogpagination">
              <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
              {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
                  {number}
                </button>
              ))}
              <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
