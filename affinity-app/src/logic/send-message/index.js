const call = require('../../utils/call')
const { validate, errors: { CredentialsError, ConflictError } } = require('affinity-util')
// const { env: { REACT_APP_API_URL: API_URL } } = process
const API_URL = process.env.REACT_APP_API_URL

module.exports = function(chatId, token, body) {
    validate.string(chatId)
    validate.string.notVoid('chatId', chatId)

    validate.string(token)
    validate.string.notVoid('token', token)

    validate.string(body)
    validate.string.notVoid('body', body)

    return (async() => {
        const res = await call(`${API_URL}/chat/sendmessage`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ body, chatId })
        })

        if (res.status === 201) return 

        if (res.status === 409) throw new ConflictError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}