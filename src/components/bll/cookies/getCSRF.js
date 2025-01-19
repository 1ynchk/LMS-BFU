
export const getCSRFToken = () => {
    const csrfToken = document.cookie.match(/csrftoken=([^;]+)/)?.[1]
    return csrfToken
}