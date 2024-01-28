
/*
- This grabs the 'options' required for a 'select' HTML tag.
- The data is pulled live via a SELECT query from the categories table and
- returned.
*/

import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function SelectOptions(){

  const options = await sql`SELECT * FROM bl_categories ORDER BY cat_name ASC`;

  return (
    <>
      {options.rows.map((option) => {
        return ( 
          <option key={option.cat_id} 
            value={option.cat_id}>
              {option.cat_name}
          </option>
        );
      })}
    </>
  );
}