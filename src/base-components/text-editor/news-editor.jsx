import '../../common-static/css/news-editor.css'

import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { useEffect, useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const NewsEditor = ({setLengthContent, lengthContent}) => {

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const [isMounted, setIsMounted] = useState(false)
    const [symbolsCount, setSymbolsCount] = useState(0)

    useEffect(() => {
        setIsMounted(true)
        return () => {
            setIsMounted(false)
        }
    }, [])

    useEffect(() => {
        const contentStateLength = editorState.getCurrentContent().getPlainText().length

       setSymbolsCount(contentStateLength) 

       if(contentStateLength >= 300) {
            setLengthContent(true)
       } else {
            setLengthContent(false)
       }
    }, [editorState])

    return (
        <div className='newseditor'>
            {isMounted && <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                stripPastedStyles={true}
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
            <SymbolsCount symbolsCount={symbolsCount}/>
        </div>
    )
}

const SymbolsCount = ({ symbolsCount }) => {

    return (
        <div className='symbolscount'>
            <div className='symbolscount__container'>{symbolsCount}/300</div>
        </div>
    )
}

export default NewsEditor