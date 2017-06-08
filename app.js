const app = {
    init(selectors) {
        this.flicks = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.addFlick.bind(this))
    },
    // Method to addd flick to DOM and array
    addFlick(ev) {
        ev.preventDefault()
        const f = ev.target
        const flick = {
            id: this.max + 1,
            name: f.flickName.value,
        }
        this.flicks.unshift(flick)
        const listItem = this.renderListItem(flick)
        const deleteBtn = this.renderDeleteButton('delete'+flick.id)
        listItem.appendChild(deleteBtn)

        const promoteBtn = this.renderPromoteButton('promote'+flick.id)
        listItem.appendChild(promoteBtn)

        const upBtn = this.renderUpButton('up'+flick.id)
        listItem.appendChild(upBtn)

        const downBtn = this.renderDownButton('down'+flick.id)
        listItem.appendChild(downBtn)        

        this.list.insertBefore(listItem,this.list.firstChild)
        f.reset()
            ++ this.max
    },

    //Method to render list in dom
    renderListItem(flick) {
        const item = document.createElement('li')
        item.textContent = flick.name
        item.dataset.id = flick.id
        return item
    },

    //render Up button
    renderUpButton(upID){
        const upBtn = document.createElement('button')
        upBtn.setAttribute('id', upID)
        upBtn.innerHTML = 'Up'
        upBtn.setAttribute('class','success button right')
        //upBtn.addEventListener('click', this.moveUp.bind(this, upID.parentNode))
        return upBtn
    },

    //render Down button
    renderDownButton(downID){
        const downBtn = document.createElement('button')
        downBtn.setAttribute('id', downID)
        downBtn.innerHTML = 'Down'
        downBtn.setAttribute('class','success button right')
        //downBtn.addEventListener('click', this.removeFlick.bind(this, deleteID))
        return downBtn
    },

    renderDeleteButton(deleteID){
        const deleteBtn = document.createElement('button')
        deleteBtn.setAttribute('id', deleteID)
        deleteBtn.innerHTML = 'Delete'
        deleteBtn.setAttribute('class','warning button right')
        deleteBtn.addEventListener('click', this.removeFlick.bind(this, deleteID))
        return deleteBtn
    },

    renderPromoteButton(promoteID){
        const promoteBtn = document.createElement('button')
        promoteBtn.setAttribute('id', promoteID)
        promoteBtn.innerHTML = 'Promote'
        promoteBtn.setAttribute('class','success button right') 
        promoteBtn.addEventListener('click', this.promote.bind(this, promoteID))
        return promoteBtn
    },

    removeFlick(deleteID){
        const row = document.getElementById(deleteID).parentNode 
        for (let i=0; i < this.flicks.length; i++) {
            let Id = this.flicks[i].id.toString()
            if (Id === row.dataset.id) {
                this.flicks.splice(i, 1)
                break
            }
        }
        row.remove()

    },

    promote(promoteID){
        const row = document.getElementById(promoteID).parentNode
        row.classList.toggle('promote')
    },

}

app.init({
    formSelector: '#flick-form',
    listSelector: '#flick-list'
})