
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
            <div key={comment.com_id} className="comment">
              <p>{comment.com_author} | {comment.com_content} | date of post goes here</p>
              <button>Delete</button><button>Edit</button>
              {/* <p>{comment.com_date}</p> */}

            </div>
          );
        })}
      </div>
    </div>
  );
}
