

import { sql } from "@vercel/postgres";
import { revalidatePath } from 'next/cache';
import AddPostButton from "../../../components/AddPostButton";
import { redirect } from "next/navigation";



export default async function addPost() {
  
  async function handleAddPost(formData) {
    "use server";
    
    // Get the values from form
    const author = formData.get("authorname");
    const title = formData.get("title");
    const content = formData.get("content");
    //const id = params.postId;
  
    // Run the query to write message to database
    await sql`INSERT INTO bl_posts ( post_author, post_title, post_content) VALUES ( ${author}, ${title}, ${content})`;

    revalidatePath('/', 'layout');
    redirect(`/posts`);  
    
  }
      

  return (

      <div>
      <h2>Add a New Post</h2>
      <form action={handleAddPost}>
        <label htmlFor="name">Name</label>
        <input name="authorname" id="authorname" placeholder="Name" />
        <label htmlFor="title">Post Title</label>
        <input name="title" id="title" placeholder="title" />
        <label htmlFor="content">Your message</label>
        <input name="content" id="content" placeholder="content" />
        <br/>
        <AddPostButton/>
      </form>
    </div>


  );
}