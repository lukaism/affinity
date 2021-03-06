const call = require('../../utils/call')
const { validate, errors: { ConflictError } } = require('affinity-util')
const API_URL = process.env.REACT_APP_API_URL

/**
 * retrieves a chat a user is part of.
 * 
 * @param {*userId}  user's id.
 * @param {*chatId}  chat's id.
 * 
 * @returns chat
 */

module.exports = function(token, chatId) {
    validate.string(token)
    validate.string.notVoid('token', token)

    validate.string(chatId)
    validate.string.notVoid('chatId', chatId)

    return (async() => {
        
        const res = await call(`${API_URL}/chat/retrievechat/${chatId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (res.status === 200) return JSON.parse(res.body)

        if (res.status === 409) throw new ConflictError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)

    })()

}