import { useEffect, useState } from 'react'
import '../../../admin-static/css/admin-directions.css'
import { useDispatch, useSelector } from 'react-redux';

import { fetchGetDirections } from './../../../../../store/queries/Directions/get-directions';
import { fetchGetSchools } from './../../../../../store/queries/Directions/get-schools';

import Pagination from '../../../../../base-components/pagination';
import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

import { motion, AnimatePresence } from 'framer-motion';
import { GoTriangleUp } from "react-icons/go";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const DirectionsInfo = (props) => {
    const dispatch = useDispatch()
    const directions = useSelector(state => state.directions.directions)
    const loading = useSelector(state => state.directions.loading)
    const [sortedDirections, setSortedDirections] = useState([])

    // pagination
    const count = useSelector(state => state.directions.count)
    const prev_page = useSelector(state => state.directions.prev_page)
    const next_page = useSelector(state => state.directions.next_page)
    const current_page = useSelector(state => state.directions.current_page)

    // search
    const [search, setSearch] = useState(null)

    useEffect(() => {
        dispatch(fetchGetDirections({ 'page': 1, 'search': null }))
    }, [])

    useEffect(() => {
        if (!loading && directions.length != 0) {
            setSortedDirections([...directions].sort((a, b) => a.id - b.id))
        }
    }, [loading])

    useEffect(() => {
        const delayDebounce = setTimeout(
            () => {
                if (search != null && search.trim()) {
                    dispatch(fetchGetDirections({ 'page': 1, 'search': search }))
                }
            }, 600
        )
        return () => clearTimeout(delayDebounce)
    }, [search])

    const handleClearSearch = () => {
        setSearch(null)
        dispatch(fetchGetDirections({ 'page': 1, 'search': null }))
    }

    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="directions">
            <div className='directions__search_container'>
                <input
                    value={search == null ? '' : search}
                    placeholder='Введите название направления или же название высшей школы...'
                    className='subsection__input'
                    type='text'
                    onChange={(e) => {
                        setSearch(e.target.value)
                        if (e.target.value == '') {
                            handleClearSearch()
                        }
                    }}
                />
                {
                    search != null && search != '' && (
                        <button
                            disabled={search == null || search == '' ? true : false}
                            onClick={() => handleClearSearch()}
                            className='directions__search direction_close'>
                            <IoCloseOutline />
                        </button>

                    )
                }
                <button
                    disabled={search == null || search == '' ? true : false}
                    className='directions__search'>
                    <IoIosSearch />
                </button>

            </div>
            <div className='directions__filters'>
                <FilterSchools />
            </div>
            <div className='directions__wrapper'>

                <div className='directions__nav'>
                    <div className='directions__nav_title_id'>ID</div>
                    <div className='directions__nav_title_name'>Школа</div>
                    <div className='directions__nav_title_name'>Название</div>
                    <div className='directions__nav_title'>Предметы бюджет</div>
                    <div className='directions__nav_title'>Баллы бюджет</div>
                    <div className='directions__nav_title'>Предметы платн.</div>
                    <div className='directions__nav_title'>Баллы платн.</div>
                </div>
                {
                    loading != true && sortedDirections.map(el => {
                        return <Direction
                            key={el.id}
                            id={el.id}
                            name={el.name}
                            subjects_budget_paid={el.subjects_budget_paid}
                            school={el.school}
                        />
                    })
                }
                {
                    loading && (
                        <div className='directions__loading'>
                            <AiOutlineLoading3Quarters className='loadingscreen__load' />
                        </div>
                    )
                }

            </div>
            <div className='pagination__container'>
                <Pagination
                    search={search}
                    prev_page={prev_page}
                    next_page={next_page}
                    page_size={5}
                    count={count}
                    current_page={current_page}
                />
            </div>
        </motion.div>
    )
}

const Direction = (props) => {
    const {
        id,
        name,
        subjects_budget_paid,
        school
    } = props

    const [sortedSubjectsBudget, setSortedSubjectsBudget] = useState([])
    const [sortedSubjectsPaid, setSortedSubjectsPaid] = useState([])

    useEffect(() => {
        setSortedSubjectsBudget([...subjects_budget_paid].filter(el => el.type == 'B'))
        setSortedSubjectsPaid([...subjects_budget_paid].filter(el => el.type == 'P'))
    }, [])

    return (
        <div className='direction'>
            <div className='direction__title_id'>{id}</div>
            <div className='direction__title direction_name'>
                {school}
            </div>
            <div className='direction__title direction_name'>
                {name}
            </div>
            <div className='direction__title'>
                {
                    sortedSubjectsBudget.map((el, index) => {
                        return <div key={index} className='direction__subtitle'>{el.name}</div>
                    }
                    )
                }
            </div>
            <div className='direction__title'>
                {
                    sortedSubjectsBudget.map((el, index) => {
                        return <div key={index} className='direction__subtitle'>{el.points}</div>
                    }
                    )
                }
            </div>
            <div className='direction__title'>
                {
                    sortedSubjectsPaid.map((el, index) => {
                        return <div key={index} className='direction__subtitle'>{el.name}</div>
                    }
                    )
                }
            </div>
            <div className='direction__title'>
                {
                    sortedSubjectsPaid.map((el, index) => {
                        return <div key={index} className='direction__subtitle'>{el.points}</div>
                    }
                    )
                }
            </div>
        </div>
    )
}

const FilterSchools = () => {
    const [isActive, setActive] = useState(false)
    const dispatch = useDispatch()
    const schools = useSelector(state => state.directions.schools)

    useEffect(() => {
        dispatch(fetchGetSchools())
    }, [])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.directions__dropdown') &&
                !e.target.closest('.directions__dropdownlist_container')) {
                setActive(false)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }

    }, [])

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
            </div>
            <AnimatePresence>
                {isActive && (<motion.div
                    className='directions__dropdown'
                    initial='initial'
                    exit={{ opacity: 0, y: -5 }}
                    animate='visible'
                    variants={profileListVars}
                >
                    {
                        isActive && (
                            schools.map((el, index) => {
                                return <div
                                    key={index}
                                    className='dropdown_element'>
                                    <div className='dropdown_element__name'>
                                        {el.name}
                                    </div>
                                    <input
                                        type='checkbox'
                                        className='directions__checkbox'
                                    />
                                </div>
                            })

                        )
                    }
                </motion.div>)}
            </AnimatePresence>

        </div>
    )
}

const profileListVars = {
    initial: {
        opacity: 0,
        y: -10
    },
    visible: {
        opacity: 1,
        y: 0
    }
}

export default DirectionsInfo