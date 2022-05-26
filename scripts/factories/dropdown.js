function dropdownFactory(data) {
    const { appliance } = data;

    function getApplianceDropdownCardDOM() {      
        dropdownTemplate = `<li><a class="dropdown-item applianceItemGreen" href="#">${appliance}</a></li>`
        return (dropdownTemplate)
    }

    function addListener () {
        const closeTagBtn = document.querySelectorAll(".closeIngredient");
        closeTagBtn.forEach((tag) =>tag.addEventListener('click', _deleteTag));

        const listenerTag = document.querySelectorAll(".dropdown-item");
        listenerTag.forEach (function (dropdownItem) {
            dropdownItem.addEventListener('click', _onclickOnDropdown);
        }); 
    }

    function _onclickOnDropdown(event) {
        let currentTagTarget = event.currentTarget;
        let tagData = currentTagTarget.dataset.appliance;
        _displayTag (tagData);
        const a = document.querySelector('a');
        if  (a.classList.contains('applianceItemGreen')) {
            selectedAppliances.push(currentTagTarget);
        }
    }

    function _displayTag() {      
        tagTemplate = 
        `<div class="singleTag btn-sucess d-flex flex-row">
            <button class="btn btn-sucess closeIngredient">currentTagTarget<span class="fa-regular fa-circle-xmark"></span></button>
        </div>`
        return (tagTemplate)
    }

    function _deleteTag () {

    }
    return { appliance, getApplianceDropdownCardDOM, addListener }
}