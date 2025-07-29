const listData = [
    {
        imageSrc: 'static/images/works/01.png',
        title: 'Conference',
        description: 'Art Direction, Design',
    },
    {
        imageSrc: 'static/images/works/02.png',
        title: 'Magazine',
        description: 'Logo, User Interface',
    },
    {
        imageSrc: 'static/images/works/03.png',
        title: 'Ivor Application',
        description: 'User Interface',
    },
    {
        imageSrc: 'static/images/works/04.png',
        title: 'Black Apple Watch',
        description: 'Logo, User Interface',
    },
    {
        imageSrc: 'static/images/works/05.png',
        title: 'Flying to the moon',
        description: 'User Experiences',
    },
    {
        imageSrc: 'static/images/works/06.png',
        title: 'Dharma Webfont',
        description: 'Branding, Web Design',
    },
]

class ListManager {
    constructor(config = {}, listData) {
        const {
            listSelector = '[data-js-works-content]',
        } = config;

        this.parentElement = document.querySelector(listSelector)
        this.listArray = listData
    }

    init() {
        this.listArray.map((item) => {
            this.createList(item.imageSrc, item.title, item.description)
        })
    }

    createList(src, title, description) {
        const newListElement = document.createElement('li')
        newListElement.classList.add('works__item')
        newListElement.innerHTML = this.setItemTemplate(src, title, description)

        newListElement.addEventListener('mouseenter', (event) => {
            this.animateItem(event)
        })

        newListElement.addEventListener('mouseleave', (event) => {
            this.removeAnimateItem(event)
        })
        
        this.parentElement.appendChild(newListElement)
    }

    setItemTemplate(src, title, description) {
        const itemTemplate = `
            <img src="./${src}" class="works__item-img" width="470" height="500">
            <h3 class="works__item-title">${title}</h3>
            <p class="works__item-description">${description}</p>
        `

        return itemTemplate
    }

    animateItem(event) {
        event.target.style.scale = `1.05`
    }

    removeAnimateItem(event) {
        event.target.style.scale = `1`
    }
}

const listManager = new ListManager({}, listData)
listManager.init()
