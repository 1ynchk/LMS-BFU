import { useState } from "react"
import CommonSearch from "../../../../../base-components/list-search/common-search"

const AdminStudentsList = (props) => {

    const [search, setSearch] = useState(null)
    
    return (
        <div className="subsection">
        <CommonSearch
            search={search}
            setSearch={setSearch}
            placeholder={'Введите данные студента...'} 
            />
        </div>
    )
}

export default AdminStudentsList