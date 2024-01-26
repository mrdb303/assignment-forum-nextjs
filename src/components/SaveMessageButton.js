"use client";

import { useFormStatus } from "react-dom";

export default function SaveMessageButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={pending ? "disabled" : ""}>
      {pending ? "Adding your message" : "Save Message"}
    </button>
  );
}