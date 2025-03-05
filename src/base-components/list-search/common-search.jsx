import '../../components/Admin/admin-static/css/admin-directions.css'
import { useDispatch } from 'react-redux';

import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { fetchGetDirections } from '../../store/queries/Directions/get-directions';

const CommonSearch = (props) => {

    const {
        search,
        setSearch,
        filters, 
        placeholder,
        request
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
                placeholder={placeholder}
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

export default CommonSearch 