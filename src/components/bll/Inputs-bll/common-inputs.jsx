import { useState } from "react"
import { generatePassword } from "../Common-bll/GeneratePassword"

const CommonInputs = () => {
    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [otchestvo, setOtchesctvo] = useState(null)
    const [number, setNumber] = useState('+7 ')
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(generatePassword())
    const [datebirth, setDatebirth] = useState('')
    
    return {
        name, 
        setName, 
        surname, 
        setSurname,
        otchestvo, 
        setOtchesctvo,
        number, 
        setNumber, 
        email, 
        setEmail,
        password,
        setPassword, 
        datebirth, 
        setDatebirth,
    }
}

export default CommonInputs