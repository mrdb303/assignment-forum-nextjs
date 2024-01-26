"use client";

import { useFormStatus } from "react-dom";

export default function AddPostButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={pending ? "disabled" : ""}>
      {pending ? "Adding your Post" : "Save Post"}
    </button>
  );
}
