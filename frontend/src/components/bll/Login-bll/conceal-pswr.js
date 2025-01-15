
export const ConcealPswr = () => {
    const pswrInput = document.getElementById("loginpanel__pswrd")

    pswrInput.type == 'text' ? pswrInput.type = 'password' : pswrInput.type = 'text'
}