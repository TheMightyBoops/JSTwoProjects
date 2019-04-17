class Book {

    constructor() {
        this._title = "";
        this._pageCount = "";
        this._coverImageRef = "";

    }


    //access and mutate here


    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get pageCount() {
        return this._pageCount;
    }

    set pageCount(value) {
        this._pageCount = value;
    }

    get coverImageRef() {
        return this._coverImageRef;
    }

    set coverImageRef(value) {
        this._coverImageRef = value;
    }

//methods here
}

