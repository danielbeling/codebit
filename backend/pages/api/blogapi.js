import { mongooseconnect } from '@/lib/mongoose';
import { Blog } from '@/models/blog';

export default async function handle(req, res) {

  await mongooseconnect();

  const { method } = req;

  if (method === 'POST') {
    const { title, slug, description, blogcategory, tags, status } = req.body;

    const blogDoc = await Blog.create({
      title, slug, description, blogcategory, tags, status
    })
    res.json(blogDoc);
  }
  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Blog.findById(req.query.id));
    } else {
      res.json((await Blog.find()).reverse())
    }
  }
  //update Blog
  if (method === 'PUT') {
    const { _id, title, slug, description, blogcategory, tags, status } = req.body;
    await Blog.updateOne({ _id }, {
      title, slug, description, blogcategory, tags, status
    });

    res.json(true);
  }

  //delete Blog
  if (method === 'DELETE') {
    if (req.query?.id) {
      await Blog.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}