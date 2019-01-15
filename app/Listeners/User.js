'use strict'
const Mail = use('Mail')
const User = exports = module.exports = {}

User.sendmail = async (data) => {
  await Mail.send('emails.welcome', data, (message) =>{
    message.to(data.email)
    message.subject('Welcome to '+ data.username)
  })
}
