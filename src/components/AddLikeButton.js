"use client";

import { useFormStatus } from "react-dom";

export default function AddLikeButton(params){

  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={pending ? "disabled" : ""}>
      {pending ? "Adding your Like" : "Add Like"}
    </button>
  );
}




