import { useSelector } from 'react-redux'
import '../../common-static/css/main-page/welcome-section.css'

const WelcomeSection = () => {

    const userName = useSelector(state => state.user.userName)
    
    return (
            <div className="welcomeSection">
                    <div className='welcomeSection__title'>
                        Добро пожаловать, {userName}!
                    </div>     
            </div>
    )
}

export default WelcomeSection