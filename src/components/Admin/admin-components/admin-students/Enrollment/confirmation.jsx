
import { DisabledField } from "../../../../bll/Inputs-bll/common-inputs"

const Confirmation = (props) => {

    const {
        gender, accountPhoto, name,
        surname, otchestvo, number,
        email, password, datebirth,
        citizenship, issuedBy, dateIssuance,
        codeSubDepartment, passportSerial,
        passportNumber, edNumber, edDateIssance,
        edIssuedBy, snils, INN, fpNumber,
        fpDateIssance, fpExpireDate, fpIssuedBy,
        mcNumber, mcDateEntry, direction, citizenshipType
    } = props

    console.log(direction)

    return (
        <div className="enrollment__confirmation">

            <div className='subsections__subtitle'>Общая информация</div>

            <div className="adminenrollment__wrapper">
                <div>
                    <div className="subsection__label">Фотография </div>
                    <img
                        className="confirmation__image"
                        src={accountPhoto == null ? '' : URL.createObjectURL(accountPhoto)} />
                </div>
            </div>

            <div className='adminenrollment__wrapper'>
                <DisabledField label='Фамилия' value={surname} />
                <DisabledField label='Имя' value={name} />
                <DisabledField label='Отчество' value={otchestvo} />
                <DisabledField label='Пол' value={gender} />
                <DisabledField label='Дата рождения' value={datebirth} />
            </div>

            <div className='adminenrollment__wrapper'>
                <DisabledField label='Почта' value={email} />
                <DisabledField label='Телефон' value={number} />
            </div>

            <div className='subsections__subtitle'>Паспорт</div>

            <div className='adminenrollment__wrapper'>
                <DisabledField label='Гражданство' value={citizenship} />
                <DisabledField label='Серия паспорта' value={passportSerial} />
                <DisabledField label='Номер паспорта' value={passportNumber} />
                <DisabledField label='Паспорт выдан' value={issuedBy} />
                <DisabledField label='Дата выдачи' value={dateIssuance} />
                <DisabledField label='Код подразделения' value={codeSubDepartment} />
            </div>

            <div className='subsections__subtitle'>Документ об образовании</div>

            <div className='adminenrollment__wrapper'>
                <DisabledField label='Номер' value={edNumber} />
                <DisabledField label='Дата выдачи' value={edDateIssance} />
                <DisabledField label='Выдан' value={edIssuedBy} />
            </div>


            <div className='subsections__subtitle'>
                {citizenshipType == 'russian' ? 'Доп. документы' : 'Загран паспорт'}
            </div>
            {
                citizenshipType == 'russian' && (
                    <div className="adminenrollment__wrapper">
                        <DisabledField label='Снилс' value={snils} />
                        <DisabledField label='ИНН' value={INN} />
                    </div>
                )
            }
            {
                citizenshipType == 'foreign' && (
                    <div className="adminenrollment__wrapper">
                        <DisabledField label='Номер' value={fpNumber} />
                        <DisabledField label='Дата выдачи' value={fpDateIssance} />
                        <DisabledField label='Срок действия' value={fpExpireDate} />
                        <DisabledField label='Выдан' value={fpIssuedBy} />
                    </div>
                )
            }
            {
                citizenshipType == 'foreign' && (
                    <div className="subsections__subtitle">
                        Миграционная карта
                    </div>
                )
            }
            {
                citizenshipType == 'foreign' && (
                    <div className="adminenrollment__wrapper">
                        <DisabledField label='Номер' value={mcNumber} />
                        <DisabledField label='Дата въезда' value={mcDateEntry} />
                    </div>
                )
            }
            <div className="adminenrollment__wrapper">
                <div className='subsections__subtitle'>Выбранное направление:</div>
                <div className='directions_choisen_direction_wrapper'>
                    <div className='direction_choisen_direction'>
                        {direction.name}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Confirmation