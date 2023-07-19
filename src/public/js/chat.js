console.log('Chat Socket')
const socket = io()

let user
let chatbox = document.querySelector('#chatbox')

Swal.fire({
    title: 'Identificate',
    input: 'text',
    text:'Ingresa el nombre de tu usuario',
    inputValidator: (value)=> {
        return !value && 'El nombre de usuario es obligatorio'
    },
    allowOutsideClick: false
}).then(result => {
    user= result.value
    
})

chatbox.addEventListener('keyup', evt => {
    if (evt.key==='Enter') {
        if (chatbox.value.trim().length>0) {
            socket.emit('message', {
                user, message: chatbox.value
            })
            chatbox.value=''
        }
    }
})

socket.on('messageLogs', data => {
    // console.log(data)}

    let log = document.getElementById('messageLogs')
    let mensajes = ''
    data.forEach(({user, message}) => {
        mensajes += `<li>${user} dice: ${message}</li>`
    })
    log.innerHTML = mensajes
})

socket.on('newUserConnected', user => {
    if (!user) {
        return 
    }

    Swal.fire({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 10000,
        title: `${user} se a unido al chat`,
        icon: 'success'
    })
})