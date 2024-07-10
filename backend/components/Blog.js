import axios from 'axios';
import { useRouter } from 'next/router';
import { Children, useState } from 'react';
import MarkdownEditor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';

export default function Blog(
  {
    _id,
    title: existingTitle,
    slug: existingSlug,
    blogcategory: existingBlogcategory,
    description: existingDescription,
    tags: existingTags,
    status: existingStatus,
  }
) {

  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || '');
  const [slug, setSlug] = useState(existingSlug || '');
  const [blogcategory, setBlogcategory] = useState(existingBlogcategory || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [tags, setTags] = useState(existingTags || '');
  const [status, setStatus] = useState(existingStatus || '');

  async function createProduct(ev) {
    ev.preventDefault();
    const data = { title, slug, description, blogcategory, tags, status };

    if (_id) {
      await axios.put('/api/blogapi', { ...data, _id })
    } else {
      await axios.post('/api/blogapi', data)
    }
    setRedirect(true);
  }

  if (redirect) {
    router.push('/')
    return null;
  }

  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;

    const newSlug = inputValue.replace(/\s+/g, '-');
    setSlug(newSlug);
  }

  return <>
    <form onSubmit={createProduct} className='addWebsiteform'>
      {/* blog title */}
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="title">Titulo</label>
        <input
          type="text"
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Insira um titulo' />
      </div>
      {/* blog slug */}
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="slug">Slug</label>
        <input
          type="text"
          id='slug'
          value={slug}
          onChange={handleSlugChange}
          placeholder='Insira um Slug' required />
      </div>
      {/* blog category */}
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="category">Categoria</label>
        <select
          name="category"
          id="category"
          value={blogcategory}
          onChange={(e) => setBlogcategory(Array.from(e.target.selectedOptions,
            option => option.value))}
          multiple>
          <option value="htmlcssjs">HTML5, CSS3, JavaScript</option>
          <option value="nextjs">Next Js, React Js</option>
          <option value="database">Banco de Dados</option>
          <option value="deployment">Deploy</option>
        </select>
        <p className="existingcategory flex gap-2 mt-1 mb-1">
          Selecionado: {Array.isArray(existingBlogcategory) && existingBlogcategory.map(category => (
            <span key={category}>{category}</span>
          ))}
        </p>
      </div>
      {/* markdown description content */}
      <div className="description w-100 flex flex-col flex-left mb-2">
        <label htmlFor="description">Conteúdo do Blog</label>
        <MarkdownEditor
          value={description}
          onChange={(ev) => setDescription(ev.text)}
          style={{ width: '100%', height: '400px' }}

          renderHTML={(text) => (
            <ReactMarkdown components={{
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                if (inline) {
                  return <code>{children}</code>
                } else if (match) {
                  return (
                    <div style={{ position: 'relative' }}>
                      <pre style={{ padding: '0', borderRadius: '5px', overflowX: 'auto', whiteSpace: 'pre-wrap' }} {...props}>
                        <code>{children}</code>
                      </pre>
                      <button style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }}
                        onClick={() => navigator.clipboard.writeText(children)}
                      >Copy Code</button>
                    </div>
                  );
                } else {
                  return <code {...props}>{children}</code>
                }
              }
            }}>
              {text}
            </ReactMarkdown>
          )}
        />
      </div>

      {/* tags */}

      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="tags">Tags</label>
        <select
          name="tags"
          id="tags"
          value={tags}
          onChange={(e) => setTags(Array.from(e.target.selectedOptions,
            option => option.value))}
          multiple>
          <option value="html">HTML5</option>
          <option value="css">CSS3</option>
          <option value="javascript">JavaScript</option>
          <option value="nextjs">Next Js</option>
          <option value="reactjs">React Js</option>
          <option value="database">Banco de Dados</option>
          <option value="tailwindcss">TailwindCss</option>
          <option value="deployment">Deploy</option>
        </select>
        <p className="existingcategory flex gap-2 mt-1 mb-1">
          Selecionado: {Array.isArray(existingTags) && existingTags.map(category => (
            <span key={category}>{category}</span>
          ))}
        </p>
      </div>

      {/* status */}

      <div className="w-100 flex flex-col flex-left mb-2" >
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}

        >
          <option value="">Nenhum item selecionado</option>
          <option value="draft">Pendente</option>
          <option value="publish">Publicado</option>
        </select>
        <p className="existingcategory flex gap-2 mt-1 mb-1">
          Selecionado: <span>{existingStatus}</span>
        </p>
      </div>

      {/* save button */}

      <div className="w-100 mb-2">
        <button type='submit' className='w-100 addwebbtn flex-center'>Salvar Blog</button>
      </div>

    </form>
  </>
}