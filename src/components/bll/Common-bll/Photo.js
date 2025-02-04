import { useState, useRef } from "react"


export const PhotoBLL = () => {
    const [isUpload, setUpload] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)

    const filePicker = useRef(null)
    const dropZone = useRef(null)

    const handleDragOver = (e) => {
        e.preventDefault()
        dropZone.current.classList.add('dragover')
    }

    const handleDragLeave = () => {
        dropZone.current.classList.remove('dragover')
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files
        if (file.length != 0) {
            setUpload(true)
            setSelectedFile(file[0])
        }
        dropZone.current.classList.remove('dragover')
    }

    return {
        filePicker,
        dropZone,
        isUpload,
        setUpload,
        selectedFile,
        setSelectedFile,
        handleDragLeave,
        handleDragOver,
        handleDrop
    }
}
