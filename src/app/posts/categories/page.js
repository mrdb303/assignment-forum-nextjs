import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function ListCategories(){

  //const comments = await sql`SELECT * FROM bl_comments WHERE com_post_id = ${params.id}`;
  const categories = await sql`SELECT * FROM bl_categories ORDER BY cat_name ASC`;
   //6;
  //console.log(comments);
  // {comments.rows}

  return (
    <div>
      <h3>Categories: {categories.rowCount}</h3>
      <div className="categories">
        {categories.rows.map((category) => {
          return (
            <div key={category.cat_id} className="category">
              <p>{category.cat_name}</p>
              {/* <p>{comment.com_date}</p> */}

            </div>
          );
        })}
      </div>
    </div>
  );
}