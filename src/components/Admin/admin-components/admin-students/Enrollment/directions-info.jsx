import { useEffect, useState } from 'react'
import '../../../admin-static/css/admin-directions.css'
import { useDispatch, useSelector } from 'react-redux';

import { fetchGetDirections } from './../../../../../store/queries/Directions/get-directions';

import Pagination from '../../../../../base-components/pagination';
import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { motion } from 'framer-motion';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import FilterSchools from '../../../../../base-components/filters-search/directions-filters/Schools-filter';
import SubjectsEGE from '../../../../../base-components/filters-search/directions-filters/Subjects-filter';
import FilterForms from '../../../../../base-components/filters-search/directions-filters/Form-education-filter';
import { setFiltersClear } from '../../../../../store/slices/DirectionsSlice';

const DirectionsInfo = () => {
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

    // filters
    const schoolsFilter = useSelector(state => state.directions.schoolsFilter)
    const choisenSubjects = useSelector(state => state.directions.choisenSubjects)
    const formEducationFilter = useSelector(state => state.directions.formEducationFilter)
    const formatedSchools = useSelector(state => state.directions.formatedSchools)
    const formatedSubjects = useSelector(state => state.directions.formatedSubjects)
    const formatedFormEducation = useSelector(state => state.directions.formatedFormEducation)
    let [filters, setFilters] = useState({ 'schools': null })


    useEffect(() => {
        setFilters(
            {
                'schools': formatedSchools,
                'subjects': formatedSubjects,
                'form_education': formatedFormEducation
            }
        )
    }, [formatedSchools, formatedSubjects, formatedFormEducation])

    useEffect(() => {
        dispatch(fetchGetDirections({ 'page': 1 }))
    }, [])

    useEffect(() => {
        if (!loading && directions.length != 0) {
            setSortedDirections([...directions].sort((a, b) => a.id - b.id))
        }
        if (directions.length == 0) {
            setSortedDirections([])
        }
    }, [loading])

    useEffect(() => {
        const delayDebounce = setTimeout(
            () => {
                if (search != null && search.trim()) {
                    dispatch(fetchGetDirections({
                        'page': 1,
                        'search': search,
                        'filters': filters,
                    }))
                }
            }, 600
        )
        return () => clearTimeout(delayDebounce)
    }, [search])

    const handleClearSearch = () => {
        setSearch(null)
        dispatch(fetchGetDirections({ 'page': 1, 'search': null, 'filters': filters }))
    }

    const handleClearFilters = () => {
        dispatch(setFiltersClear())
        dispatch(fetchGetDirections({ 'page': 1, 'search': null, 'filters': null }))
    }

    const handleFilters = () => {
        dispatch(fetchGetDirections({ 'page': 1, 'search': null, 'filters': filters }))
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
            <div className='directions__common_wrapper'>
                {
                    loading && (
                        <div className='directions__loading'>
                            <AiOutlineLoading3Quarters className='loadingscreen__load' />
                        </div>
                    )
                }
                {
                    loading != true && sortedDirections.length == 0 && (
                        <div className='directions__error'>
                            К сожалению, ничего не было найдено по вашему запросу
                        </div>
                    )
                }
                {
                    loading != true && sortedDirections.length != 0 && (
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
                                loading != true && sortedDirections.length != 0 && (
                                    <Pagination
                                        filters={filters}
                                        search={search}
                                        prev_page={prev_page}
                                        next_page={next_page}
                                        page_size={5}
                                        count={count}
                                        current_page={current_page}
                                    />)
                            }
                        </div>)
                }
                <div className='directions__filters'>
                    <div className='subsections__subtitle directions_subtitle'>Фильтры</div>
                    <FilterSchools
                        search={search} />
                    <SubjectsEGE
                        search={search} />
                    <FilterForms
                        search={search} />
                    <div
                        className='filters_btn'>
                        <button
                            disabled={
                                schoolsFilter.length == 0 
                                && choisenSubjects.length == 0 
                                && formEducationFilter.length == 0 ? 
                                    true : false}
                            onClick={() => handleClearFilters()}
                            className='subsection__btn filters_btn'>
                            Сбросить фильтры
                        </button>
                        <button
                            onClick={() => handleFilters()}
                            className='subsection__btn filters_btn'>
                            Выбрать
                        </button>
                    </div>

                </div>

            </div>


        </motion.div>
    )
}

const Direction = (props) => {
    const {
        id,
        name,
        subjects_budget_paid,
        school,
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



export default DirectionsInfo