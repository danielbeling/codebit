import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Blog from '@/components/Blog';
import axios from 'axios';
import Loading from '@/components/Loading';
import { BsPostcard } from 'react-icons/bs';
import Head from 'next/head';

export default function EditBlog() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      axios.get('/api/blogapi?id=' + id)
        .then(response => {
          setProductInfo(response.data);
        })
        .catch(error => {
          console.error("Erro ao carregar informações do blog:", error);
        });
    }
  }, [router.query]);

  if (status === 'loading') {
    return (
      <div className='loadingdata flex flex-col flex-center wh_100'>
        <Loading />
        <h1>Carregando...</h1>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Atualizar Blog - {productInfo?.title}</title>
      </Head>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>Editar <span>{productInfo?.title || 'Blog'}</span></h2>
            <h3>PAINEL ADMINISTRADOR</h3>
          </div>
          <div className="breadcrumb">
            <BsPostcard /> <span>/</span> <span>Editar Blog</span>
          </div>
        </div>
        <div className="mt-3">
          {productInfo ? (
            <Blog {...productInfo} />
          ) : (
            <p>Carregando informações do blog...</p>
          )}
        </div>
      </div>
    </>
  );
}
