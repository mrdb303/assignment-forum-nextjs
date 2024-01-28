import { sql } from "@vercel/postgres";
import Link from "next/link";
import DateTimeConvert from "@/components/DateTimeConvert";

export default async function ListPostsPage() {
  const allPosts = await sql`SELECT post_id, post_author, post_title, post_date FROM bl_posts ORDER BY post_date DESC`;

  return (
    <>
      <h3>Tips Posted</h3>
      <div className="posts">
        {allPosts.rows.map((post) => {
          return (
            <form key={post.post_id}>
              <label htmlFor="name">Name: </label>
              <input name="authorname" 
                id="authorname" 
                defaultValue={post.post_author}
                readOnly={true}
              /><br/>

              <label htmlFor="posttitle">Title:</label>
              <input name="title" 
                id="title" 
                defaultValue={post.post_title}
                readOnly={true}
              /><br/><br/>
              <p>Posted: {`${allPosts.rows[0].post_date[0]}`}</p>
              {/* <p><DateTimeConvert value={JSON.stringify(allPosts.rows[0].post_date[0])}/></p>  */}
              {/* <p>Date: {post.post_date}</p> */}
              <Link href={`/posts/${post.post_id}`}><button>View post</button></Link>
            </form>
          );
        })}
      
      <h4>Number of posts: {allPosts.rowCount}</h4>
    </div>
    </>
  );
}

/*

*/