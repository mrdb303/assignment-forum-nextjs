/*
CREATE TABLE IF NOT EXISTS bl_comments (
  com_id SERIAL PRIMARY KEY,
  com_post_id INTEGER REFERENCES bl_posts(post_id),
  com_author VARCHAR(40) NOT NULL,
  com_content VARCHAR(255) NOT NULL,
  com_date timestamp[] NOT NULL DEFAULT array[now()]
);
*/


//add a comment

// NEED Params for this to work

export default function AddComment(searchParams) {

  // This function runs when the form is submitted
  async function handleAddComment(formData) {
    "use server";

    // Get the values from form
    const author = formData.get("authorname");
    const content = formData.get("content");
    const id = searchParams.commentId;
    

    // Run the query to write message to database
    await sql`INSERT INTO bl_comments (com_post_id, com_author, com_comment) VALUES ( ${id}, ${author}, ${content})`;

    // revalidate path and refresh to display
    revalidatePath("/");

    // page redirect
    redirect("/posts/123");
  }


  
  return (
    <div>
      <h2>Add a Comment</h2>
      <form action={handleAddComment}>
        <label htmlFor="name">Name</label>
        <input name="authorname" id="authorname" placeholder="Name" />

        <label htmlFor="content">Your message</label>
        <input name="content" id="content" placeholder="content" />

        {/* <SaveMessageButton/> */}
      </form>
    </div>
  );
}