import '../common-static/css/header.css'

import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import search from '../common-static/images/search.png'
import logo from '../common-static/images/logo.png'
import bell from '../common-static/images/bell.png'
import message from '../common-static/images/message.png'
import { useEffect } from 'react'

const Header = () => {

    const role = useSelector(state => state.user.role)
    let content = null

    switch (true) {
        case role == 'student':
            content = <StudentNavigation />
        case role == 'admin': 
            content = <AdminNavigation />
    }

    return (
        <div  className='header'>
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
            <Profile /> 
        </div>
    )
}

const Profile = () => {

    const avatar = useSelector(state => state.user.avatar)

    console.log(avatar)

    return (
        <div className='profile'>
            <div className='profile__section'>
                <img src={bell} className='profile__img' alt='bell'/>
                <img src={message} className='profile__img' alt='messages'/>
                <img src={avatar} className='profile__avatar'/>
            </div>
                
        </div>
    )
}

const AdminNavigation = () => {
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