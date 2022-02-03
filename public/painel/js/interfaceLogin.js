window.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector('#form-login')

    form.addEventListener('submit', (e)=>{
        e.preventDefault()
    })

})
function login(){
    let email = document.querySelector('input[type=email]')
    let password = document.querySelector('input[type=password]')

    if(!verificaCampos(email.value, password.value)) {
        alertErro('Empty fields are not allowed')
        return false
    }
    if(!validarEmail(email.value)){
        alertErro('Email or password incorrect')
        limparCampos(email, password)
        return false
    }
    if(!validarPassword(password.value)){
        limparCampos(email, password)
        alertErro('Email or password incorrect')
        return false
    }

    let url = `http://localhost:3000/user/login?email=${email.value}&password=${password.value}`

    fetch(url).then((res)=>{
        
        if(res.status == 200){
            res.text().then(data=>{
                sessionStorage.setItem('token', data)
                window.location.href = 'http://localhost:3000/painel/userAdmin.html'
            })
        }else{
            res.text().then(data=>{
                alertErro(data)
            })
        }

        limparCampos(email, password)
    }).catch(error=>{
        console.log('houve um erro')
    })

}