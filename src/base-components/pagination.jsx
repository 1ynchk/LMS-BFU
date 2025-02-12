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
        current_page
    } = props
    const [pages, setPages] = useState([1])
    const dispatch = useDispatch()
    
    console.log()

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
        dispatch(fetchGetDirections(prev_page))
    }

    const hadnleNext = () => {
        dispatch(fetchGetDirections(next_page))
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