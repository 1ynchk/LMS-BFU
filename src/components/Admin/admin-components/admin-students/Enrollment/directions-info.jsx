import { useEffect, useState } from 'react'
import '../../../admin-static/css/admin-directions.css'
import { useDispatch, useSelector } from 'react-redux';

import { fetchGetDirections } from './../../../../../store/queries/Directions/get-directions';

import Pagination from '../../../../../base-components/pagination';

import { IoIosSearch } from "react-icons/io";
import { motion } from 'framer-motion';
import { GoTriangleUp } from "react-icons/go";

const DirectionsInfo = (props) => {
    const dispatch = useDispatch()
    const directions = useSelector(state => state.directions.directions)
    const loading = useSelector(state => state.directions.loading)
    const [sortedDirections, setSortedDirections] = useState([])
    const [search, setSearch] = useState(null)

    // pagination
    const count = useSelector(state => state.directions.count)
    const prev_page = useSelector(state => state.directions.prev_page)
    const next_page = useSelector(state => state.directions.next_page)
    const current_page = useSelector(state => state.directions.current_page)

    useEffect(() => {
        dispatch(fetchGetDirections(null))
    }, [])

    useEffect(() => {
        if (!loading && directions.length != 0) {
            setSortedDirections([...directions].sort((a, b) => a.id - b.id))
        }
    }, [loading])

    const handleSubmit = (e) => {

    }

    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="directions">
            <div className='directions__search_container'>
                <form onSubmit={() => handleSubmit}>
                    <input
                        className='subsection__input'
                        type='text'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        className='directions_search'
                        type='submit'
                    >
                        <IoIosSearch className='search_icon' />
                    </button>
                </form>
            </div>
            <div className='directions__filters'>
                <Filter />
            </div>
            <div className='directions__wrapper'>

                <div className='directions__nav'>
                    <div className='directions__nav_title_id'>ID</div>
                    <div className='directions__nav_title_name'>Название</div>
                    <div className='directions__nav_title'>Предметы бюджет</div>
                    <div className='directions__nav_title'>Баллы бюджет</div>
                    <div className='directions__nav_title'>Предметы платн.</div>
                    <div className='directions__nav_title'>Баллы платн.</div>
                </div>
                {
                    sortedDirections.map(el => {
                        return <Direction
                            key={el.id}
                            id={el.id}
                            name={el.name}
                            subjects_budget_paid={el.subjects_budget_paid}
                        />
                    })
                }

            </div>
            <div className='pagination__container'>
                <Pagination
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

const Filter = () => {
    const [isActive, setActive] = useState(false)

    return (
        <div
            onClick={() => setActive(!isActive)}
            className='directions__dropdownlist_container'>
            <div className='directions__label'>Факультет</div>
            <motion.div
                initial={false}
                animate={{ rotate: isActive ? 180 : 0 }}
                transition={{ ease: 'easeOut' }}
            >
                <GoTriangleUp className='adminnewsadd__icon' />
            </motion.div>
            <div className='directions__dropdown'>
                {
                    isActive && (
                        <div className='dropdown_element'>
                            hello
                        </div>
                    )
                }
            </div>
        </div>
    )
}


export default DirectionsInfo