import '../../common-static/css/news-editor.css'

import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { useRef, useEffect, useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const NewsEditor = () => {

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
        return () => {
            setIsMounted(false)
        }
    }, [])

    return (
        <div className='newseditor'>
            {isMounted && <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                toolbar={{
                    options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "list",
                        "textAlign",
                        "link",
                        "history"],
                    inline: {
                        options: ["bold", "italic", "underline", "strikethrough"],
                    },
                    fontSize: {
                        options: [8, 10, 12, 14, 16, 18, 24, 36],
                    },
                    list: {
                        options: ["unordered", "ordered"],
                    },
                    textAlign: {
                        options: ["left", "center", "right"],
                    },
                    link: {
                        options: ["link", "unlink"],
                    },
                }}
            />}
        </div>
    )
}

export default NewsEditor