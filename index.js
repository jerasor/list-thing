const app = {
    init(selectors) {
        this.flicks = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)

        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', (ev) => {
                ev.preventDefault()
                this.handleSubmit(ev)
            })
    },

    deleteListItem(ev) {
        
        //this should get the li element of the button that was clicked
        const item = ev.target.parentNode.parentNode
        const itemID = item.dataset.id

        //remove item from flick array
        this.flicks.forEach((obj) => {
            if (itemID === obj.id.toString()) {
                this.flicks.splice(this.flicks.indexOf(obj), 1)
            }
        })

        //remove item from list
        item.remove()

    },

    favoriteListItem(ev) {
        
        //the li element to be styled
        const item = ev.target.parentNode.parentNode
        const itemID = item.dataset.id

        let favStatus = false

        this.flicks.forEach((obj) => {
            if (itemID === obj.id.toString()) {
                obj.fav = !(obj.fav)
                favStatus = obj.fav
            }
        })

        if (favStatus) {
            item.style.backgroundColor = '#dfdfdf'
        }
        else {
            item.style.backgroundColor = '#ffffff'
        }

    },

    renderListItem(flick) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        item
            .querySelector('.flickName')
            .textContent = flick.name

        const itemActions = item.querySelector('.actions')

        const deleteButton = itemActions.querySelector('button.alert')
        const favoriteButton = itemActions.querySelector('button.warning')

        deleteButton.addEventListener('click', (ev) => {
            this.deleteListItem(ev)
        })
        favoriteButton.addEventListener('click', (ev) => {
            this.favoriteListItem(ev)
        })

        return item
    },

    handleSubmit(ev) {
        const f = ev.target
        const flick = {
            id: ++this.max,
            name: f.flickName.value,
            fav: false,
        }

        this.flicks.unshift(flick)
        
        const item = this.renderListItem(flick)
        this.list.insertBefore(item, this.list.firstChild)

        f.reset()
    },
}

app.init({
    formSelector: '#flickForm',
    listSelector: '#flickList',
    templateSelector: '.flick.template',
})