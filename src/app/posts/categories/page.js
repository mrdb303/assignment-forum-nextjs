import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function ListCategories(){

  const categories = await sql`SELECT * FROM bl_categories ORDER BY cat_name ASC`;

  return (
    <>
      <h3>Categories: {categories.rowCount}</h3>
      <div id="categories">
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
      </div>
      </>
  );
}