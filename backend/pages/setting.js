import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import Loading from '@/components/Loading';
import { IoSettingsOutline } from 'react-icons/io5';
import Image from 'next/image';
import { MdOutlineAccountCircle } from 'react-icons/md';

export default function Setting() {
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

  async function logout() {
    await signOut();
    await router.push('/login');

  }

  if (session) {
    return (
      <>
        <div className="settingpage">
          {/* title dashboard */}
          <div className="titledashboard flex flex-sb">
            <div data-aos="fade-right">
              <h2>Admin <span>Configurações</span></h2>
              <h3>PAINEL ADMINISTRADOR</h3>
            </div>
            <div className="breadcrumb" data-aos="fade-left">
              <IoSettingsOutline /> <span>/</span> <span>Configurações</span>
            </div>
          </div>

          <div className="profilesettings">
            <div className="leftprofile_details flex" data-aos="fade-up">
              <Image
                className='img'
                src="/img/daniel.jpeg"
                width={150}
                height={150}
                alt="Imagem de perfil do Administrador"
              />
              <div className='w-100'>
                <div className="flex flex-sb flex-left mt-2">
                  <h2>Meu Perfil:</h2>
                  <h3>CodeBit <br /> Desenvolvedor Web</h3>
                </div>
                <div className="flex flex-sb mt-2">
                  <h3>Celular:</h3>
                  <input type="text" defaultValue="+55 69 9 93758880" />
                </div>
                <div className="mt-2">
                  <input type="email" defaultValue="carlosberling@outlook.com" />
                </div>
                <div className="flex flex-center w-100 mt-2">
                  <button>Salvar</button>
                </div>
              </div>
            </div>
            <div className="rightlogoutsec" data-aos="fade-up">
              <div className='topaccoutnbox'>
                <h2 className='flex flex-sb'>Minha Conta <MdOutlineAccountCircle /></h2>
                <hr />
                <div className="flex flex-sb mt-1">
                  <h3>Conta ativa <br /> <span>Email</span></h3>
                  <button onClick={logout}>Sair</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
