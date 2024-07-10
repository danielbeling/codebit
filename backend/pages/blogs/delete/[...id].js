import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Blog from '@/components/Blog';
import axios from 'axios';
import Loading from '@/components/Loading';
import { BsPostcard } from 'react-icons/bs';
import Head from 'next/head';

export default function Delete() {

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login')
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

  const { id } = router.query;
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get('/api/blogapi?id=' + id).then(response => {
        setProductInfo(response.data)
      })
    }
  }, [id]);

  function goback() {
    router.push('/')
  }
  async function deleteOneblog() {
    await axios.delete('/api/blogapi?id=' + id);
    goback()
  }

  if (session) {
    return <>
      <Head>
        <title>Deletar Blog - {productInfo?.title}</title>
      </Head>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>Deletar <span>{productInfo?.title}</span></h2>
            <h3>PAINEL ADMINISTRADOR</h3>
          </div>
          <div className="breadcrumb">
            <BsPostcard /> <span>/</span> <span>Deletar Blog</span>
          </div>
        </div>
        <div className="deletesec flex flex-center wh_100">
          <div className="deletecard">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6L17.65 19.2a2 2 0 01-2 1.8H8.35a2 2 0 01-2-1.8L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M12 6v-1a1 1 0 011-1h3a1 1 0 011 1v1" />
              <path d="M12 6v-1a1 1 0 00-1-1H8a1 1 0 00-1 1v1" />
            </svg>

            <p className="cookieHeading">Tem certeza?</p>
            <p className="cookieDescription">Se você excluir este blog, a remoção será permanente.</p>

            <div className="buttonContainer">
              <button onClick={deleteOneblog} className='acceptButton'>Deletar</button>
              <button onClick={goback} className='declineButton'>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  }
}