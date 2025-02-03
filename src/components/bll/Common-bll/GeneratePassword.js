
export const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'
    let password = ''
    for (let i = 0; i < 20; i++) {
        password += chars[Math.floor(Math.random() * chars.length)]
    }
    return password
}