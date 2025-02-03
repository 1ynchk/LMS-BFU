import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../../common-static/css/main-page/welcome-section.css'


import { FaNewspaper } from 'react-icons/fa'
import { PiStudent } from "react-icons/pi";
import { motion } from 'framer-motion'

const WelcomeSection = () => {
    
    const name = useSelector(state => state.user.name)
    const location = useLocation()
    let content = null

    switch (true) {
        case String(location.pathname).slice(-10) == 'main-page/':
            content = `Добро пожаловать, ${name}!`
            break
        case String(location.pathname).slice(0, 12) == '/admin/news/':
            content = <WelcomeType section={'Новости'} icon={<FaNewspaper/>} />
            break
        case String(location.pathname).slice(0, 16) == '/admin/students/':
            content = <WelcomeType section={'Студенты'} icon={<PiStudent/>} />
            break
    }
    
    return (
            <motion.div
                initial='initial'
                animate='visible' 
                variants={welcomeVars}
                className="welcomeSection">
                    <div className='welcomeSection__title'>
                       {content} 
                    </div>     
            </motion.div>
    )
}

const WelcomeType = ({ section, icon }) => {
    return (
        <div className='welcomeSection__wrapper'>
                <div className='welcomeSection__subtitle'>
                    Секция: <span className='welcomeSection__span'>{section}</span>
                </div>
                {icon}
        </div>
    )
}

const welcomeVars = {
    initial: {
        opacity: 0,
        x: -10
    },
    visible: {
        opacity: 1, 
        x: 0
    }
}

export default WelcomeSection