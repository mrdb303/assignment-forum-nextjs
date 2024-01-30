import { sql } from "@vercel/postgres";
import { Link } from "next/link";

export default async function ListPostsByCategory({params}){

  const categoryPosts = await sql`SELECT bl_categories.cat_id, bl_categories.cat_name AS category_name, bl_posts.post_author,bl_posts.post_content, bl_posts.post_likes, bl_posts.post_id, bl_posts.post_title, bl_posts.post_cat_id FROM bl_posts INNER JOIN bl_categories ON bl_posts.post_cat_id = bl_categories.cat_id WHERE bl_categories.cat_id = ${params.catId} ORDER BY bl_posts.post_likes DESC`;

  return (
    <>
      <h4>Tips for {categoryPosts.rows[0]['category_name']}: {categoryPosts.rowCount}</h4>
        {categoryPosts.rows.map((post) => {
          return (
            <div key={post.post_id} className="comment">
              <p key={"pa" + post.post_id}>Author: {post.post_author}</p><br/>
              <p key={"pt" + post.post_id}>Title: {post.post_title}</p><br/>
              <p key={"pc" + post.post_id}>Tip: {post.post_content}</p><br/>
              <p key={"pl" + post.post_id}>Likes: {post.post_likes}</p>
            </div>
          );
        }
      )}
    </>
  );

}


