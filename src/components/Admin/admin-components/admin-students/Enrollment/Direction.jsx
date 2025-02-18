
import { useEffect, useState } from 'react'

const Direction = (props) => {
    const {
        id,
        name,
        subjects_budget_paid,
        school,
        setDirection,
        direction
    } = props

    const [sortedSubjectsBudget, setSortedSubjectsBudget] = useState([])
    const [sortedSubjectsPaid, setSortedSubjectsPaid] = useState([])

    useEffect(() => {
        setSortedSubjectsBudget([...subjects_budget_paid].filter(el => el.type == 'B'))
        setSortedSubjectsPaid([...subjects_budget_paid].filter(el => el.type == 'P'))
    }, [])

    const handleSetDirection = () => {
        setDirection({
            'id': id,
            'name': name,
        })
    }

    return (
        <div
            onClick={() => handleSetDirection()}
            className={`direction ${direction != null && direction.id == id ? 'direction_checked' : ''}`}>
            <div className='direction__title_id'>
                {id}
            </div>
            <div className='direction__title direction_name'>
                {school}
            </div>
            <div className='direction__title direction_name'>
                {name}
            </div>
            <div className='direction__title'>
                {
                    sortedSubjectsBudget.map((el, index) => {
                        return <div key={index} className='direction__subtitle'>{el.name}</div>
                    }
                    )
                }
            </div>
            <div className='direction__title'>
                {
                    sortedSubjectsBudget.map((el, index) => {
                        return <div key={index} className='direction__subtitle'>{el.points}</div>
                    }
                    )
                }
            </div>
            <div className='direction__title'>
                {
                    sortedSubjectsPaid.map((el, index) => {
                        return <div key={index} className='direction__subtitle'>{el.name}</div>
                    }
                    )
                }
            </div>
            <div className='direction__title'>
                {
                    sortedSubjectsPaid.map((el, index) => {
                        return <div key={index} className='direction__subtitle'>{el.points}</div>
                    }
                    )
                }
            </div>
        </div>
    )
}

export default Direction