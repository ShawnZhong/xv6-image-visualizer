const detailContentDOM = document.getElementById("detail-content");
const detailTitleDOM = document.getElementById("detail-title");

let enableHover = true;

class Grid {
    static setActive(newActiveElem) {
        this.removeOldActiveElem();
        this.activeElem = newActiveElem;
        this.setDetailContent();
        this.showRelated();
    }

    static removeOldActiveElem() {
        if (this.activeElem)
            this.activeElem.gridElement.classList.remove("hovered", "selected");
        if (this.relatedDOMList)
            this.relatedDOMList.forEach(e => e.classList.remove("related"));
    }

    static setDetailContent() {
        detailTitleDOM.innerText = this.activeElem.getTitle();

        if (!this.activeElem.detailDOM) this.activeElem.detailDOM = this.activeElem.getDetailElement();
        detailContentDOM.innerHTML = '';
        detailContentDOM.appendChild(this.activeElem.detailDOM);
    }

    static showRelated() {
        this.relatedDOMList = this.activeElem.getRelatedDOMList();
        this.relatedDOMList.forEach(e => e.classList.add("related"));
    }

    static setHovered() {
        this.activeElem.gridElement.classList.add("hovered");
    }

    static setClicked() {
        this.activeElem.gridElement.classList.add("selected");
        
    }
}

class GridItem {
    constructor() {
        this.gridText = '-';
    }


    /**
     * @returns {string}
     */
    getTitle() {
    }

    /**
     * @return  {string}
     */
    getClassName() {
    }

    /**
     * @returns {HTMLBaseElement[]}
     */
    getRelatedDOMList() {
        return [];
    }

    /**
     * @returns {HTMLBaseElement}
     */
    getDetailElement() {
    }


    getGridElement() {
        if (this.gridElement) return this.gridElement;

        this.gridElement = document.createElement("div");

        this.gridElement.classList.add(this.getClassName());
        this.gridElement.innerHTML = this.gridText;

        this.gridElement.onmouseover = () => {
            if (!enableHover) return;
            Grid.setActive(this);
            Grid.setHovered();
        };

        this.gridElement.onclick = () => {
            enableHover = !enableHover;
            Grid.setActive(this);

            if (enableHover)
                Grid.setHovered();
            else
                Grid.setClicked();
        };

        return this.gridElement;
    }
}
