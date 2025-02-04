
import NewsEditor from "../../../../base-components/text-editor/news-editor"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from 'react-redux';

import axios from 'axios';
import { host } from '../../../../store/root';
import { fetchScratch } from './../../../../store/queries/News/SaveScratch';

import { EditorState, convertToRaw } from 'draft-js'

import { GoTriangleUp } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";

import { PhotoBLL } from "../../../bll/Common-bll/Photo";
import { Photo } from "../../../../base-components/Photo";
import { InputWarning } from "../../../../base-components/input-warning";

const AdminNewsAdd = () => {

    // hooks
    const dispatch = useDispatch()

    // fetch data
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const [selected, setSelected] = useState(null)

    // conditions
    const [allowPub, setAllowPub] = useState(false)
    const [isName, setName] = useState(null)
    const [lengthContent, setLengthContent] = useState(false)
    const [isActiveCats, setActiveCats] = useState(false)
    const [typeSubmit, setTypeSubmit] = useState(null)
    const [categories, setCategories] = useState([])

    // refs


    // photo bll component
    const {
        filePicker,
        dropZone,
        isUpload,
        setUpload,
        selectedFile,
        setSelectedFile,
        handleDragLeave,
        handleDragOver,
        handleDrop } = PhotoBLL()

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
        if (isName != null && isName.length > 10 && lengthContent) {
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
        <div
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
                                    isName == null || isName.length < 10 && (
                                        <InputWarning 
                                            text='Название должно быть длинее 10 символов' />
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