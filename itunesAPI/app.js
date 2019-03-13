var app = new Vue({
    // el: the DOM element to be replaced with a Vue instance
    el: '#app',

    // data: all the data for the app
    data: {
        url: "https://itunes.apple.com/search",

        searching: true,
        searchTerm: '',
        searchResults: new SongCollection(),
        songs: new SongCollection(),
        //bookmarks: new SongCollection(),
        //favorites: new SongCollection(),
        library: 'library',
    },

    // methods: usually "events" triggered by v-on:
    methods: {
        // change "page" by setting books array
        display(library) {
            this.library = library;
            this.songs = this.searchResults
        }
        ,

        // LOAD BOOKS
        searchSongs() {
            // prepare and perform search
            if(this.searchTerm){
                // clear results
                this.searchResults = new SongCollection();

                // display message
                this.searching = true;

                // build request arguments
                let url = this.url;
                let config = {
                    params: {
                        term: this.searchTerm,
                        kind:'song'
                    }
                };
                // TODO: build ajax request arguments

                // execute ajax request using promises
                this.$http.get(url, config).then(
                  function (response) {
                      if(response.data.resultCount > 0) {
                          console.log("worked");
                          this.searchResults = response.data.results;
                      }

                      //kill search message
                      this.searching = false;

                      this.display('store');
                  }
                ).catch(function (error) {
                    console.error('ajax error', error)
                });
                // TODO: write ajax request

            }
        },
    },

    // computed: values that are updated and cached if dependencies change
    computed: {

    },

    //mounted:  called after the instance has been mounted,
    mounted: function() {
        this.searchSongs();
    },
});