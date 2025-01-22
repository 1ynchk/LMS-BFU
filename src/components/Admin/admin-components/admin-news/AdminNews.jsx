import '../../../../common-static/css/admin-common/admin-cat-common.css'

import WelcomeSection from '../../../../base-components/main-page/welcome-section'

import { FaLongArrowAltRight } from "react-icons/fa";

const AdminNews = () => {
    return (
        <div className='admincats'>

            <WelcomeSection />            

            <div className='admincats__links'>

                <div className='admincats__linkContainer'>
                    <div className='adminmainpage__delimeter'></div>
                    <div className='admincats__linkTitle'>
                        Посмотреть все новости
                    </div>
                    <FaLongArrowAltRight className='admincats__arrow'/> 
                    
                </div>
                
            </div>
            
        </div>
    )
}

export default AdminNews