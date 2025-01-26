
import NewsEditor from "../../../../base-components/text-editor/news-editor"
import { useEffect, useRef, useState } from "react"

import axios from 'axios';
import { host } from '../../../../store/root';
import { getCSRFToken } from '../../../bll/cookies/getCSRF';

import { RiFolderUploadLine } from "react-icons/ri";
import { GoTriangleUp } from "react-icons/go";
import { motion, AnimatePresence, easeIn } from "framer-motion";

const AdminNewsAdd = () => {
    const [categories, setCategories] = useState([])
    const [isActiveCats, setActiveCats] = useState(false)
    const [selected, setSelected] = useState(null)
    const wrapperZone = useRef(null)
    const dropZone = useRef(null)
    const listCats = useRef(null)

    useEffect(() => {
        const token = getCSRFToken()
        axios.get(
            `${host}/api_news/get-cats/`,
            {
                headers: {
                    'X-CSRFToken': token,
                },
                withCredentials: true
            }
        )
            .then((resp) => {
                setCategories(resp.data.data)
            })
    }, [])

    const handleDragOver = (e) => {
        e.preventDefault()
        dropZone.current.classList.add('dragover')
    }

    const handleDragLeave = () => {
        dropZone.current.classList.remove('dragover')
    }

    const handleDrop = (e) => {
        e.preventDefault()
        dropZone.current.classList.remove('dragover')
    }

    const handleSelected = (e) => {
        setSelected(e.target.value)
    }

    return (
        <div
            ref={wrapperZone}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="adminnewsadd">
            <form>
                <div className="subsection__name">Добавить новость</div>
                <div className="subsection__container">
                    <div className="subsection__subcontainer">
                        <div className="subsection__label">Категории</div>
                        <div className='subsection__list_wrapper'>
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
                                                            value={'option' + index}
                                                            checked={selected === 'option' + index}
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
                    </div>
                    <div className="subsection__subcontainer">
                        <div className="subsection__label">Фотография</div>
                        <div
                            ref={dropZone}
                            className='adminnewsadd__file_wrapper'>
                            <button className='adminnewsadd__filePicker'>
                                Загрузить
                                <RiFolderUploadLine />
                            </button>
                        </div>
                        <input className='adminnewsadd__input'
                            type='file'
                            accept='image/*,.png,.jpg' />
                    </div>
                </div>
                <div className='subsection__label news_add'>Содержимое новости</div>
                <NewsEditor />
                <div className="adminnewsadd__btn_container">
                    <button className='adminnewsadd__button'>Добавить в черновики</button>
                    <button className='adminnewsadd__button'>Опубликовать</button>
                </div>
            </form>
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