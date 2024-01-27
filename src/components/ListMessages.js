
import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function ListMessages(params){

  //const comments = await sql`SELECT * FROM bl_comments WHERE com_post_id = ${params.id}`;
  const comments = await sql`SELECT * FROM bl_comments WHERE bl_comments.com_post_id = ${params.id} ORDER BY com_date DESC`;
   //6;
  //console.log(comments);
  // {comments.rows}

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



/*

import { sql } from "@vercel/postgres";

export default async function Home() {
  const cats = await sql`SELECT * FROM sunflowercats`;

  return (
    <div>
      <h2>Home</h2>
      <div className="cats">
        {cats.rows.map((cat) => {
          return (
            <div key={cat.name} className="cat">
              <h3>{cat.name}</h3>
              <p>Produces {cat.seeds} seeds</p>
              <p>{cat.height} tall</p>
              <p>{cat.cute ? "Very cute" : "This one is Jez."}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

*/