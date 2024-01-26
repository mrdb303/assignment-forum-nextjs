
import { sql } from "@vercel/postgres";
import { revalidatePath } from 'next/cache';
//import { Navigate } from 'react-router-dom';
import ListMessages from "../../../components/ListMessages";
import SaveMessageButton from "../../../components/SaveMessageButton";
import handleAddComment from "../../../components/HandleAddComment.js";
import {Link} from "next/link";
import { redirect } from "next/navigation";

export default async function ViewSinglePost({ params }) {
  
    const indivPost = await sql`SELECT * FROM bl_posts WHERE post_id = ${params.postId} ORDER BY post_date DESC`;
    
    async function handleAddComment(formData) {
      "use server";
    
      // Get the values from form
      const author = formData.get("authorname");
      const content = formData.get("content");
      const id = params.postId;
    
      // Run the query to write message to database
      await sql`INSERT INTO bl_comments (com_post_id, com_author, com_content) VALUES ( ${id}, ${author}, ${content})`;
    
      // revalidate path and refresh to display
      revalidatePath('/posts[postId]');
      redirect('/posts');  
     
    }
      

  return (
    <div>
      <p>{indivPost.rows[0].post_id}</p>
      <p>Title: {indivPost.rows[0].post_title}</p>
      <p>Content: {indivPost.rows[0].post_content}</p>
      <p>Author: {indivPost.rows[0].post_author}</p>

      {/* Form goes here*/}

      <h3>Leave a Message</h3>


      <div>
      <h2>Add a Comment</h2>
      <form action={handleAddComment}>
        <label htmlFor="name">Name</label>
        <input name="authorname" id="authorname" placeholder="Name" />

        <label htmlFor="content">Your message</label>
        <input name="content" id="content" placeholder="content" />

        <SaveMessageButton/>
      </form>
    </div>

    <ListMessages id={params.postId}/>

    </div>
  );
}