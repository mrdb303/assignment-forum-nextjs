/* 
- This page performs an SQL query to grab a list of categories and id's from
- the categories table.
- Links are created so that by clicking on them, a page will display a list of 
- posts for that particular category chosen.
*/

import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function ListCategories(){

  const categories = await sql`SELECT * FROM bl_categories ORDER BY cat_name ASC`;

  return (
    <>
      <h4>Categories: {categories.rowCount}</h4>
        {categories.rows.map((category) => {
          return (
            <Link key={"l" + category.cat_id} href={`/posts/categories/${category.cat_id}`}>
              <div key={"k" + category.cat_id} className="category">
                <p key={"p" + category.cat_id}>{category.cat_name}</p>
                {/* <p>{comment.com_date}</p> */}
              </div>
            </Link>
          );
        })}
        <br/>
        <p>Click on a category above to see the tips in that section</p>
      </>
  );
}