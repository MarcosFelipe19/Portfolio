window.addEventListener('DOMContentLoaded', () => {
    let forms = document.querySelectorAll('.forms')
    for (const iterator of forms) {
        iterator.addEventListener('submit', (e) => {
            e.preventDefault()
        })
    }
    let open = true
    let iconeHamb = document.querySelector('.icone-hamburguer img')
    let options = document.querySelectorAll('[attr]')

    for (const option of options) {
        option.addEventListener('click', viewSection)
    }

    iconeHamb.addEventListener('click', eventMenu)

    function eventMenu() {
        let menu = document.querySelector('div.menu')
        let body = document.querySelector('div.body')

        let leftMenu = ''
        let leftBody = ''
        let widthBody = ''

        if (open) {
            leftMenu = `-300px`
            widthBody = '100%'
            leftBody = '0px'
            open = false
        } else {
            leftMenu = `0px`
            widthBody = 'calc(100% - 300px)'
            leftBody = '300px'
            open = true
        }

        menu.style.left = leftMenu
        body.style.left = leftBody
        body.style.width = widthBody
    }
    function viewSection(e) {
        disabledSection()

        let attr = this.getAttribute('attr')

        let section = document.getElementById(attr)
        section.style.display = 'block'
    }
    function disabledSection() {
        let sections = document.querySelectorAll('main section')

        for (const section of sections) {
            section.style.display = 'none'
        }
    }
    function exibirWorks() {
        fetch('http://localhost:3000/api/all', {
            method: 'GET'
        }).then(res => {

            if (res.status == 200) {
                res.json().then(data => {
                    let cDeleteWorks = document.querySelector('.itemWork')

                    data.map((value) => {
                        let divContainer = document.createElement('div')
                        let p = document.createElement('p')
                        let divButton = document.createElement('div')
                        let button = document.createElement('button')

                        divContainer.classList.add('divContainer')
                        button.classList.add('deleteWork')

                        p.innerHTML = value.title
                        button.innerHTML = 'delete'

                        button.addEventListener('click', () => {
                            deletarPost(value._id, value.image)
                        })

                        divButton.appendChild(button)

                        divContainer.appendChild(p)
                        divContainer.appendChild(divButton)

                        cDeleteWorks.appendChild(divContainer)
                    })

                })
            }
        })
    }
    function exibirUsers(){
        fetch('http://localhost:3000/user/all', {
            method: 'GET'
        }).then(res => {

            if (res.status == 200) {
                res.json().then(data => {
                    let cDeleteUsers = document.querySelector('#settings .usuarios')
                 
                    data.map((value) => {
                        let divContainer = document.createElement('div')
                        let pName = document.createElement('p')
                        let pEmail = document.createElement('p')
                        let divButton = document.createElement('div')
                        let button = document.createElement('button')

                        divContainer.classList.add('container-usuarios-delete')
                        button.classList.add('deleteWork')

                        pName.innerHTML = value.name
                        pEmail.innerHTML = value.email
                        button.innerHTML = 'delete'

                        button.addEventListener('click', () => {
                            deletarUser(value._id)
                        })

                        divButton.appendChild(button)

                        divContainer.appendChild(pName)
                        divContainer.appendChild(pEmail)
                        divContainer.appendChild(divButton)

                        cDeleteUsers.appendChild(divContainer)
                    })

                })
            }
        })
    }
    function init(){
        exibirWorks()
        exibirUsers()
    }
    init()
})

function cadastrar() {
    let image = document.querySelector('#cadastrar .fields input[type=file]')
    let title = document.querySelector('#cadastrar input[name=title]')
    let description = document.querySelector('#cadastrar textarea[name=description]')
    let address = document.querySelector('#cadastrar input[name=address]')

    if (!verificaCampos(image.value, title.value, address.value)) {
        alert('campos vazios não são permitidos')
        return false
    }


    const formData = new FormData()
    formData.append('image', image.files[0])
    formData.append('title', title.value)
    formData.append('description', description.value)
    formData.append('address', address.value)



    let url = 'http://localhost:3000/api/newPost'
    let options = {
        method: 'POST',
        body: formData,
    }

    fetch(url, options).then(res => {

        if (res.status == 200) {
            res.json().then(data => {
                alert('Post Cadastrado')
                refresh()
            })
        } else {
            res.text().then(data => {
                alert(data)
            })
        }
    })
    limparCampos(title, description, address, image)
}
function cadastrarUsuario() {
    let name = document.querySelector('#settings [name=name]').value
    let email = document.querySelector('#settings [name=email]').value
    let password = document.querySelector('#settings [name=password]').value

    if (!verificaCampos(name, email, password)) {
        alert('campos vazios não são permitidos')
        return false
    }
    if(!validarEmail(email)){
        alert('Email inválido')
        return false
    }
    if(!validarPassword(password)){
        alert('Senha deve conter 8 caracteres')
    }


    let url = 'http://localhost:3000/user/register/'
    let options = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email, password, name, admin: true})
    } 

    fetch(url, options).then(res=>{
        res.text().then(data=>{
            alert(data)
            refresh()
        })
    }).catch(error=>{
        console.log(error)
    })

}
