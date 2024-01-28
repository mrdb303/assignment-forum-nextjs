

import { sql } from "@vercel/postgres";
import { revalidatePath } from 'next/cache';
import AddPostButton from "../../../components/AddPostButton";
import { redirect } from "next/navigation";
import SelectOptions from "@/components/SelectOptions";



export default async function addPost() {
  
  async function handleAddPost(formData) {
    "use server";
    
    // Get the values from form
    const author = formData.get("authorname");
    const title = formData.get("title");
    const content = formData.get("content");
    const category = formData.get("category");
  
    // Run the query to write message to database
    await sql`INSERT INTO bl_posts ( post_author, post_title, post_content, post_cat_id) VALUES ( ${author}, ${title}, ${content}, ${category})`;

    revalidatePath('/', 'layout');
    redirect(`/posts`);  
    
  }
      

  return (

      <div>
      <h2>Add a New Tip</h2>
      <form action={handleAddPost}>
        <label htmlFor="name">Your Name: </label>
        <input name="authorname" 
          id="authorname" 
          placeholder="Name"
          required
        /><br/>
        <label htmlFor="title">Post Title: </label>
        <input name="title" 
          id="title" 
          placeholder="title" 
          required
        /><br/>
        <label htmlFor="category">Tip Category:</label>
        <select name="category" 
          id="category" 
          required>
          <SelectOptions/>
        </select>

        <label htmlFor="content">Your Tip: </label>
        <textarea name="content" 
          id="content" 
          placeholder="Your tip" 
          required
          rows="3" 
          cols="63"
        /><br/>
        <br/>
        <AddPostButton/>
      </form>
    </div>
  );
}