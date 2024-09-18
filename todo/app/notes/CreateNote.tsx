'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateNote() {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const router = useRouter()

  const create = async() => {
    await fetch('http://127.0.0.1:8090/api/collections/notes/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    })

    setTitle('')
    setDescription('')

    router.refresh()
  }

  return (
    <form onSubmit={create}>
      <h3>Create a new Note</h3>
      <input 
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea 
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">
        Create note
      </button>
    </form>
  )
}