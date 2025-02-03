import { RiFolderUploadLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

export const Photo = (
    { dropZone, selectedFile, setSelectedFile, isUpload, setUpload, filePicker }) => {

    const handlePickFile = (e) => {
        filePicker.current.click()
    }

    const handleOnChange = (e) => {
        setUpload(true)
        setSelectedFile(e.target.files[0])
    }

    return (
        <div className="subsections__container photo_container">
            <div className="subsection__label">Фотография</div>
            <div
                ref={dropZone}
                className='adminnewsadd__file_wrapper'>
                <button
                    type="button"
                    onClick={handlePickFile}
                    className='adminnewsadd__filePicker'>
                    Загрузить
                    <RiFolderUploadLine />
                </button>
                {
                    isUpload && (
                        <div className="adminnewsadd__fileName">
                            {
                                String(selectedFile.name).slice(0, 20) + (
                                    String(selectedFile.name).length > 20 ? '...' : '')
                            }
                            <span
                                onClick={() => {
                                    setUpload(false)
                                    setSelectedFile(null)
                                }}
                                className="adminnewsadd__fileName_cross">
                                <RxCross2 />
                            </span>
                        </div>
                    )
                }
            </div>
            <input
                ref={filePicker}
                onChange={handleOnChange}
                className='adminnewsadd__input'
                type='file'
                accept='image/*,.png,.jpg' />
        </div>
    )
}