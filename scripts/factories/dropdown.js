function dropdownFactory (element) {

    let selectedItems = []
    const dropdown = element.querySelector(".dropdownItems")
    const tags = document.querySelector(".tags")
    const color = element.getAttribute("data-color")
    let dataSearch = []
    const SearchField = element.getElementsByClassName("tag-search-input")[0];
    SearchField.addEventListener('input', searchFieldValue)

    function initDropdown(data) {
        dataSearch = data
    }

    function getItemDropdownCardDOM(data) {
        //dataSearch = data
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
        search ();
        
    }

    function _displayTag(currentTagTarget) {  
        
        //create elements
        const div =  document.createElement( 'div' )
        const button = document.createElement( 'button' )
        const spanText = document.createElement( 'span' )
        const spanCross = document.createElement( 'span' )

        //configure elements
        
        div.setAttribute("class", "singleTag " + color + " d-flex flex-row");
        button.setAttribute("class", "btn " + color);
        spanText.setAttribute("class", "btnText");
        spanText.innerHTML=currentTagTarget
        spanCross.setAttribute("class", "fa-regular fa-circle-xmark");

        //append elements
        tags.appendChild(div)
        div.appendChild(button);
        button.appendChild(spanText);
        button.appendChild(spanCross);

        div.addEventListener('click', _deleteTag)

        return (tags)
        

    }

    function _deleteTag (event) {
        let currentTagTarget = event.currentTarget;
        const tagSelector = currentTagTarget.querySelector(".btnText")
        const istagToDelete = (elementToFind) => elementToFind == tagSelector.innerHTML;
        let tagToDelete = selectedItems.findIndex(istagToDelete)
        selectedItems.splice(tagToDelete, 1)
        currentTagTarget.remove();

    }

    function searchFieldValue() {
        SearchFieldValue = this.value;
        SearchFieldValue = SearchFieldValue.toLowerCase();
        let dataSearchResult = []
        let dataSearchLower = dataSearch.map(item => item.toLowerCase());

        dataSearchLower.forEach(function (items) {
            if (items.includes(SearchFieldValue)) {
                dataSearchResult.push(items)
                return (getItemDropdownCardDOM(dataSearchResult));
            }
        })
    }

    return { selectedItems, getItemDropdownCardDOM, initDropdown }
}