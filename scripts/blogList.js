const data = [
    {
        imageSrc: './static/images/blog/1.png',
        tag: 'Marketing',
        title: 'Curating a workplace that inspires all of us',
        date: 'February 3, 2021',
    },
    {
        imageSrc: './static/images/blog/2.png',
        tag: 'Design',
        title: 'Designers who changed the web with Webflow',
        date: 'February 25, 2021',
    },
    {
        imageSrc: './static/images/blog/3.png',
        tag: 'Code',
        title: 'Communication between studio departments',
        date: 'March 9, 2021',
    }
]

class BlogManager {
    constructor(config = {}, data) {
        const {
            parentSelector = '[data-js-blog-list]',
        } = config

        this.data = data

        this.parentElement = document.querySelector(parentSelector)
    }

    init() {
        this.getList()

        
    }

    getList() {
        this.data.forEach((item) => {
            const imageSrc = item.imageSrc,
                  tag = item.tag,
                  title = item.title,
                  date = item.date

            this.parentElement.appendChild(this.setItem(imageSrc, tag, title, date))
        });
    }

    setItem(imageSrc, tag, title, date) {
        const newItem = document.createElement('li')
        newItem.classList.add('blog__item')
        newItem.innerHTML = `
            <a class="blog__item-link" href="#">
                <img src=".${imageSrc}" alt="" class="blog__item-img">
                <h4 class="blog__item-tag">${tag}</h4>
                <h3 class="blog__item-title">${title}</h3>
                <p class="blog__item-date">${date}</p>
            </a>
        `

        newItem.addEventListener('mouseenter', (event) => {
            this.animateItem(event)
        })

        newItem.addEventListener('mouseleave', (event) => {
            this.removeAnimateItem(event)
        })

        return newItem
    }

    animateItem(event) {
        event.target.style.scale = `1.05`
    }

    removeAnimateItem(event) {
        event.target.style.scale = `1`
    }
}

const blogManager = new BlogManager({}, data)
blogManager.init()