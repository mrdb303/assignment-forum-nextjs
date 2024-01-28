
import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function ListMessages(params){

  const comments = await sql`SELECT * FROM bl_comments WHERE bl_comments.com_post_id = ${params.id} ORDER BY com_date DESC`;

  return (
    <div>
      <h4>comments: {comments.rowCount}</h4>
      <div className="comments">
        {comments.rows.map((comment) => {
          return (
            <form key={comment.com_id}>
              <label htmlFor="name">Name: </label>
              <input name="authorname" id="authorname" 
                defaultValue={comment.com_author} 
                readOnly={true}
              /><br/>
              <label htmlFor="content">Message: </label>
              <input name="content" id="content"  
                defaultValue={comment.com_content} 
                readOnly={true}
              /><br/>

              <button>Delete</button><button>Edit</button>
              {/* <p>{comment.com_date}</p> */}

              </form>
          );
        })}
      </div>
    </div>
  );
}