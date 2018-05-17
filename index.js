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
        console.log('delete')
    },

    favoriteListItem(ev) {
        console.log('fav')
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