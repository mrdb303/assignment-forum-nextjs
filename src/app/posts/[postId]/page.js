
import { sql } from "@vercel/postgres";
import { revalidatePath } from 'next/cache';
import ListMessages from "../../../components/ListMessages";
import SaveMessageButton from "../../../components/SaveMessageButton";
import AddLikeButton from "../../../components/AddLikeButton";
import { redirect } from "next/navigation";
import {Link} from "next/link";


export default async function ViewSinglePost({ params }) {
  
    
    const indivPost = await sql`SELECT cat_name, post_id, post_title, post_content, post_author, post_likes FROM bl_posts INNER JOIN bl_categories ON post_id = ${params.postId} ORDER BY post_date DESC`;
    
    async function handleAddComment(formData) {
      "use server";
    
      // Get the values from form
      const author = formData.get("authorname");
      const content = formData.get("contentval");
      const id = params.postId;
    
      // Run the query to write message to database
      await sql`INSERT INTO bl_comments (com_post_id, com_author, com_content) VALUES ( ${id}, ${author}, ${content})`;

      revalidatePath('/', 'layout');
      redirect(`/posts/${params.postId}`);  
    }
      
// ?????????????????????????????????????????????????
    async function handleAddLike(formData) {
      "use server";
    
      // Get the values from form
      
      const id = formData.get("idval");
      let likesVal = formData.get("likes");
      likesVal++;
    
      // Run the query to write message to database
      await sql`UPDATE bl_posts SET post_likes = ${likesVal} WHERE post_id = ${id}`;

      revalidatePath('/', 'layout');
      redirect(`/posts`);  // change to main posts page
    }

  return (
    <>
      <form action={handleAddLike}>
        <label htmlFor="posttitle">Title:</label>
        <input name="posttitle" 
          id="posttitle" 
          defaultValue={indivPost.rows[0].post_title}
          readOnly={true}
        />

        <label htmlFor="postcontent">Tip:</label>
        <textarea name="postmessage" 
          id="postmessage" 
          defaultValue={indivPost.rows[0].post_content}
          readOnly={true}
          rows="3" 
          cols="63"
        />

        <label htmlFor="category">Category:</label>
        <input name="category" 
          id="category" 
          defaultValue={indivPost.rows[0].cat_name}
          readOnly={true}
        />

        <label htmlFor="postauthor">Author:</label>
        <input name="postauthor" 
          id="postauthor" 
          defaultValue={indivPost.rows[0].post_author}
          readOnly={true}
        />

        <label htmlFor="likes">Likes:</label>
        <input name="likes" 
          id="likes" 
          defaultValue={indivPost.rows[0].post_likes}
          readOnly={true}
        />

        <input name="idval" 
          id="idval"
          type="hidden"
          defaultValue={indivPost.rows[0].post_id}
        />
        <br/><br/>
        
        <AddLikeButton/>
        
      </form>
      
      

    <h3>Add a Comment</h3>
    
      
      <form action={handleAddComment}>
        <label htmlFor="name">Your Name:</label>
        <input name="authorname" 
          id="authorname" 
          placeholder="Name"
          required
        />

        <label htmlFor="contentval">Your Message</label>
        <input name="contentval" 
          id="contentval" 
          placeholder="Message content" 
          required
        />
        <br/>

        <SaveMessageButton/>
      </form>
    
    <ListMessages id={params.postId}/>
    
    
    </>
  );
}