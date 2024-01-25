import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function ListPostsPage() {
  const allPosts = await sql`SELECT post_id, post_author, post_title, post_date FROM bl_posts ORDER BY post_date DESC`;


  return (
    <div>
      <h2>Home</h2>
      <div className="posts">
        {allPosts.rows.map((post) => {
          return (
            <div key={post.post_id} className="post">
              <p>Author: {post.post_author}</p>
              <p>Title: {post.post_title}</p>
              {/* <p>Date: {post.post_date}</p> */}
              <Link href={`/posts/${post.post_id}`}><button>View post</button></Link>
            </div>
          );
        })}
      </div>
      <h3>Number of posts: {allPosts.rowCount}</h3>
    </div>
  );
}