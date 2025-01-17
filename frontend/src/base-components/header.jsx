import '../common-static/css/header.css'

import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import search from '../common-static/images/search.png'
import logo from '../common-static/images/logo.png'

const Header = () => {

    const role = useSelector(state => state.user.role)
    let content = null

    switch (true) {
        case role == 'student':
            content = <StudentNavigation />
    }

    return (
        <div className='header'>
            <img src={logo} className='header__image' alt='logo'/>
            {content}
            <div className='header__search'>
                <form className='header__form'>
                    <input 
                    className='header__input' 
                    type='text' 
                    placeholder='Найти...'/>
                    <button type='submit' 
                        className='search__btn'
                    >
                        <img className='search__img' alt='find' src={search}/>                
                    </button>
                </form>
            </div>    
        </div>
    )
}

const StudentNavigation = () => {
    const navBar = [
        { "id": 1, 'to': '/student/main-page/', 'title': 'Главная'},
        { 'id': 2, 'to': '/student/news/', 'title': 'Новости'},
        { 'id': 3, 'to': '/student/courses/', 'title': 'Курсы'},
        { 'id': 4, 'to': '/student/assessments/', 'title': 'Оценки'},
        { 'id': 5, 'to': '/student/reports/', 'title': 'Отчеты'}
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



export default Header