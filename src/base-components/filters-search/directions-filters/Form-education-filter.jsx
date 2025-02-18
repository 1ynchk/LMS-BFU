import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { motion, AnimatePresence } from 'framer-motion';
import { GoTriangleUp } from "react-icons/go";
import { listVars } from '../../../common-static/motion/open-categories';

import { fetchGetDirections } from '../../../store/queries/Directions/get-directions';
import { setChosenFormEducation, setChosenSchools } from '../../../store/slices/DirectionsSlice';


const FilterForms = (props) => {
    const {
        search,
    } = props

    const forms = [
        { 'id': 'Z', 'name': 'Заочная' },
        { 'id': 'O', 'name': 'Очная' },
    ]

    const [isActive, setActive] = useState(false)
    const dispatch = useDispatch()
    const formatedSchools = useSelector(state => state.directions.formatedSchools)
    const formatedSubjects = useSelector(state => state.directions.formatedSubjects)
    const formatedFormEducation = useSelector(state => state.directions.formatedFormEducation)
    const formEducationFilter = useSelector(state => state.directions.formEducationFilter)

    const [isFirstLoad, setFirstLoad] = useState(true)

    useEffect(() => {
        return () => {
            dispatch(setChosenFormEducation([]))
        }
    }, [])

    // useEffect(() => {
    //     if (formEducationFilter.length != 0) {
    //         dispatch(fetchGetDirections(
    //             {
    //                 'page': 1,
    //                 'search': search,
    //                 'filters': {
    //                     'schools': formatedSchools,
    //                     'subjects': formatedSubjects,
    //                     'form_education': formatedFormEducation
    //                 }
    //             }
    //         ))
    //         setFirstLoad(false)
    //     }
    //     if (formEducationFilter.length == 0 && isFirstLoad == false) {
    //         dispatch(fetchGetDirections(
    //             {
    //                 'page': 1,
    //                 'search': search,
    //                 'filters': {
    //                     'schools': null,
    //                     'subjects': formatedSubjects,
    //                     'form_education': formatedFormEducation
    //                 }
    //             }
    //         ))
    //     }
    // }, [formatedFormEducation])

    return (
        <div className='directions__dropdownlist_container'>
            <div
                onClick={(e) => {
                    e.stopPropagation()
                    setActive(!isActive)
                }}
                className='filter__dropdown'>
                <div className='directions__label'>Форма обучения</div>
                <motion.div
                    initial={false}
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ ease: 'easeOut' }}
                >
                    <GoTriangleUp className='adminnewsadd__icon' />
                </motion.div>
                {
                    formEducationFilter.length != 0 && (
                        <div className='filters_counter'>
                            {formEducationFilter.length}
                        </div>
                    )
                }
            </div>
            <AnimatePresence exitBeforeEnter>
                {isActive && (<motion.div
                    className='directions__dropdown'
                    variants={listVars}
                    initial='initial'
                    animate='visible'
                    exit={{
                        opacity: 0,
                        height: 0
                    }}
                    style={{ overflow: 'hidden' }}
                >
                    {
                        isActive && (
                            forms.map((el, index) => {
                                return <div
                                    key={index}
                                    className='dropdown_element'>
                                    <input
                                        onChange={() => {
                                            if (formEducationFilter.includes(el.id)) {
                                                dispatch(setChosenFormEducation(formEducationFilter.filter(ind => ind != el.id)))
                                            } else {
                                                dispatch(setChosenFormEducation([...formEducationFilter, el.id]))
                                            }
                                        }
                                        }
                                        checked={formEducationFilter.includes(el.id)}
                                        type='checkbox'
                                        className='directions__checkbox'
                                    />
                                    <div className='dropdown_element__name'>
                                        {el.name}
                                    </div>
                                </div>
                            })
                        )
                    }
                </motion.div>)}
            </AnimatePresence>

        </div>
    )
}

export default FilterForms