function dropdownFactory (data, element) {

    let selectedItems = []
    const dropdown = element.querySelector(".dropdownItems")
    getApplianceDropdownCardDOM();

    function getApplianceDropdownCardDOM() {
        
        data.forEach(function (appliance) {
            dropdownTemplate = `<li><a class="dropdown-item applianceItemGreen" href="#">${appliance}</a></li>`
        })
        //dropdown.appendChild(appliance)

        const listenerTag = element.querySelectorAll(".dropdown-item");
        listenerTag.forEach (function (dropdownItem) {
            dropdownItem.addEventListener('click', _onclickOnDropdown);
        });
    }

    function _onclickOnDropdown(event) {
        let currentTagTarget = event.currentTarget;
        let tagData = currentTagTarget.dataset.appliance;
        _displayTag (tagData);
        selectedItems.push(currentTagTarget.innerHTML)
        
    }

    function _displayTag() { 
        const closeTagBtn = element.querySelectorAll(".closeIngredient");
        closeTagBtn.forEach((tag) =>tag.addEventListener('click', _deleteTag)); 

        tagTemplate = 
        `<div class="singleTag btn-sucess d-flex flex-row">
            <button class="btn btn-sucess closeIngredient">currentTagTarget<span class="fa-regular fa-circle-xmark"></span></button>
        </div>`
        return (tagTemplate)

    }

    function _deleteTag () {
        $( ".singleTag" ).remove()

    }
    return { selectedItems, getApplianceDropdownCardDOM, addListener }
}