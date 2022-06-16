function dropdownFactory (element) {

    let selectedItems = []
    const dropdown = element.querySelector(".dropdownItems")
    const tags = document.querySelector(".tags")
    const div =  document.createElement( 'div' )
    const color = element.getAttribute("data-color")
    let dataSearch = []
    const SearchField = element.getElementsByClassName("tag-search-input")[0];
    SearchField.addEventListener('change', searchFieldValue)

    function getItemDropdownCardDOM(data) {
        dataSearch = data
        let dropdownTemplate = ""
        dataSearch.forEach(function (item) {
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

    function _displayTag(currentTagTarget) {  
        
        //create elements
        const button = document.createElement( 'button' )
        const spanText = document.createElement( 'span' )
        const spanCross = document.createElement( 'span' )

        //configure elements
        if (color == "red") {
            div.setAttribute("class", "singleTag red d-flex flex-row");
            button.setAttribute("class", "btn red");
        }
        if (color == "blue") {
            div.setAttribute("class", "singleTag blue d-flex flex-row");
            button.setAttribute("class", "btn blue");
        }
        if (color == "green") {
            div.setAttribute("class", "singleTag green d-flex flex-row");
            button.setAttribute("class", "btn green");
        }
        spanText.setAttribute("class", "btnText");
        spanText.innerHTML=currentTagTarget
        spanCross.setAttribute("class", "fa-regular fa-circle-xmark");

        //append elements
        tags.appendChild(div)
        div.appendChild(button);
        button.appendChild(spanText);
        button.appendChild(spanCross);

        const closeTagBtn = div;
        closeTagBtn.forEach((tag) =>tag.addEventListener('click', _deleteTag));

        return (tags)
        

    }

    function closeListener() {
        const closeTagBtn = div;
        closeTagBtn.forEach((tag) =>tag.addEventListener('click', _deleteTag));
    }

    function _deleteTag (event) {
        let currentTagTarget = event.currentTarget;
        const istagToDelete = (elementToFind) => elementToFind == currentTagTarget.innerHTML;
        let tagToDelete = selectedItems.findIndex(istagToDelete)
        selectedItems.splice(tagToDelete, 1)

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

    return { selectedItems, getItemDropdownCardDOM, closeListener }
}