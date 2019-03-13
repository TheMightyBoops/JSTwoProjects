// creates an array with extra methods for our Book Collections
var SongCollection = function(arr){
    // Load array if provided.
    // Load empty array if one was not provided.
    if(!Array.isArray(arr)){
        arr = [];
    }

    // Methods for using the collection.
    arr.add = function(song){
        return arr.push(song);
    };

    arr.remove = function(song){
        return arr.splice(arr.findBook(song), 1);
    };

    arr.contains = function(song){
        return this.findBook(song) >= 0;
    };

    // Internal function for finding books.
    // Assumes all books have an id.
    arr.findSong = function(song){
        return arr.findIndex(function(item){
            return item.id == song.id;
        });
    };

    // return array with added collection methods
    return arr;
};