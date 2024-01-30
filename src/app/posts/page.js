/*
- This is the page that lists all of the posts/tips in date order. Newest first.
- The SELECT query lists the posts from the single bl_posts table.
- The number of records found is displayed at the bottom of the page.
- Note that the actual content of the post/tip is not displayed and requires
- a click on the 'view' button.
-
- Clicking on the 'View' button opens a single post/tip in a different script,
- passing through the single post_id of the record.
*/


import { sql } from "@vercel/postgres";
import Link from "next/link";
import DateTimeConvert from "@/components/DateTimeConvert";

export default async function ListPostsPage() {
  const allPosts = await sql`SELECT post_id, post_author, post_title, post_date FROM bl_posts ORDER BY post_date DESC`;

  function convDate(obj){
    let ukTimeVal = obj[0].toUTCString();
    return ukTimeVal.substr(5, 17);;
  }

  return (
    <>
      <h3>Tips Posted</h3>
      <div className="posts">
        {allPosts.rows.map((post) => {
          return (
            <div key={post.post_id} className="post">
              <p>{post.post_author} posted at: {convDate(post.post_date)}</p><br/>
              <p>Title: {post.post_title}</p><br/>
              <Link href={`/posts/${post.post_id}`}><button>View post</button></Link>
            </div>
          );
        })}
      
      <h4>Number of posts: {allPosts.rowCount}</h4>
    </div>
    </>
  );
}
