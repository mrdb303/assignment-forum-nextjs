/*
- Form 1
- ======
- This is the page that displays the single post/tip chosen in full, including
- the post/tip content and the category.
-
- The SELECT query used performs an INNER JOIN between the posts/tips table to 
- the categories table based on the post_id. This enables the category name 
- to be displayed on the form.
-
- The action 'handleAddLike' is used to add a like by pressing on the 'Add Like'
- button. The number of likes is increment using an sql UPDATE query.
- The button press is handled by an 'AddLikeButton' component to disable the 
- button while the record is saved.
-
- Form 2
- ======
- A second form is shown on the page to allow a message/comment to be added.
- The button press is handled by a component to disable the button while the 
- record is saved. The action 'handleAddComment' is used to write the 
- message/comment to the 'comments' table.
-
- To keep all of the data linked to the post shown, another query is performed
- that displays all previous messages/comments linked to the post. This is 
- carried out in the 'ListMessages' component.
- 
- The number of records found is taken from the query and displayed at the 
- bottom of the page.
*/



import { sql } from "@vercel/postgres";
import { revalidatePath } from 'next/cache';
import ListMessages from "../../../components/ListMessages";
import SaveMessageButton from "../../../components/SaveMessageButton";
import AddLikeButton from "../../../components/AddLikeButton";
import { redirect } from "next/navigation";
import {Link} from "next/link";


// Displays a single post and allows user to add a message
// Allows a user to add a like.

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
      

    async function handleAddLike(formData) {
      "use server";
    
      // Get the values from form
      
      const id = formData.get("idval");
      let likesVal = formData.get("likes");
      likesVal++;
    
      // Run the query to write message to database
      await sql`UPDATE bl_posts SET post_likes = ${likesVal} WHERE post_id = ${id}`;

      

      revalidatePath('/', 'layout');
      redirect(`/posts`);
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

        <br/><br/>
        <h4>Likes: {indivPost.rows[0].post_likes}</h4>
        <input name="likes"
          type="hidden"
          id="likes" 
          defaultValue={indivPost.rows[0].post_likes}
          readOnly={true}
        />

        {/*Hiding this value. Allows the id value to be sent with 
        form submission */}
        <input name="idval" 
          id="idval"
          type="hidden"
          defaultValue={indivPost.rows[0].post_id}
        />
        <br/>
        
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
        <br/><br/>

        <SaveMessageButton/>
      </form>
    
    <ListMessages id={params.postId}/>
    
    
    </>
  );
}