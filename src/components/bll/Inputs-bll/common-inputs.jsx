import { useState } from "react"
import { generatePassword } from "../Common-bll/GeneratePassword"

export const CommonInputs = () => {
    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [otchestvo, setOtchesctvo] = useState(null)
    const [number, setNumber] = useState('+7 ')
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(generatePassword())
    const [datebirth, setDatebirth] = useState('')
    const [accountPhoto, setAccountPhoto] = useState(null)
    const [gender, setGender] = useState('Мужской')

    return {
        gender,
        setGender,
        accountPhoto,
        setAccountPhoto,
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

export const UseStudentDocuments = () => {
    const [citizenship, setCitizenship] = useState(null)
    const [issuedBy, setIssuedBy] = useState(null)
    const [dateIssuance, setDateIssuence] = useState('')
    const [codeSubDepartment, setCodeSubDepartment] = useState(null)
    const [passportSerial, setPassportSerial] = useState(null)
    const [passportNumber, setPassportNumber] = useState(null)

    return {
        citizenship,
        setCitizenship,
        issuedBy,
        setIssuedBy,
        dateIssuance,
        setDateIssuence,
        codeSubDepartment,
        setCodeSubDepartment,
        passportSerial,
        setPassportSerial,
        passportNumber,
        setPassportNumber
    }
}