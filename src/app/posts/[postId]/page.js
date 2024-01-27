
import { sql } from "@vercel/postgres";
import { revalidatePath } from 'next/cache';

//import { Navigate } from 'react-router-dom';
import ListMessages from "../../../components/ListMessages";
import SaveMessageButton from "../../../components/SaveMessageButton";
import { redirect } from "next/navigation";
import {Link} from "next/link";


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

      revalidatePath('/', 'layout');
      redirect(`/posts/${params.postId}`);  
    }
      

  return (
    <>
    <form>
      {/* <p>{indivPost.rows[0].post_id}</p> */}
      <label htmlFor="posttitle">Name</label>
      <input name="posttitle" 
        id="posttitle" 
        defaultValue={indivPost.rows[0].post_title}
        readonly=""
      />

      <label htmlFor="postcontent">Post</label>
      <input name="postmessage" 
        id="postmessage" 
        defaultValue={indivPost.rows[0].post_content}
        readonly=""
      />

      <label htmlFor="postauthor">Author</label>
      <input name="postauthor" 
        id="postauthor" 
        defaultValue={indivPost.rows[0].post_author}
        readonly=""
      />
    </form>
    
      

    <h3>Add a Comment</h3>
    
      
      <form action={handleAddComment}>
        <label htmlFor="name">Name</label>
        <input name="authorname" id="authorname" placeholder="Name" />

        <label htmlFor="contentval">Your message</label>
        <input name="contentval" id="contentval" placeholder="content" />
        <br/>

        <SaveMessageButton/>
      </form>
    
    <ListMessages id={params.postId}/>
    
    
    </>
  );
}