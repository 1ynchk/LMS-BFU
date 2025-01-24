

import { useEffect } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

const Link = ({title, link, index}) => {

    const location = useLocation()

    useEffect(() => {
        const linkId = 'subsections__linkContainer_' + index
        const linkEl = document.getElementById(linkId)
        if (location.pathname == link) {
            linkEl.classList.add('active') 
        } else {
            linkEl.classList.remove('active')
        }
    }, [location])
    
    return (
        <NavLink
            to={link}
            id={'subsections__linkContainer_' + index} 
            className='subsections__linkContainer'>
            <div className='adminmainpage__delimeter'></div>
            <div className='subsections__linkTitle'>
                {title} 
            </div>
            <div className="subsections__arrow">
                <FaLongArrowAltRight />
            </div>
             
        </NavLink>
    )
} 

export default Link