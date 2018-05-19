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

    getFlickItem(itemID) {

        let itemToReturn

        this.flicks.forEach((obj) => {
            if (itemID === obj.id.toString()) {
                itemToReturn = obj
            }
        })

        return itemToReturn

    },

    swapFlickItem(flickOneIndex, flickTwoIndex) {
        const tempObj = this.flicks[flickOneIndex]

        this.flicks[flickOneIndex] = this.flicks[flickTwoIndex]
        this.flicks[flickTwoIndex] = tempObj
    },

    deleteListItem(ev) {
        
        //this should get the li element of the button that was clicked
        const item = ev.target.parentNode.parentNode
        const itemID = item.dataset.id

        //remove item from flick array
        const flickObj = this.getFlickItem(itemID)
        this.flicks.splice(this.flicks.indexOf(flickObj), 1)
          

        //remove item from list
        item.remove()

    },

    favoriteListItem(ev) {
        
        //the li element to be styled
        const item = ev.target.parentNode.parentNode
        const itemID = item.dataset.id

        const flickObj = this.getFlickItem(itemID)
        flickObj.fav = !(flickObj.fav)
        

        if (flickObj.fav) {
            item.style.backgroundColor = '#dfdfdf'
        }
        else {
            item.style.backgroundColor = '#ffffff'
        }

    },

    moveListItemUp(ev) {

        //li element to be moved
        const item = ev.target.parentNode.parentNode

        if (item === item.parentNode.firstElementChild) {
            return
        }

        const itemID = item.dataset.id

        item.parentNode.insertBefore(item, item.previousSibling)

        const itemObject = this.getFlickItem(itemID)

        const itemObjectIndex = this.flicks.indexOf(itemObject)

        this.swapFlickItem(itemObjectIndex, itemObjectIndex-1)


    },

    moveListItemDown(ev) {

        //li element to be moved
        const item = ev.target.parentNode.parentNode
        
        if (item === item.parentNode.lastElementChild) {
            return
        }

        const itemID = item.dataset.id
        
        item.parentNode.insertBefore(item.nextSibling, item)
        
        const itemObject = this.getFlickItem(itemID)

        const itemObjectIndex = this.flicks.indexOf(itemObject)
        
        this.swapFlickItem(itemObjectIndex, itemObjectIndex+1)

    },

    changeText(ev) {

        //li element to updateText for (in the flicks array)
        const item = ev.target.parentNode
        const itemID = item.dataset.id

        const text = ev.target

        const itemObject = this.getFlickItem(itemID)

        itemObject.name = text.innerText

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
        const upButton = itemActions.querySelector('button.up')
        const downButton = itemActions.querySelector('button.down')
        const editableText = item.querySelector('.flickName')

        deleteButton.addEventListener('click', (ev) => {
            this.deleteListItem(ev)
        })
        favoriteButton.addEventListener('click', (ev) => {
            this.favoriteListItem(ev)
        })
        upButton.addEventListener('click', (ev) => {
            this.moveListItemUp(ev)
        })
        downButton.addEventListener('click', (ev) => {
            this.moveListItemDown(ev)
        })
        editableText.addEventListener('input', (ev) => {
            this.changeText(ev)
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