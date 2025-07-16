import home from '../../assets/images/home-bg.jpg';
import Nav from '../layouts/Nav';
import Footer from '../layouts/Footer';
import { useEffect, useState } from 'react';
import supabase from '../../supabase/SupabaseClient';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error, status } = await supabase.from('posts').select('*');
        if (error && status !== 406) {
          console.log(`데이터를 가져오는 중 오류 발생: ${error}`);
          throw error;
        }
        console.log(data);
        setData(data);
      } catch (error) {
        console.error(`데이터를 가져오는 중 오류 발생: ${error.message}`);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Nav />
      {/* Page Header */}
      <header className="masthead" style={{ backgroundImage: `url(${home})` }}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="site-heading">
                <h1>Clean Blog</h1>
                <span className="subheading">A Blog Theme by Start Bootstrap</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            {/* Post preview */}
            {data?.map((post) => {
              return (
                <div className="post-preview" key={post.id}>
                  <Link to={`/singlepost/${post.id}`}>
                    <h2 className="post-title">{post.title}</h2>
                    <h3 className="post-subtitle">{post.description}</h3>
                  </Link>
                  <p className="post-meta">
                    Posted by
                    <a href="#!">Start Bootstrap</a>
                    on September 24, 2023
                  </p>
                </div>
              );
            })}
            {/* Divider */}
            <hr className="my-4" />

            {/* Pager */}
            <div className="d-flex justify-content-end mb-4">
              <a className="btn btn-primary text-uppercase" href="#!">
                Older Posts →
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
