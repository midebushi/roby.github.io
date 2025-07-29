const data = [
    {   iconSrc: `static/images/footer/facebook.png`,
        alt: 'facebook',
    },
    {   iconSrc: `static/images/footer/instagram.png`,
        alt: 'instagram',
    },
    {   iconSrc: `static/images/footer/twitter.png`,
        alt: 'twitter',
    },
    {   iconSrc: `static/images/footer/in.png`,
        alt: 'in',
    },
    {   iconSrc: `static/images/footer/ball.png`,
        alt: 'ball',
    },
]

class FooterIconsManager {
    constructor(config = {}, data) {
        const {
            parentSelector = '[data-js-footer-social]',
        } = config

        this.data = data

        this.parentElement = document.querySelector(parentSelector)
    }

    init() {
        this.getList()
    }

    getList() {
        this.data.forEach((item) => {
            const iconSrc = item.iconSrc,
                  alt = item.alt

            this.parentElement.appendChild(this.setItem(iconSrc, alt))
        });
    }

    setItem(iconSrc, alt) {
        const newItem = document.createElement('li')
        newItem.classList.add('footer__social-item')
        newItem.innerHTML = `
            <a href="#" class="footer__social-link">
                <img src="./${iconSrc}" alt=${alt}>
            </a>
        `

        return newItem
    }

}

const footerIconsManager = new FooterIconsManager({}, data)
footerIconsManager.init()
