import '../../admin-static/css/admin-mainpage.css'

import { NavLink } from 'react-router-dom';
import { delay, motion } from 'framer-motion';

import WelcomeSection from '../../../../base-components/main-page/welcome-section';
import { sections } from './AdminSections';

const AdminMainPage = () => {

    return (
        <div className="adminmainpage">
           <WelcomeSection/> 
           <div className='adminmainpage__sections'>
                <div className='adminmainpage__title'>Секции</div>
                <div className='adminmainpage__sections_wrapper'>
                    {
                        sections.map((el, index) => {
                            return <AdminSection 
                                key={index}
                                title={el.title}
                                link={el.link}
                                icon={el.icon}
                                lst={el.lst}
                                link_all={el.link_all}
                                index={index}
                            />
                        })
                    }
                </div>
           </div>
        </div>
    )
}

const AdminSection = ({title, link, icon, lst, link_all, index}) => {
    return(
        <motion.div
            initial='initial'
            animate='visible'
            custom={index}
            variants={sectionVars} 
            className='adminmainpage__section'>
            <div className='adminmainpage__subsection'>
                <NavLink to={link} className='adminmainpage__sectionTitle'>{title}</NavLink>
                <div className='adminmainpage__sectionIcon'>
                    {icon}                    
                </div>
            </div>
            <div className='adminmainpage__subsection vertical'>
                {lst.map((el, index ) => {
                    return (
                        <NavLink key={index} to={el.link} className='adminmainpage__nav'>
                            <div className='adminmainpage__delimeter'/>
                            <div className='adminmainpage__sectionSubtitle'>
                                {el.title} 
                            </div> 
                        </NavLink>
                    )
                })}
                <NavLink to={link_all} className='adminpage__section_all'>
                    Посмотреть все &gt;
                </NavLink>
            </div> 
        </motion.div>
    )
}

const sectionVars = {
    initial: {
        opacity: 0,
        y: 10
    },
    visible: custom => ({
        opacity: 1, 
        y: 0,
        transition: {
            delay: 0.1 * custom
        }
    })
}


export default AdminMainPage