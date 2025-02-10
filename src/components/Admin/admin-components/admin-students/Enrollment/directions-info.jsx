import { useEffect, useState } from 'react'
import '../../../admin-static/css/admin-directions.css'
import { useDispatch, useSelector } from 'react-redux';

import { fetchGetDirections } from './../../../../../store/queries/Directions/get-directions';

import { IoIosSearch } from "react-icons/io";
import { motion } from 'framer-motion';
import { GoTriangleUp } from "react-icons/go";

const DirectionsInfo = (props) => {
    const dispatch = useDispatch()
    const directions = useSelector(state => state.directions.directions)
    const loading = useSelector(state => state.directions.loading)
    const [search, setSearch] = useState(null)

    useEffect(() => {
        dispatch(fetchGetDirections())
    }, [])

    const handleSubmit = (e) => {

    }

    console.log(directions)

    return (
        <div className="directions">
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
                    <div className='directions__nav_title'>ID</div>
                    <div className='directions__nav_title'>Название</div>
                    <div className='directions__nav_title'>Предметы</div>
                    <div className='directions__nav_title'>Баллы бюджет</div>
                    <div className='directions__nav_title'>Баллы платн.</div>
                </div>
                {
                    directions.map(el => {
                        return <Direction
                            id={el.id}
                            name={el.name}
                            subjects_budget={el.subjects_budget}

                        />
                    })
                }

            </div>
        </div>
    )
}

const Direction = (props) => {

    const {
        id,
        name,
        subjects_budget
    } = props

    console.log(subjects_budget)
    return (
        <div className='direction'>
            <div className='direction__title'>{id}</div>
            <div className='direction__title'>
                {name.length > 30 ? name.slice(0, 30) + '...' : name}
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