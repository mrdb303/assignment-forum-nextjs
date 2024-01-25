import { sql } from "@vercel/postgres";
import ListMessages from "../../../components/ListMessages";

export default async function ViewSinglePost({ params }) {
  
    const indivPost = await sql`SELECT * FROM bl_posts WHERE post_id = ${params.postId} ORDER BY post_date DESC`;

  return (
    <div>
      <p>{indivPost.rows[0].post_id}</p>
      <p>Title: {indivPost.rows[0].post_title}</p>
      <p>Content: {indivPost.rows[0].post_content}</p>
      <p>Author: {indivPost.rows[0].post_author}</p>
      <button>Add Comment</button>
      <button>Add like</button>
      <ListMessages/>

    </div>
  );
}