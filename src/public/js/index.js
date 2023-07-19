console.log('estamsos aca')

const form = document.querySelector("#cookieForm")

form.addEventListener('submit', (e)=>{
    e.preventDefault()

    const data = new FormData(form)
    const obj = Object.fromEntries(data.entries())

    data.forEach((value, key) => obj[key] = value)

    fetch('/session/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        console.log(respuesta)
        localStorage.setItem('token', respuesta.access_token)
    })
})


