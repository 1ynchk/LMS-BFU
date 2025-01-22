import '../student-static/css/student-mainpage.css'
import WelcomeSection from '../../../base-components/main-page/welcome-section'
import { NavLink } from 'react-router-dom'

const StudentMainPage = () => {

    const news = [
        {'id': 1, 'img_url': 'https://kantiana.ru/upload/ammina.optimizer/jpg-webp/q80/upload/iblock/a3c/photo_2023_06_02_15_46_33.webp','title': 'Новое направление!', 'date_publish': '2024-12-05'},
        {'id': 2, 'img_url': 'https://kantiana.ru/upload/ammina.optimizer/jpg-webp/q80/upload/iblock/24d/Praktikanty-_4_.webp','title': 'Новый учебный год!', 'date_publish': '2024-12-03'},
        {'id': 3, 'img_url': 'https://kantiana.ru/upload/ammina.optimizer/jpg-webp/q80/upload/iblock/77b/photo_2023_03_29_18_04_37.webp','title': 'Нижка', 'date_publish': '2024-12-04'},
    ]
    
    return (
        <div className="student_mp">
            <WelcomeSection /> 
            <div className='student_mp__firstContainer'>
                <div className='student_mp__news_section'>
                    <div className='student_mp__news_titleWrapper'>
                        <div className='student_mp__news_title'>Новости</div>
                        <NavLink
                            to='/student/news/' 
                            className='student_mp__news_all'>
                            Посмотреть все &gt;
                        </NavLink>
                    </div>
                    <div className='student_mp__news_wrapper'>
                    {news.map(el => {
                        return <News 
                            id={el.id}
                            img_url={el.img_url}
                            title={el.title}
                            date_publish={el.date_publish} 
                        />
                    })} 
                    </div>     
                </div>
            </div>
            <div className='student_mp__firstContainer'>
                <div className='student_mp__news_section'>
                    <div className='student_mp__news_titleWrapper'>
                        <div className='student_mp__news_title'>Курсы</div>
                        <NavLink
                            to='/student/courses/' 
                            className='student_mp__news_all'>
                            Посмотреть все &gt;
                        </NavLink>
                    </div>
                    <div className='student_mp__news_wrapper'>
                    {news.map(el => {
                        return <News 
                            id={el.id}
                            img_url={el.img_url}
                            title={el.title}
                            date_publish={el.date_publish} 
                        />
                    })} 
                    </div>     
                </div>
            </div>

        </div>
    )
}

const News = ({id, img_url, title, date_publish}) => {
    return (
        <div className='student_mp__news'>
            <img src={img_url} alt={'news_' + id}
            className='student_mp__newsPhoto' />
            <div className='student_mp__newsTitle'>{title}</div>
            <div className='student_mp__newsContainer'>
                <div className='student_mp__newsDate'>{date_publish}</div>
                <button className='student_mp__newsBtn'>Перейти</button>
            </div>
        </div>
    )
}

export default StudentMainPage