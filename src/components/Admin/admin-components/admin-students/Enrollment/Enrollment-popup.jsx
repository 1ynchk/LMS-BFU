
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import { IoCloseCircleOutline } from "react-icons/io5";
import { GoIssueClosed } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import { closePopup } from '../../../../../store/slices/AdminFunctionsSlice';
import { useNavigate } from 'react-router-dom';

const EnrollmentPopup = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isRejected = useSelector(state => state.admin_functions.isRejected)
    const isPopup = useSelector(state => state.admin_functions.isPopup)

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
                            className="enrollment_popup__container">
                            <IoIosClose
                                onClick={() => {
                                    dispatch(closePopup())
                                    navigate('/admin/students/enrollment/')
                                }}
                                className='enrollment_popup__close_btn' />

                            {
                                !isRejected && (
                                    <>
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
                                    </>
                                )
                            }
                            {
                                isRejected && (
                                    <>
                                        <IoCloseCircleOutline
                                            className='enrollment_popup__image' />
                                        <div className='enrollment_popup__title'>
                                            Студент не был зачислен. Причины можно посмотреть в описании.
                                        </div>
                                        <div className='enrollment_popup__btn_container centred_btn_container'>
                                            <button
                                                onClick={() => dispatch(closePopup())}
                                                className='subsection__btn popup_enrollment'>
                                                    Исправить данные
                                            </button>

                                        </div>
                                    </>
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