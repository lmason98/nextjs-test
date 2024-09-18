import Link from "next/link"
import styles from "./Notes.module.css"
import CreateNote from "./CreateNote"

interface NoteType {
  id: string
  title: string
  description: string
  created: string
}

interface NoteComponentProps {
  note: NoteType
  key: string
}

async function getNotes() {
  const url: string = 'http://127.0.0.1:8090/api/collections/notes'
  const res = await fetch(
    `${url}/records?page=1&perPage=30`,
    {cache: 'no-store'}
  )

  const data: any = await res.json()

  return data?.items as NoteType[]
}

export default async function NotesPage() {
  const notes: NoteType[] = await getNotes()

  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes?.map((note) => {
          return <Note key={note.id} note={note} />
        })}
      </div>

      <CreateNote />
    </div>
  )
}

function Note({ note }: NoteComponentProps) {
  const { id, title, description, created } = note || {}

  const createdFormatted: string = new Date(created).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })

  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{description}</h5>
        <p>{createdFormatted}</p>
      </div>
    </Link>
  )
}