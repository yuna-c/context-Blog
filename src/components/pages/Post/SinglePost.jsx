import { useParams } from 'react-router-dom';
import Footer from '../../layouts/Footer';
import Nav from '../../layouts/Nav';
import { useEffect, useState } from 'react';
import supabase from '../../../supabase/SupabaseClient';

function SinglePost() {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error, status } = await supabase.from('posts').select('*').eq('id', id).single();
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
  }, [id]);

  console.log(id);

  return (
    <>
      <Nav />
      <header className="masthead" style={{ backgroundImage: `url('assets/img/home-bg.jpg')` }}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <h1>{data ? data.title : ''}</h1>
                <h2 className="subheading">{data?.description}</h2>
                <span className="meta">
                  Posted by
                  <a href="#!">Start Bootstrap</a>
                  on August 24, 2022
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <article className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <img src={data?.image} alt={data?.image} style={{ width: '-webkit-fill-available' }} />
              <p>{data?.content}</p>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}

export default SinglePost;
