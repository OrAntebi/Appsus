import { NoteTxt } from '../NoteType/NoteTxt.jsx'
import { NoteImg } from '../NoteType/NoteImg.jsx'
import { NoteVideo } from '../NoteType/NoteVideo.jsx'
import { NoteTodos } from '../NoteType/NoteTodos.jsx'


export function SpecificNote({ note }) {
    
    const components = {
        NoteTxt,
        NoteImg,
        NoteVideo,
        NoteTodos,
    }

    const Component = components[note.type]

    if (!Component) return <div>Unknown note type</div>

    return <Component note={note} />
}