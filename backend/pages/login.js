import Head from "next/head";
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import Image from 'next/image';
import Loading from '@/components/Loading';

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  const login = async () => {
    await signIn();
  };

  if (status === 'loading') {
    return (
      <div className='loadingdata flex flex-col flex-center wh_100'>
        <Loading />
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Login - CodeBit</title>
        <meta name="description" content="Login page for CodeBit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="loginfront flex flex-center flex-col full-w">
        <Image src="/img/daniel.jpeg" width={250} height={250} alt="Imagem de perfil do Administrador" />
        <h1>Bem vindo Administrador ao CodeBit 👋</h1>
        <p>Visite nosso site principal <a href='https://codebit.com'>CodeBit</a></p>
        <button onClick={login} className='mt-2'> Login Google</button>
      </div>
    </>
  );
}
