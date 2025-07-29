const data = [
    { name: 'Graphic Design', percent: 80, },
    { name: 'Lead Generation', percent: 40, },
    { name: 'Photoshop', percent: 70, },
    { name: 'Illustration', percent: 100, },
]

class SkillsManager {
    constructor(config = {}, data) {
        const {
            parentSelector = '[data-js-skills-list]'
        } = config

        this.data = data

        this.parentElement = document.querySelector(parentSelector)
    } 

    

    init() {
        this.getList()
    }

    getList() {
        this.data.forEach((item) => {
            const name = item.name,
                  percent = item.percent

            this.parentElement.appendChild(this.setItem(name, percent))
        });
    }

    setItem(name, percent) {
        const newItem = document.createElement('li')
        newItem.classList.add('skills__item')
        newItem.innerHTML = `
            <h3 class="skills__item-name">${name}</h3>
            <p class="skills__item-percent">${percent}%</p>
        `
        this.setPersentLine(percent, newItem)

        return newItem
    }

    setPersentLine(percent, item) {
        item.style.backgroundSize = `${percent}% 2px`
    }
}

const skillsManager = new SkillsManager({}, data)
skillsManager.init()