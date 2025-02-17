import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { motion, AnimatePresence } from 'framer-motion';
import { GoTriangleUp } from "react-icons/go";
import { listVars } from '../../../common-static/motion/open-categories';

import { fetchGetSchools } from '../../../store/queries/Directions/get-schools';
import { fetchGetDirections } from '../../../store/queries/Directions/get-directions';
import { setChosenSchools } from '../../../store/slices/DirectionsSlice';


const FilterSchools = (props) => {
    const {
        search,
    } = props
    const [isActive, setActive] = useState(false)
    const dispatch = useDispatch()
    const schools = useSelector(state => state.directions.schools)
    const choisenSchools = useSelector(state => state.directions.schoolsFilter)
    const formatedSchools = useSelector(state => state.directions.formatedSchools)
    const formatedSubjects = useSelector(state => state.directions.formatedSubjects)
    const [isFirstLoad, setFirstLoad] = useState(true)

    useEffect(() => {
        dispatch(fetchGetSchools())

        return () => {
            dispatch(setChosenSchools([]))
        }
    }, [])

    useEffect(() => {
        if (choisenSchools.length != 0) {
            dispatch(fetchGetDirections(
                {
                    'page': 1,
                    'search': search,
                    'filters': {
                        'schools': formatedSchools,
                        'subjects': formatedSubjects
                    }
                }
            ))
            setFirstLoad(false)
        }
        if (choisenSchools.length == 0 && isFirstLoad == false) {
            dispatch(fetchGetDirections(
                {
                    'page': 1,
                    'search': search,
                    'filters': {
                        'schools': null,
                        'subjects': formatedSubjects
                    }
                }
            ))
        }
    }, [choisenSchools])

    return (
        <div className='directions__dropdownlist_container'>
            <div
                onClick={(e) => {
                    e.stopPropagation()
                    setActive(!isActive)
                }}
                className='filter__dropdown'>
                <div className='directions__label'>Высшие школы</div>
                <motion.div
                    initial={false}
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ ease: 'easeOut' }}
                >
                    <GoTriangleUp className='adminnewsadd__icon' />
                </motion.div>
                {
                    choisenSchools.length != 0 && (
                        <div className='filters_counter'>
                            {choisenSchools.length}
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
                            schools.map((el, index) => {
                                return <div
                                    key={index}
                                    className='dropdown_element'>
                                    <input
                                        onChange={() => {
                                            if (choisenSchools.includes(+el.id)) {
                                                dispatch(setChosenSchools(choisenSchools.filter(ind => ind != +el.id)))
                                            } else {
                                                dispatch(setChosenSchools([...choisenSchools, +el.id]))
                                            }
                                        }
                                        }
                                        checked={choisenSchools.includes(+el.id)}
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

export default FilterSchools