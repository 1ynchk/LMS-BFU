
export const ConcealPswr = (class_name) => {

    const inputs = document.querySelectorAll(class_name)
    inputs.forEach(el => {
        el.type === 'text' ? el.type = 'password' : el.type = 'text'
    })
}