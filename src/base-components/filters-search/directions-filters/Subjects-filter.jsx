import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { motion, AnimatePresence } from 'framer-motion';
import { GoTriangleUp } from "react-icons/go";
import { listVars } from '../../../common-static/motion/open-categories';

import { fetchGetDirections } from '../../../store/queries/Directions/get-directions';
import { setChosenSubjects } from '../../../store/slices/DirectionsSlice';
import { fetchGetSubjects } from '../../../store/queries/Directions/get-subjects';


const SubjectsEGE = (props) => {
    const {
        search
    } = props
    const [isActive, setActive] = useState(false)
    const dispatch = useDispatch()
    const subjects = useSelector(state => state.directions.subjects)
    const choisenSubjects = useSelector(state => state.directions.choisenSubjects)
    const formatedSubjects = useSelector(state => state.directions.formatedSubjects)
    const formatedSchools = useSelector(state => state.directions.formatedSchools)
    const [isFirstLoad, setFirstLoad] = useState(true)

    useEffect(() => {
        dispatch(fetchGetSubjects())

        return () => {
            dispatch(setChosenSubjects([]))
        }
    }, [])

    useEffect(() => {
        if (choisenSubjects.length != 0) {
            dispatch(fetchGetDirections(
                {
                    'page': 1,
                    'search': search,
                    'filters': {
                        'subjects': formatedSubjects,
                        'schools': formatedSchools
                    }
                }
            ))
            setFirstLoad(false)
        }
        if (choisenSubjects.length == 0 && isFirstLoad == false) {
            dispatch(fetchGetDirections(
                {
                    'page': 1,
                    'search': search,
                    'filters': {
                        'subjects': null,
                        'schools': formatedSchools
                    }
                }
            ))
        }
    }, [choisenSubjects])

    return (
        <div className='directions__dropdownlist_container'>
            <div
                onClick={(e) => {
                    e.stopPropagation()
                    setActive(!isActive)
                }}
                className='filter__dropdown'>
                <div className='directions__label'>Предметы</div>
                <motion.div
                    initial={false}
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ ease: 'easeOut' }}
                >
                    <GoTriangleUp className='adminnewsadd__icon' />
                </motion.div>
                {
                    choisenSubjects.length != 0 && (
                        <div className='filters_counter'>
                            {choisenSubjects.length}
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
                            subjects.map((el, index) => {
                                return <div
                                    key={index}
                                    className='dropdown_element'>
                                    <input
                                        onChange={() => {
                                            if (choisenSubjects.includes(+el.id)) {
                                                dispatch(setChosenSubjects(choisenSubjects.filter(ind => ind != +el.id)))
                                            } else {
                                                dispatch(setChosenSubjects([...choisenSubjects, +el.id]))
                                            }
                                        }
                                        }
                                        checked={choisenSubjects.includes(+el.id)}
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

export default SubjectsEGE