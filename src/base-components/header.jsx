import { useEffect, useState } from 'react'
import '../common-static/css/header.css'

import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import search from '../common-static/images/search.png'
import logo from '../common-static/images/logo.png'
import bell from '../common-static/images/bell.png'
import message from '../common-static/images/message.png'

import { CiSettings } from "react-icons/ci";
import { FaDoorOpen } from "react-icons/fa6";
import { AiOutlineProfile } from "react-icons/ai";

import { motion, AnimatePresence } from 'framer-motion'
import { profileListVars } from './../common-static/motion/profile';

import { fetchLogout } from './../store/queries/Login/Logout';

import { AdminNavigation } from '../components/Admin/admin-components/AdminHeaderNav'

const Profile = () => {

    const [isVisible, setVisible] = useState(false)
    const avatar = useSelector(state => state.user.avatar)
    const dispatch = useDispatch()

    const logoutProfile = () => {
       dispatch(fetchLogout()) 
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(!e.target.closest('.profile__list') && 
            !e.target.closest('.profile__avatar')) {
                setVisible(false)
            }
        }
        
        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
        
    }, [])

    return (
        <div className='profile'>
            <div className='profile__section'>
                <img src={bell} className='profile__img' alt='bell'/>
                <img src={message} className='profile__img' alt='messages'/>
                <img onClick={() => setVisible(!isVisible)} src={avatar} className='profile__avatar'/>
            </div>
            <AnimatePresence>
            {   isVisible &&
                (
                    <motion.div 
                        initial='initial'
                        exit={{opacity: 0, y: 5}}
                        animate='visible'
                        variants={profileListVars} 
                        className='profile__list'>
                        <NavLink to='/admin/profile' className='list_child'>
                            <div className='list_child__profile_title'>Профиль</div>
                            <div className='list_child__icon'><AiOutlineProfile/></div>                                        
                        </NavLink>

                        <NavLink to='/admin/settings' className='list_child'>
                            <div className='list_child__profile_title'>Настройки</div>
                            <div className='list_child__icon'><CiSettings/></div>                                        
                        </NavLink>

                        <button onClick={() => logoutProfile()}className='list_child'>
                            <div className='list_child__profile_title'>Выйти</div>
                            <div className='list_child__icon'><FaDoorOpen/></div>                                        
                        </button>
                    </motion.div>
                )
            }
            </AnimatePresence>
        </div>
    )
}

const Header = () => {

    const role = useSelector(state => state.user.role)
    let content = null

    switch (true) {
        case role == 'student':
            content = <StudentNavigation />
            break
        case role == 'admin': 
            content = <AdminNavigation />
            break
    }

    return (
        <div  className='header'>
            <NavLink to='/admin/main-page/'>
                <img src={logo} className='header__image' alt='logo'/>
            </NavLink>
            
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