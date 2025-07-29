class AdaptiveHeader {
    constructor(config = {}) {
        const {
            navSelector = '[data-js-nav]',
            burgerSelector = '[data-js-burger-button]',
            backgroundSelector = '[data-js-background]',
            logoSelector = '[data-js-logo]',
        } = config;

        this.navMenuElement = document.querySelector(navSelector)
        this.headerInnerElement = document.querySelector('.header__inner')
        this.burgerButtonElement = document.querySelector(burgerSelector)
        this.bodyElement = document.querySelector('body')
        this.backgroundElement = document.querySelector(backgroundSelector)
        this.logoManagerElement = new LogoManager(document.querySelector(logoSelector))


        if (!this.navMenuElement || 
            !this.burgerButtonElement || 
            !this.bodyElement || 
            !this.backgroundElement) {
            throw new Error('One or more required DOM elements are missing')
        }
    }

    init() {
        this.showAdaptiveMenu()
    }

    showAdaptiveMenu() {
        this.burgerButtonElement.addEventListener('click', () => {
            this.toggleClass(this.burgerButtonElement, 'btn-active') // Animate Burger Button
            this.toggleClass(this.backgroundElement, 'modal__background--active') // Background Toggle
            this.toggleClass(this.bodyElement, 'body--locked') // Lock Scroll Toggle
            this.toggleClass(this.navMenuElement, 'nav-active') // Navigation Menu Toggle
        })
    }

    toggleClass(element, className) {
        element.classList.toggle(className)
    }
}

class LogoManager {
    constructor(logoElement) {
        if (!logoElement) throw new Error('Logo element is missing')
        this.logoElement = logoElement
        this.updatePosition = this.updatePosition.bind(this);
        window.addEventListener('resize', this.updatePosition)
        this.updatePosition()
    }

    updatePosition() {
        let logoPosition = (window.innerWidth / 2) - (this.logoElement.offsetWidth / 2)
        this.logoElement.style.left = `${logoPosition}px`
    }
}

const adaptiveHeader = new AdaptiveHeader()
adaptiveHeader.init()