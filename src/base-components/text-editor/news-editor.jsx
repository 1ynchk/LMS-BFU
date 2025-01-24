import { EditorState, Editor } from 'draft-js'
import { useEffect, useState } from 'react'

const NewsEditor = () => {

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    
    return (
        <div>

        </div>
    )
}

export default NewsEditor