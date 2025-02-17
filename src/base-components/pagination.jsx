import '../common-static/css/pagination.css'
import { RiArrowLeftSFill } from "react-icons/ri";
import { RiArrowRightSFill } from "react-icons/ri";

import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { fetchGetDirections } from '../store/queries/Directions/get-directions';

const Pagination = (props) => {
    const {
        count,
        page_size,
        prev_page,
        next_page,
        current_page,
        search, 
        filters
    } = props
    const [pages, setPages] = useState([1])
    const dispatch = useDispatch()

    useEffect(() => {
        let max_pages = Math.ceil(count / page_size)
        if (count <= page_size) {
            setPages([1])
        } else {
            let lst = []
            for (let i = 1; i <= max_pages; i++) {
                lst.push(i)
            }
            setPages(lst)
        }
    }, [count])

    const handlePrev = () => {
        dispatch(fetchGetDirections({ 
            'page': current_page - 1, 
            'search': search, 
            'filters': {
                'schools': filters.schools
            }
        }))
    }

    const hadnleNext = () => {
        dispatch(fetchGetDirections({ 
            'page': current_page + 1, 
            'search': search, 
            'filters': {
                'schools': filters.schools
            } 
        }))
    }

    const handleClickPage = (el) => {
        dispatch(fetchGetDirections({ 
            'page': el, 
            'search': search,
            'filters': {
                'schools': filters.schools
            }
        }))
    }

    return (
        <div className='pagination'>
            <div className='pagination__container'>
                <button
                    disabled={prev_page != null ? false : true}
                    onClick={() => handlePrev()}
                    className='pagination__arrow'>
                    <RiArrowLeftSFill />
                </button>
                {
                    pages.map((el, index) => {
                        return <div
                            onClick={() => handleClickPage(el)}
                            key={index}
                            className={`pagination_page  ${el == current_page ? 'pagination_active' : ''}`}>
                            {el}
                        </div>
                    })
                }
                <button
                    disabled={next_page != null ? false : true}
                    onClick={() => hadnleNext()}
                    className='pagination__arrow'>
                    <RiArrowRightSFill />
                </button>
            </div>

        </div>
    )
}

export default Pagination