
import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function ListMessages(params){

  const comments = await sql`SELECT * FROM bl_comments WHERE bl_comments.com_post_id = ${params.id} ORDER BY com_date DESC`;

  function convDate(obj){
    let ukTimeVal = obj[0].toUTCString();
    return ukTimeVal.substr(5, 17);;
  }

  return (
    <>
      <h4>Comments posted: {comments.rowCount}</h4>
        {comments.rows.map((comment) => {
          return (
            <div key={comment.com_id} className="post">
              <p>{comment.com_author} posted at: {convDate(comment.com_date)}</p><br/>
              <p>Message: {comment.com_content}</p><br/>
              <button>Delete</button><button>Edit</button>
            </div>
          );
        })}
      </>
  );
}

