import { NavLink } from "react-router-dom"

export const AdminNavigation = () => {
    const navBar = [
        { "id": 1, 'to': '/admin/main-page/', 'title': 'Главная'},
        { 'id': 2, 'to': '/admin/applicants/', 'title': 'Абитуриенты'},
        { 'id': 3, 'to': '/admin/teachers/', 'title': 'Преподавательский состав'},
        { 'id': 4, 'to': '/admin/schedule/', 'title': 'Расписание'},
    ]
    return (
        <div className='header__nav'>
           {navBar.map(el => {return <NavLink 
            key={el.id} 
            to={el.to}>
                {el.title}
            </NavLink>})} 
        </div>
    )
}