function verificaCampos(...args){
    for (const value of args) {
        if(value == ""){
            return false
        }
    }
    return true
}
function validarEmail(email){
    let usuario = email.substring(0, email.indexOf('@'))
    let dominio = email.substring(email.indexOf('@')+1, email.length)

    if((usuario.length >= 0) &&
       (dominio.length >= 3) &&
       (usuario.search('@')==-1) &&
       (dominio.search('@')==-1) &&
       (usuario.search(' ')==-1) &&
       (dominio.search(' ')==-1) &&
       (dominio.search('.')!=-1) &&
       (dominio.indexOf('.')>= 1) &&
       (dominio.lastIndexOf('.') < dominio.length -1)){
            return true
       }else{
           return false
       }
}
function validarPassword(password){
    if(password.length >= 8){
        return true
    }else{
        return false
    }
}
function limparCampos(){
    for (const element of arguments) {
         element.value = ''
    }
}
function alertErro(message){
    document.querySelector('.message p').innerHTML = message
}
function deletarPost(id, image){

    fetch('http://localhost:3000/api/deletePost', {
        method: 'DELETE',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({id, image})
    }).then(res=>{

            res.text().then(data=>{
                alert('post deletado')
                refresh()
            })
    })
}
function deletarUser(id){
    fetch('http://localhost:3000/user/deleteUser', {
        method: 'DELETE',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({id})
    }).then(res=>{

            res.text().then(data=>{
                alert('Usuário deletado')
                refresh()
            })
    })
}
function refresh(){
    location.href = location.href
}
function quit(){
    sessionStorage.removeItem('token')
    location.href = 'http://localhost:3000/painel/'
}