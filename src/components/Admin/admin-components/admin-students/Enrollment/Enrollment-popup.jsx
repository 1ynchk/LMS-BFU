
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import { IoCloseCircleOutline } from "react-icons/io5";
import { GoIssueClosed } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import { closePopup } from '../../../../../store/slices/AdminFunctionsSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from './../../../../../base-components/loading/loading-element';

const EnrollmentPopup = (props) => {

    const {
        clearStateCommonInfo,
        clearStateStudentDocuments,
        clearStateRussianDocs,
        clearStateForeignDocs,
        setDirection
    } = props

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isRejected = useSelector(state => state.admin_functions.isRejected)
    const isPopup = useSelector(state => state.admin_functions.isPopup)
    const loading = useSelector(state => state.admin_functions.loading)

    useEffect(() => {
        if (isPopup && isRejected == false) {
            clearStateCommonInfo()
            clearStateStudentDocuments()
            clearStateRussianDocs()
            clearStateForeignDocs()
            setDirection(null)
        }
    }, [isRejected, isPopup])

    return (
        <AnimatePresence>
            {
                isPopup && (
                    <motion.div
                        onClick={() => {
                            navigate('/admin/students/enrollment/')
                            dispatch(closePopup())
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 1 }}
                        transition={{ delay: 0.2, ease: 'easeInOut' }}
                        className="enrollment_popup">
                        <motion.div
                            onClick={(e) => { e.stopPropagation() }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, ease: 'easeInOut' }}
                            exit={{ scale: 0 }}
                            className="enrollment_popup__container"
                        >
                            <IoIosClose
                                onClick={() => {
                                    dispatch(closePopup())
                                    navigate('/admin/students/enrollment/')
                                }}
                                className='enrollment_popup__close_btn' />
                            {
                                loading && isRejected == null && (
                                    <div className='enrollment_popup__container space_around'>
                                        <Loading />
                                        <div className='enrollment_popup__title'>
                                            Подождите немного, это может занять некоторое время.
                                        </div>
                                    </div>
                                )
                            }
                            {
                                !isRejected && !loading && (
                                    <motion.div
                                        className="enrollment_popup__container"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <GoIssueClosed
                                            className='enrollment_popup__image' />
                                        <div className='enrollment_popup__title'>
                                            Студент был успешно зачислен в группу
                                        </div>

                                        <div className='enrollment_popup__btn_container'>
                                            <button
                                                className='subsection__btn popup_enrollment'>
                                                К странице студента
                                            </button>
                                            <button
                                                onClick={() => {
                                                    dispatch(closePopup())
                                                    navigate('/admin/students/all/')
                                                }}
                                                className='subsection__btn popup_enrollment'>К зачислению</button>
                                        </div>
                                    </motion.div>
                                )
                            }
                            {
                                isRejected && !loading && (
                                    <motion.div
                                        className="enrollment_popup__container"
                                        transition={{ delay: 0.5 }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <IoCloseCircleOutline
                                            className='enrollment_popup__image' />
                                        <div className='enrollment_popup__title'>
                                            Студент с такими данными уже существует.
                                        </div>
                                        <div className='enrollment_popup__btn_container centred_btn_container'>
                                            <button
                                                onClick={() => {
                                                    dispatch(closePopup())
                                                    navigate('/admin/students/enrollment/')
                                                }}
                                                className='subsection__btn popup_enrollment'>
                                                Исправить данные
                                            </button>
                                        </div>
                                    </motion.div>
                                )
                            }

                        </motion.div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default EnrollmentPopup