accessPageAdmin()
function accessPageAdmin() {
    let token = sessionStorage.getItem('token')

    let url = 'http://localhost:3000/admin'
    let options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'authorization-token': token }
    }

    fetch(url, options).then(res => {

        if (res.status == 200) {
            res.json().then(data => {
                if(!data.admin){
                    window.location.href = 'http://localhost:3000/painel'
                }
            })
        }else{
            window.location.href = 'http://localhost:3000/userAdmin.html'
        }
    })
}
 