import { useEffect, useState } from 'react'
import '../../../admin-static/css/admin-directions.css'
import { useDispatch, useSelector } from 'react-redux';

import { fetchGetDirections } from './../../../../../store/queries/Directions/get-directions';

import Pagination from '../../../../../base-components/pagination';
import Direction from './Direction';
import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import FilterSchools from '../../../../../base-components/filters-search/directions-filters/Schools-filter';
import SubjectsEGE from '../../../../../base-components/filters-search/directions-filters/Subjects-filter';
import FilterForms from '../../../../../base-components/filters-search/directions-filters/Form-education-filter';
import { setFiltersClear } from '../../../../../store/slices/DirectionsSlice';
import { useNavigate } from 'react-router-dom';

const DirectionsInfo = (props) => {

    const {
        commonInfo,
        setDirection,
        direction,
        documentsInfo
    } = props

    const dispatch = useDispatch()
    const directions = useSelector(state => state.directions.directions)
    const navigate = useNavigate()
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
    const [isFiltersActive, setFiltersActive] = useState(false)

    useEffect(() => {
        if (!commonInfo || !documentsInfo) {
            navigate('/admin/students/enrollment/')
        }
    }, [])

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

    const handleClearFilters = () => {
        dispatch(setFiltersClear())
        setSearch(null)
        dispatch(fetchGetDirections({ 'page': 1, 'search': null, 'filters': null }))
    }

    const handleFilters = () => {
        dispatch(fetchGetDirections({ 'page': 1, 'search': search, 'filters': filters }))
    }

    const handleSubmit = () => {
        navigate('/admin/students/enrollment/?stage=confirm')
    }

    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="directions">
            <DirectionSearch
                search={search}
                setSearch={setSearch}
                filters={filters} />
            <div className='directions__filters'>

                <FilterSchools
                    search={search} />
                <SubjectsEGE
                    search={search} />
                <FilterForms
                    search={search} />
                <div className='filters_btns'>
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
                        Поиск
                    </button>
                </div>
            </div>
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
            <div className='directions__table_wrapper'>
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
                                        direction={direction}
                                        setDirection={setDirection}
                                        key={el.id}
                                        id={el.id}
                                        name={el.name}
                                        subjects_budget_paid={el.subjects_budget_paid}
                                        school={el.school}
                                    />
                                })
                            }
                        </div>)
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
            </div>
            <AnimatePresence>
                {
                    direction != null && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{ overflow: 'hidden' }}
                            className='directions__choisen_direction_container'>
                            <div className='subsections__subtitle'>Выбранное направление:</div>
                            <div className='directions_choisen_direction_wrapper'>
                                <div className='direction_choisen_direction'>
                                    {direction.name}
                                </div>
                                <IoCloseOutline
                                    onClick={() => { setDirection(null) }}
                                    className='directions__discard' />
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
            <div className='adminnewsadd__btn_container'>
                <button
                    onClick={() => handleSubmit()}
                    disabled={direction == null ? true : false}
                    className='subsection__btn'>
                    {direction == null ? 'Направление не выбрано' : 'Продолжить'}
                </button>
            </div>
        </motion.div>
    )
}

const DirectionSearch = (props) => {

    const {
        search,
        setSearch,
        filters
    } = props

    const dispatch = useDispatch()

    const handleClearSearch = () => {
        setSearch(null)
        dispatch(fetchGetDirections({ 'page': 1, 'search': null, 'filters': filters }))
    }

    return (
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
    )
}



export default DirectionsInfo