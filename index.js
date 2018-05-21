class App {

    //our intializing object and its values
    constructor(selectors) {
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
    }

    //returns the object in our flicks array which has the
    //passed in itemID
    getFlickItem(itemID) {

        let itemToReturn

        this.flicks.forEach((obj) => {
            if (itemID === obj.id.toString()) {
                itemToReturn = obj
            }
        })

        return itemToReturn

    }

    //needs the index of two flicks in the flicks array
    //and then swaps the values at those two indexes
    swapFlickItem(flickOneIndex, flickTwoIndex) {
        const tempObj = this.flicks[flickOneIndex]

        this.flicks[flickOneIndex] = this.flicks[flickTwoIndex]
        this.flicks[flickTwoIndex] = tempObj
    }

    //an event handler which triggers when the delete button is clicked
    //removes the deleted item from the flicks array and the display list
    deleteListItem(ev) {
        
        //this should get the li element of the button that was clicked
        const item = ev.target.parentNode.parentNode
        const itemID = item.dataset.id

        //remove item from flick array
        const flickObj = this.getFlickItem(itemID)
        this.flicks.splice(this.flicks.indexOf(flickObj), 1)
          

        //remove item from list
        item.remove()

    }

    //event handler which triggers when the fav button is clicked
    //highlights the background color of that list item and
    //sets its fav status to true/false in the flicks array
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

    }

    //triggers when up button is clicked, swaps the item with
    //the one above it in the flicks array and the displayed list
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


    }

    //triggers when down button is clicked, swaps the item with
    //the one below it in the flicks array and the displayed list
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

    }

    //triggered whenever the content of a displayed flick's name is changed
    //updates the flick's name in the flicks array
    changeText(ev) {

        //li element to updateText for (in the flicks array)
        const item = ev.target.parentNode
        const itemID = item.dataset.id

        const text = ev.target

        const itemObject = this.getFlickItem(itemID)

        itemObject.name = text.innerText

    }

    //creates a flick list item based upon the passed in
    //flick object and then returns it
    renderListItem(flick) {

        //cloning our template list item, and changing some
        //of its attribute values for the passed in flick
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        item
            .querySelector('.flickName')
            .textContent = flick.name

        //the actions of this list item
        const itemActions = item.querySelector('.actions')

        //buttons for this list item
        const deleteButton = itemActions.querySelector('button.alert')
        const favoriteButton = itemActions.querySelector('button.warning')
        const upButton = itemActions.querySelector('button.up')
        const downButton = itemActions.querySelector('button.down')
        const editableText = item.querySelector('.flickName')

        //adding listeners to this list items buttons
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
    }

    //triggers whenever a new flick is submitted
    //adds that flick to the flicks array and creates
    //its list item and displays it
    handleSubmit(ev) {

        //the form submitted
        const f = ev.target

        //our flick object to display
        const flick = {
            id: ++this.max,
            name: f.flickName.value,
            fav: false,
        }

        //adding our flick object to the flicks arrray
        this.flicks.unshift(flick)
        
        //creating and displaying the flick object's list item
        const item = this.renderListItem(flick)
        this.list.insertBefore(item, this.list.firstChild)

        //resetting the form
        f.reset()
    }
}

//intializing the application
const app = new App({
    formSelector: '#flickForm',
    listSelector: '#flickList',
    templateSelector: '.flick.template',
})