
export const ConcealPswr = () => {
    const pswrInput = document.getElementById("loginpanel_pswrd")

    pswrInput.type === 'text' ? pswrInput.type = 'password' : pswrInput.type = 'text'
}