import logo from '../../common-static/images/logo.png'
import '../../common-static/css/common/not-found.css'

const NotFound = () => {
    return (
        <div className="notfound">
            <div className="notfound__container">
                <img src={logo} className='notfound__img' alt='logo' />
                <div className="notfound__title">
                    Ничего не нашлось по вашему запросу :&#40;
                </div>
                <div className="notfound__subtitle">
                    Ошибка 404
                </div>
            </div>
        </div>
    )
}

export default NotFound