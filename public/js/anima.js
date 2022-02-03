window.addEventListener('load', () => {
    let openMenu = true
    let animaText = {
        textTitle: html.getID('title-bg'),
        frase: ['criação de sites.', 'Desenvolvimento Web.', 'sites responsivos!'],
        indexFrase: 0,
        apagar: true,
        duracao: 180,
    }

    
    function updateTextTitle() {

        let size = animaText.textTitle.innerHTML
        let indexF = animaText.indexFrase

        //se tamanho for igual a 0 tem que escrever, se for igual a o tamanho do array tem que apagar
        if (size.length == animaText.frase[indexF].length) {
            animaText.apagar = true

        }else if (size.length == 0) {  
            //mudar de frase 
            if (animaText.frase.length - 1 == indexF) {
                animaText.indexFrase = 0
                indexF = 0
            } else {
                animaText.indexFrase += 1
                indexF += 1
            }
            animaText.apagar = false

        }


        if (animaText.apagar) {
            let index = size.length - 1
                        
            size = size.substring(0, index)
            animaText.textTitle.innerHTML = size
        } else {
            let index = size.length + 1

            size = animaText.frase[indexF].substring(0, index)
            animaText.textTitle.innerHTML = size
        }

    }
    function openClose(){
        let menu =  html.get('nav.menu-mobile')
        let width = ""

        if(openMenu){
            width = 300
            openMenu = false
        }else{
            width = 0
            openMenu = true
        }

        menu.style.width = `${width}px`
    }
    function createEventSmooth(){
        let elementInfo =  html.getAll('.scroll')

        elementInfo.forEach((value=>{
           
            value.addEventListener('click', scrollSmoth)
        }))
    }
    function scrollSmoth(e){
        e.preventDefault()
        let elemento = e.target

        let attr = elemento.getAttribute('href')
        console.log(attr)
        
        let smoothElement = html.getID(attr)
        console.log(smoothElement)
        let smoothTop = smoothElement.offsetTop

        scrollTo({
            top:smoothTop,
            behavior: 'smooth'
        })
    }
    function init() {
        setInterval(() => {
            updateTextTitle()
        }, animaText.duracao);

        let btnOpen = html.get('.container-menu-mobile label')
        let btnClose = html.getID('fechar')
        
        btnOpen.addEventListener('click', openClose)
        btnClose.addEventListener('click', openClose)

        createEventSmooth()
        
    }
    //1 um minuto de espera para esperar a animação do texto se movendo acabar.
    //animação de escrever começar
    setTimeout(init,1000)
})



   //animação de carregamento. não ultilizado
    // let loading = document.querySelector("#loading")
    // loading.style.opacity = 0
    // setTimeout(()=>{
    //     loading.style.display = "none"
    // },2000)

