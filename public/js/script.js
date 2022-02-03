const html = {
    getID(nome) {
        return document.getElementById(nome)
    },
    get(nome) {
        return document.querySelector(nome)
    },
    getAll(nome){
        return document.querySelectorAll(nome)
    }
}

const statePage = {
    page: 1,
    qtdItens: 8,
    totalPages: 1,
    numberVisibles: 5
}
const controls = {
    next() {
        if (statePage.page < statePage.totalPages) {
            statePage.page++
            update()
        }
    },
    prev() {
        if (statePage.page > 1) {
            statePage.page--
            update()
        }
    },
    goTo(page) {
        if (page >= statePage.totalPages) {
            page = statePage.totalPages
        }
        if (page <= 1) {
            page = 1
        }

        statePage.page = +page

        update()
    },
    createEventListenner() {
        html.get('.paginacao .next').addEventListener('click', controls.next)
        html.get('.paginacao .prev').addEventListener('click', controls.prev)
        html.get('.paginacao .prevHead').addEventListener('click', function () {
            controls.goTo(0)
        })
        html.get('.paginacao .nextTaill').addEventListener('click', function () {
            controls.goTo(statePage.totalPages)
        })


    },
}

const updateList = {
    containWork: html.get("div.container-portfolio"),
    createList() {
        this.containWork.innerHTML = ""

        let page = statePage.page - 1
        let start = page * statePage.qtdItens
        let end = (page * statePage.qtdItens) + statePage.qtdItens

        this.workItems(start, end)  
    },
    workItems(start, end) {
        let limit = { start, end }
    
        let url = `http://localhost:3000/api/newListWork/${start}/${end}`
        fetch(url).then((res) => {
            return res.json()
        })
            .then((data) => {
                data.forEach(value => {
                    this.createListHtml(value)
                })
            })
    },
    
    createListHtml(workItem) {
        if(workItem.description == 'false') workItem.description = '' 

        let work = `<div style="background-image: url('./assets/projetos/images/${workItem.image}');" id="${workItem.id}" class="caixa-item">
        <div class="overlay-item"></div>
        <div class="conteudo-item">
            <h3>${workItem.title}</h3>
            <p>${workItem.description}</p>
            <a href="${workItem.address}">Visualizar</a>
        </div>
        <!--conteudo-item-->
        </div>
        <!--caixa-item-->`

        this.containWork.innerHTML += work
    }
}
const updateNumber = {
    numPage: html.get('div.numPagi'),
    createNumberHtml(number) {
        let div = document.createElement('div')

        div.classList.add('numbers')

        if (statePage.page == number) {
            div.classList.add('active')
        }

        div.innerHTML = number
        div.addEventListener('click', function () {
            controls.goTo(number)
        })

        this.numPage.appendChild(div)
    },
    createNumbers() {
        this.numPage.innerHTML = ''
        let { maxLeft, maxRigth } = this.maxVisibleNumbers()

        for (maxLeft; maxLeft <= maxRigth; maxLeft++) {
            this.createNumberHtml(maxLeft)
        }

    },
    maxVisibleNumbers() {
        let maxLeft = statePage.page - Math.floor(statePage.numberVisibles / 2)
        let maxRigth = statePage.page + Math.floor(statePage.numberVisibles / 2)

        if (maxLeft < 1) {
            maxLeft = 1
            maxRigth = statePage.numberVisibles
        }

        if (maxRigth > statePage.totalPages) {

            maxRigth = statePage.totalPages
            maxLeft = maxRigth - (statePage.numberVisibles - 1)

            if (maxLeft < 1) {
                maxLeft = 1
            }

        }

        return { maxLeft, maxRigth }
    },
    sizeWorkItems(){
        fetch('http://localhost:3000/api/size').then((res)=>{
            return res.json()
        }).then(data=>{
            statePage.totalPages = Math.ceil(data.size / statePage.qtdItens)
            this.createNumbers()
        })
    }

}
function update() {
    updateList.createList()
    updateNumber.createNumbers()
}
function limitItemsPage(janela){
    if(janela <= 1100 && janela > 481){
        statePage.qtdItens = 6
    }
    else if(janela <= 480){
        statePage.qtdItens = 4
    }
    else if(janela > 1100 ){
        statePage.qtdItens = 8
    }
}
function init() {
    let janela = window.screen.width
    limitItemsPage(janela)

    update()
    controls.createEventListenner()
    updateNumber.sizeWorkItems()
}
init()
