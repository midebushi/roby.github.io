const data = [
    {
        description: '"The public is more familiar with bad design than good design. It is, in effect, conditioned to prefer bad design, because that is what it lives with."',
        iconSrc: 'static/images/reviews/caitlin.png',
        name: 'Caitlin Ward',
        job: 'Webflow Founder',
    },
    {
        description: '"A designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away."',
        iconSrc: 'static/images/reviews/matthew.png',
        name: 'Matthew Webster',
        job: 'Webflow Founder',
    },
    {
        description: '"The public is more familiar with bad design than good design. It is, in effect, conditioned to prefer bad design, because that is what it lives with."',
        iconSrc: 'static/images/reviews/paige.png',
        name: 'Paige Brennan',
        job: 'Webflow Founder',
    },
    {
        description: '"A designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away."',
        iconSrc: 'static/images/reviews/caitlin.png',
        name: 'Vladislav Bezmaternykh',
        job: 'Webflow Founder',
    },
    {
        description: '"The public is more familiar with bad design than good design. It is, in effect, conditioned to prefer bad design, because that is what it lives with."',
        iconSrc: 'static/images/reviews/caitlin.png',
        name: 'Stas',
        job: 'Webflow Founder',
    },
    
]

class ReviewsManager {
    constructor(config = {}, data) {
        const {
            reviewsContentSelector = '[data-js-reviews-content]',
            reviewsControlSelector = '[data-js-reviews-control]'
        } = config

        this.parentElement = document.querySelector(reviewsContentSelector)
        this.controlElement = document.querySelector(reviewsControlSelector)
        this.data = data

    }

    init() {
        let counter = 0
        this.data.forEach((item) => {
            this.createList(item.description, item.iconSrc, item.name, item.job, counter)
            counter += 1
        })
        this.setParentWidth(counter)
        this.getCorrectedWidth()

        window.addEventListener('resize', () => {
            this.getCorrectedWidth()
        })
        
        this.controlElement.addEventListener('click', (event) => {
            
            if (event.target != this.controlElement) {
                this.toggleList(event)
                this.setActiveButton(event)
            }
        })


    }

    getCorrectedWidth() {
        let correctedWidth = 0
        if (window.innerWidth <= 1440) {
            correctedWidth = (window.innerWidth - 1440) / 2
            this.parentElement.style.left = `${correctedWidth}px`  
        } else {
            this.parentElement.style.left = 0
        }
    }

    setParentWidth(counter) {
        if (window.innerWidth >= 660) {
            this.parentElement.style.width = `${(460 * counter) + (30 * (counter - 1))}px`
        } else {
            this.parentElement.style.width = `${(300 * counter) + (30 * (counter - 1))}px`
        }
        
    }

    setActiveButton(event) {
        const buttons = [...this.controlElement.children]
        buttons.forEach((item) => {
            item.classList.remove('reviews__control-button--active')
        })
        event.target.classList.add('reviews__control-button--active')
    }

    toggleList(event) {
        const reviewList = Array.from(this.parentElement.children)
        
        const currentItem = reviewList[event.target.id]
        
        reviewList.forEach((item) => {
            item.classList.remove('reviews__item--is-active')
        })
        currentItem.classList.add('reviews__item--is-active')

        this.moveList(currentItem, event.target.id)
    }

    moveList(currentItem, id) {
        const itemWidth = currentItem.getBoundingClientRect().width;
        const itemsGap = parseInt(getComputedStyle(this.parentElement).gap)
        let width = 0
        if (id === '0') {
            width = (itemWidth + itemsGap) * 1  
        } else if (id === '1') {
            width = 0
        } else {
            width = (itemWidth + itemsGap) * -(parseInt(id) - 1)
        }
        this.parentElement.style.transform = `translateX(${width}px)`
    }

    createList(description, iconSrc, name, job, counter) {
        const newListElement = document.createElement('li')
        newListElement.classList.add('reviews__item')

        if (counter === 1) newListElement.classList.add('reviews__item--is-active')

        newListElement.innerHTML = this.setReviewTemplate(description, iconSrc, name, job)

        this.parentElement.appendChild(newListElement)

        this.createButton(counter)
    }

    setReviewTemplate(description, iconSrc, name, job) {
        const itemTemplate = `
            <p class="reviews__item-description">${description}</p>
            <img src="./${iconSrc}" class="reviews__item-icon">
            <h4 class="reviews__item-name">${name}</h4>
            <p class="reviews__item-job">${job}</p>
        `
        return itemTemplate
    }   

    createButton(counter) {
        
        const newButtonElement = document.createElement('button')
        newButtonElement.classList.add('reviews__control-button')
        newButtonElement.setAttribute('type', 'button')
        newButtonElement.setAttribute('id', `${counter}`)

        this.controlElement.appendChild(newButtonElement)
    }

}

const reviewsManager = new ReviewsManager({}, data)
reviewsManager.init()
