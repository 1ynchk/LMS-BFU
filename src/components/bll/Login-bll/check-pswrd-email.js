
export const checkPswrd = () => {
    const pswrd = document.getElementById('loginpanel_pswrd').value 

    if (pswrd.length == 0) {
        return false 
    } else {
        return true
    }
}

export const checkEmail = () => {
    const email = document.getElementById('loginpanel_email')

    if (email.length == 0) {
        return false
    }

    if ((email.value.split('@').length - 1 === 1) 
            && (email.value.indexOf('.') - (email.value.indexOf('@') + 3) > 0)) {
            return true
    } else {
        return false
    }

}