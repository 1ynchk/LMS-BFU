
import NewsEditor from "../../../../base-components/text-editor/news-editor"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from 'react-redux';

import axios from 'axios';
import { host } from '../../../../store/root';
import { fetchScratch } from './../../../../store/queries/News/SaveScratch';

import { EditorState, convertToRaw } from 'draft-js'

import { RiFolderUploadLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { GoTriangleUp } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";

const AdminNewsAdd = () => {

    // hooks
    const dispatch = useDispatch()

    // fetch data
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const [selectedFile, setSelectedFile] = useState(null)
    const [selected, setSelected] = useState(null)

    // conditions
    const [allowPub, setAllowPub] = useState(false)
    const [isName, setName] = useState('')
    const [lengthContent, setLengthContent] = useState(false)
    const [isUpload, setUpload] = useState(false)
    const [isActiveCats, setActiveCats] = useState(false)
    const [typeSubmit, setTypeSubmit] = useState(null)
    const [categories, setCategories] = useState([])

    // refs
    const wrapperZone = useRef(null)
    const dropZone = useRef(null)
    const filePicker = useRef(null)

    useEffect(() => {
        axios.get(
            `${host}/api_news/get-cats/`,
            {
                withCredentials: true
            }
        )
            .then((resp) => {
                setCategories(resp.data.data)
            })
    }, [])

    useEffect(() => {
        const btns = document.querySelectorAll('.adminnewsadd__button')
        if (isName.length > 10 && lengthContent) {
            btns.forEach(e => {
               e.classList.add('active') 
            });
            setAllowPub(true)
        } else {
            btns.forEach(e => {
               e.classList.remove('active') 
            });
            setAllowPub(false)
        }
    }, [isName, lengthContent])
    
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

    const handleSelected = (e) => {
        setSelected(e.target.value)
    }

    const changeName = (e) => {
        const value = e.target.value
        setName(value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const newsValueState = editorState.getCurrentContent()
        const value = JSON.stringify(convertToRaw(newsValueState))

        const form = new FormData()
        form.append('title', isName)
        form.append('category', selected)
        form.append('image', selectedFile)
        form.append('value', value)

        if (typeSubmit == 'scratch') {
            dispatch(fetchScratch(form))
        }
        if (typeSubmit == 'publish') {

        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: 'easeIn', duration: 0.3 }}
            ref={wrapperZone}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="adminnewsadd">

            <div className="subsection__name">Добавить новость</div>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="subsections__wrapper">
                    <div>
                        <div className="subsection__subcontainer">
                            <div className="subsection__label">Название</div>
                            <input
                                onChange={(e) => changeName(e)}
                                className="subsection__input" />
                            <AnimatePresence>
                                {
                                    isName.length < 10 && (
                                        <motion.div 
                                            initial={{opacity: 0, y: 10}}
                                            animate={{opacity: 1, y: 0}}
                                            exit={{opacity: 0, y: 10}}
                                            style={{overflow: 'hidden'}}
                                            className="subsection__warn">
                                            Название должно быть длинее 10 символов
                                        </motion.div>
                                    )
                                }
                            </AnimatePresence>
                        </div>
                        <Categories
                            selected={selected}
                            handleSelected={handleSelected}
                            isActiveCats={isActiveCats}
                            setActiveCats={setActiveCats}
                            categories={categories}
                        />
                    </div>
                    <Photo
                        filePicker={filePicker}
                        isUpload={isUpload}
                        setUpload={setUpload}
                        setSelectedFile={setSelectedFile}
                        selectedFile={selectedFile}
                        dropZone={dropZone}
                    />
                </div>

                <div className='subsection__label news_add'>Содержимое новости</div>
                <NewsEditor
                    setEditorState={setEditorState}
                    editorState={editorState}
                    setLengthContent={setLengthContent} 
                />
                <div className="adminnewsadd__btn_container">
                    <button
                        onClick={() => {
                            setTypeSubmit('scratch')
                        }}
                        type="submit"
                        disabled={!allowPub}
                        className='adminnewsadd__button'>
                        Добавить в черновики
                    </button>
                    <button
                        onClick={() => {
                            setTypeSubmit('publish')
                        }}
                        type="submit"
                        disabled={!allowPub}
                        className='adminnewsadd__button'>
                        Опубликовать
                    </button>
                </div>
            </form>
        </motion.div>
    )
}

const Photo = (
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

const Categories = (
    { handleSelected, isActiveCats, setActiveCats, categories, selected }) => {
    return (
        <div className="subsection__subcontainer">
            <div className="subsection__label">Категории</div>
            <div className="subsection__list">
                <div className='adminnewsadd__label'>Без категории</div>
                <input
                    onChange={handleSelected}
                    type='radio'
                    defaultChecked
                    name='cat' />
            </div>
            <div
                onClick={() => setActiveCats(!isActiveCats)}
                className="subsection__list open_btn">
                <button
                    type="button"
                    className='adminnewsadd__label'>Все категории</button>
                <motion.div
                    initial={false}
                    animate={{ rotate: isActiveCats ? 180 : 0 }}
                    transition={{ ease: 'easeOut' }}
                >
                    <GoTriangleUp className='adminnewsadd__icon' />
                </motion.div>

            </div>
            <AnimatePresence exitBeforeEnter>
                {
                    isActiveCats && (
                        <motion.div
                            variants={listVars}
                            initial='initial'
                            animate='visible'
                            exit={{
                                opacity: 0,
                                height: 0
                            }}
                            style={{ overflow: 'hidden' }}
                            className='adminnewsadd__listcats'>
                            {categories.map((el, index) => {
                                return (
                                    <div key={index} className='subsection__list'>
                                        <div className='adminnewsadd__cat'>{el.title}</div>
                                        <input
                                            value={el.slug}
                                            checked={selected === el.slug}
                                            type='radio'
                                            name='cat'
                                            onChange={handleSelected}
                                        />
                                    </div>)
                            })}
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    )
}

const listVars = {
    initial: {
        height: 0,
        opacity: 0
    },
    visible: {
        opacity: 1,
        height: 'auto'
    }
}

export default AdminNewsAdd