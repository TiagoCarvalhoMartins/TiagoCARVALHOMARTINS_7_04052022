function dropdownFactory (data, element) {

    let selectedItems = []
    const dropdown = element.querySelector(".dropdownItems")
    const tags = document.querySelector(".tags")
    const color = element.getAttribute("data-color")
    getApplianceDropdownCardDOM();

    function getApplianceDropdownCardDOM() {
        
        let dropdownTemplate = ""
        data.forEach(function (item) {
            dropdownTemplate += `<li><a class="dropdown-item ${color}" href="#">${item}</a></li>`
        })
        dropdown.innerHTML = dropdownTemplate

        const listenerTag = element.querySelectorAll(".dropdown-item");
        listenerTag.forEach (function (dropdownItem) {
            dropdownItem.addEventListener('click', _onclickOnDropdown);
        });
    }

    function _onclickOnDropdown(event) {
        let currentTagTarget = event.currentTarget;
        selectedItems.push(currentTagTarget.innerHTML)
        _displayTag (currentTagTarget.innerHTML);
        
    }

    function _displayTag(tagName) {  

        tagTemplate = 
        `<div class="singleTag ${color} d-flex flex-row">
            <button class="btn ${color} ">${tagName}<span class="fa-regular fa-circle-xmark"></span></button>
        </div>`
        tags.innerHTML += tagTemplate
    }

    function closeListener() {
        const closeTagBtn = element.querySelector(".singleTag");
        closeTagBtn.forEach((tag) =>tag.addEventListener('click', _deleteTag));
    }

    function _deleteTag (event) {
        let currentTagTarget = event.currentTarget;
        const istagToDelete = (elementToFind) => elementToFind = currentTagTarget.innerHTML;
        let tagToDelete = selectedItems.findIndex(istagToDelete)
        selectedItems.splice(tagToDelete, 1)

    }
    return { selectedItems, getApplianceDropdownCardDOM, closeListener }
}