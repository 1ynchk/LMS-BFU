import { useSelector } from 'react-redux'
import '../../common-static/css/main-page/welcome-section.css'

import { motion } from 'framer-motion'

import { FaNewspaper } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

const WelcomeSection = () => {
    
    const name = useSelector(state => state.user.name)
    const location = useLocation()
    let content = null

    console.log(location)

    switch (true) {
        case String(location.pathname).slice(-10) == 'main-page/':
            content = `Добро пожаловать, ${name}!`
            break
        case location.pathname == '/admin/news/':
            content = <WelcomeType section={'Новости'} icon={<FaNewspaper/>} />
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
        <div className='admincats__wrapper'>
                <div className='admincats__title'>
                    Секция: <span className='admincats__span'>{section}</span>
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