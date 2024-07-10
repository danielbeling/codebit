import Head from "next/head";
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { IoHome } from 'react-icons/io5';
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineController } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Loading from '@/components/Loading';

export default function Home() {

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

  ChartJs.register(CategoryScale, LineController, LinearScale, BarElement, Title, Tooltip, Legend)

  const [blogsData, setBlogsData] = useState([]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Blogs criados mensalmente por'
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blogapi');
        const data = await response.json();
        setBlogsData(data)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }
    fetchData();
  }, [])

  const monthlydata = blogsData.filter(dat => dat.status === "publish").reduce((acc, blog) => {
    const year = new Date(blog.createdAt).getFullYear();
    const month = new Date(blog.createdAt).getMonth();
    acc[year] = acc[year] || Array(12).fill(0);

    acc[year][month]++;
    return acc;
  }, {});

  const currentYear = new Date().getFullYear();
  const years = Object.keys(monthlydata);
  const labels = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const datasets = years.map(year => ({
    label: `${year}`,
    data: monthlydata[year] || Array(12).fill(0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},
    ${Math.floor(Math.random() * 256)}, 0.5 )`
  }))

  const data = {
    labels,
    datasets
  }

  if (session) {
    return (
      <>
        <Head>
          <title>CodeBit | Painel Admin</title>
          <meta name="description" content="Painel Admin da CodeBit" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='dashboard'>
          {/* title dashboard*/}
          <div className="titledashboard flex flex-sb">
            <div data-aos="fade-right">
              <h2>Blogs <span>Dashboard</span></h2>
              <h3>PAINEL ADMINISTRADOR</h3>
            </div>
            <div className="breadcrumb" data-aos="fade-left">
              <IoHome /> <span>/</span> <span>Dashboard</span>
            </div>
          </div>
          {/* dashboard four cards */}
          <div className="topfourcards flex flex-sb">
            <div className="four_card" data-aos="fade-right">
              <h2>Total Blogs</h2>
              <span>{blogsData.filter(ab => ab.status === 'publish').length}</span>
            </div>
            <div className="four_card" data-aos="fade-right">
              <h2>Total Topicos</h2>
              <span>0</span>
            </div>
            <div className="four_card" data-aos="fade-left">
              <h2>Total Tags</h2>
              <span>0</span>
            </div>
            <div className="four_card" data-aos="fade-left">
              <h2>Drafts Blogs</h2>
              <span>{blogsData.filter(ab => ab.status === 'draft').length}</span>
            </div>
          </div>
          {/* year overview */}
          <div className="year_overview flex flex-sb" >
            <div className="leftyearoverview" data-aos="fade-up">
              <div className="flex flex-sb">
                <h3>Visão Geral</h3>
                <h3 className="text-right">{blogsData.filter(ab => ab.status === 'publish').length} / 356 <br /> <span>Total Publicação</span></h3>
              </div>
              <Bar data={data} options={options} />
            </div>
            <div className="right_salescont" data-aos="fade-up">
              <div>
                <h3>Blogs Por Categoria</h3>
              </div>
              <div className="blogscategory flex flex-center">
                <table>
                  <thead>
                    <tr>
                      <td>Tópicos</td>
                      <td>Quant.</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>HTML, CSS, JavaScript</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Next, React , Angular, Vue </td>
                      <td>31</td>
                    </tr>
                    <tr>
                      <td>Banco de Dados</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td>Deploy</td>
                      <td>10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
