const listData = [
            {
                title: 'Awwards',
                awards: [
                    { name: 'Site of the Day', count: 3 },
                    { name: 'Developer Award', count: 1 },
                    { name: 'Honorable Mention', count: 7 },
                    { name: 'Mobile Exelence', count: 3 },
                ]
            },
            {
                title: 'CSS Design Awards',
                awards: [
                    { name: 'UX Design Award', count: 10 },
                    { name: 'UI Design Award', count: 4 },
                    { name: 'Innovation Design Award', count: 7 },
                    { name: 'Website of the Day', count: 13 },
                ]
            },
        ]



class ListManager {
    constructor(config = {}, listData = []) {
        const {
            listSelector = '[data-js-awards-statistics]',
        } = config;

        this.awardsStatisticsElement = document.querySelector(listSelector)

        if (!this.awardsStatisticsElement) {
            throw new Error('One or more required DOM elements are missing')
        }

        this.listArray = listData
    }

    init() {
        this.getList()
    }

    calculateAmount(listObj) {
        let allCounts = 0
        listObj.awards.forEach((listItem) => allCounts += listItem.count)
        return allCounts
    }

    createList(title, listAmount, awardsArray) {
        const newListElement = document.createElement('div')
        newListElement.classList.add('awards__list')
        newListElement.innerHTML = `
            <div class="awards__list-info">
                <p class="awards__list-title">${title}</p>
                <p class="awards__list-total">${listAmount}</p>
            </div>
            <ul class="awards__list-content">
                ${awardsArray.map((item) => this.setItem(item)).join('')}
            </ul>
        `
        this.awardsStatisticsElement.appendChild(newListElement)
    }

    setItem(itemData) {
        const item = `
            <li class="awards__item">
                <p class="awards__item-description">${itemData.name}</p>
                <p class="awards__item-amount">${itemData.count}</p>
            </li>
        `
        return item
    }

    getList() {
        this.listArray.forEach((item) => {
            const title = item.title,
                  listAmount = this.calculateAmount(item),
                  awardsArray = item.awards

            this.createList(title, listAmount, awardsArray)

        })
    }

}


const listManager = new ListManager({}, listData)
listManager.init()