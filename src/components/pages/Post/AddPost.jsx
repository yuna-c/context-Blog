import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../supabase/SupabaseClient';
import { v4 as uuidv4 } from 'uuid';
import Nav from '../../layouts/Nav';
import Footer from '../../layouts/Footer';

function AddPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handlePost = async ({ title, description, content, image }) => {
    try {
      setUploading(true);

      const updates = {
        id: uuidv4(),
        title: title,
        description: description,
        content: content,
        image: image
      };

      const { error } = await supabase.from('posts').insert(updates).single();

      if (error) throw error;
      console.log('포스트 작성에 성공했습니다.', updates);

      navigate('/');
    } catch (error) {
      console.error('포스트 작성에 실패했습니다. 다시 시도해주세요.', error.message);
    }
  };

  const uploadImage = async (e) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('이미지를 선택해 주세요');
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage.from('postsbucket').upload(filePath, file);

      if (error) throw error;

      getURL(filePath);
    } catch (error) {
      console.error(`이미지 업로드에 실패했습니다: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const getURL = (url) => {
    try {
      const { data, error } = supabase.storage.from('postsbucket').getPublicUrl(url);
      if (error) throw error;
      console.log(`이미지경로`, data.publicUrl);
      setImage(data.publicUrl);
    } catch (error) {
      console.error(`이미지 URL 가져오기에 실패했습니다: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePost({ title, description, content, image });
  };

  return (
    <>
      <Nav />
      <header className="masthead">
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <h1>AddPost</h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      <article className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <form onSubmit={handleSubmit} className="mb-5">
                <div>
                  <div className="mb-3 pb-1">
                    <label className="form-label px-0">Post title</label>
                    <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                </div>
                <div>
                  <div className="mb-3 pb-1">
                    <label className="form-label px-0">Short description</label>
                    <input className="form-control" value={content} onChange={(e) => setContent(e.target.value)} />
                  </div>
                </div>
                <div>
                  <div className="mb-3 pb-1">
                    <label className="form-label px-0">Post content</label>
                    <textarea
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-3 pb-1">
                    <label className="form-label px-0">Post image</label>
                    <input type="file" accept="image/*" onChange={uploadImage} className="form-control" />
                  </div>
                </div>
                <button className="btn btn-light shadow btn-sm mb-2" type="submit">
                  {uploading ? '업로드중' : '포스트 작성하기'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}

export default AddPost;
