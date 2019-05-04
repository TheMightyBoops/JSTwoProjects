Vue.component('v-inventory', {
    props: {
        inventoryItems: {type: Array, required: true},
        currentWeapon: {type: Object, required: true},
        currentCharacter: {type: Object, required: true}
        //dataConnection: {required:true}
    },

    created: function () {
        this.updatedMaterials = this.inventoryItems;
    },

    data() {
        return {
            qSlider: new Array(0),
            updatedMaterials: [],
            initialLoad: true,
        }
    },
    methods: {
        useMaterial(materialName, quantity) {

            //First Quan must change
            //helper method
            function applyBorder(id) {
                document.getElementById(id).style.border = '2px solid #3fff35';
                document.getElementById(id).style.borderRadius = '2px / 2px';
                document.getElementById(id).style.border
            }

            function eraseBorder(id) {
                document.getElementById(id).style.border = 'none';
            }

            eraseBorder('characterName');
            eraseBorder('weaponName');
            let newQuantity = null;
            for (let i = 0; i < this.inventoryItems.length; ++i) {
                if (this.inventoryItems[i].name === materialName) {
                    newQuantity = this.inventoryItems[i].quantity - quantity;
                    this.inventoryItems[i].quantity = newQuantity;
                    //console.log(this.inventoryItems[i].quantity);


                    let tempMult = this.currentWeapon.multiplier;
                    //this method gets the multiplyer
                    this.currentWeapon.generateMultiplier(this.inventoryItems[i].multiplier, quantity);


                    if (tempMult < this.currentWeapon.multiplier) {
                        applyBorder('weaponMultiplier');
                    } else {
                        eraseBorder('weaponMultiplier');
                    }
                    // this is for style changes
                    let level = this.currentWeapon.level;
                    //set xp being added automatically levels up
                    this.currentWeapon.totalExperience = +(this.currentWeapon.multiplier *
                        (quantity * this.inventoryItems[i].experience));


                    //if level went up these must be updated to green otherwise they must be flipped back
                    if (level < this.currentWeapon.level) {
                        applyBorder('charStrength');
                        applyBorder('charMagic');
                        applyBorder('weaponXp');
                        applyBorder('weaponLevel');
                        applyBorder('weaponStrength');
                        applyBorder('weaponMagic');
                    } else {
                        eraseBorder('charStrength');
                        eraseBorder('charMagic');
                        eraseBorder('weaponXp');
                        eraseBorder('weaponLevel');
                        eraseBorder('weaponStrength');
                        eraseBorder('weaponMagic');
                    }

                    //if they used high xp material their multiplier is reset
                    if (!this.inventoryItems[i].isOrganicMaterial) {
                        this.currentWeapon.multiplier = 1;
                    }

                    //update character
                    this.currentCharacter.equippedWeapon = this.currentWeapon;

                    break;
                }
            }
        }
    }
    ,

    template: `
        <ul> 
            <li v-for="(item, i) in inventoryItems">
                        <div v-if="item.quantity !== 0">
                        <span v-if="inventoryItems[i].isOrganicMaterial"><i class="material-icons">
                            filter_vintage
                        </i></span>
                        <span v-if="!item.isOrganicMaterial">
                        <i class="material-icons">
                            build
                        </i>
                        </span>
                        <strong>{{item.name}}</strong>&nbsp;&nbsp;&nbsp; {{item.experience}}<strong>exp.</strong>&nbsp;&nbsp;&nbsp;{{item.quantity}}<strong>qty.</strong>
                        <span v-if="qSlider[i] === 0 || qSlider.length === 0">
                            <v-btn color="error" disable>Use</v-btn>
                        </span>
                        <span v-else-if="qSlider[i] > 0">
                           <v-btn color="success" v-on:click="useMaterial(item.name, qSlider[i])">Use</v-btn> 
                        </span>
                        <span v-else>
                            <v-btn color="error" disable>Use</v-btn>
                        </span>
                        <v-flex xs10>
                            <v-slider value="0" v-model='qSlider[i]' :max="item.quantity" thumb-label></v-slider>
                        </v-flex>
                        </div>   
            <!-- TODO if an inv item is organic give it a symbol -->
            </li>
        </ul>
    `,
    watch: {
        inventoryItems: function () {
            for (let i = 0; i < this.inventoryItems.length; ++i) {
                if (this.inventoryItems[i].quantity === 0) {
                    this.inventoryItems[i].splice();
                }
            }

            console.log("change");
        }

    }
});

Vue.component('v-character-window', {
    props: {
        //characters: {type: Array, required: true},
        currentCharacter: {type: Object, required: true},
        currentWeapon: {type: Object, required: true}
    },

    data() {
        return {
            localCurrentCharacter: this.currentCharacter
        }
    },

    methods: {
        setCurrent: function () {

        }
    },


    watch: {
        currentCharacter: function (n, o) {
            this.localCurrentCharacter = this.currentCharacter;
        }
    }
    ,
    template: `
    <div xmlns="http://www.w3.org/1999/html">
        <!-- For Testing 
        <h1>{{currentCharacter.name}}</h1>
        <p>base stats</p>
        <p>phys</p>
        <p>{{currentCharacter.basePhysical}}</p>
        <p>mag</p>
        <p>{{currentCharacter.baseMagic}}</p>
        <p>derived</p>
        <p>phys</p>
        <p>{{currentCharacter.derivedPhysical}}</p>
        <p>mag</p>
        <p>{{currentCharacter.derivedMagic}}</p>
        <v-data-iterator :items="">
            <v-card>
                <v-card-title><h4>{{currentCharacter.name}}</h4></v-card-title>
            </v-card>   
        </v-data-iterator> --> 
         <v-container grid-list-md text-md-center>
                            <v-layout row wrap>
                            <v-flex md12>
                                <div id="characterName"><v-card dark color="black">{{currentCharacter.name}}</v-card></div>
                            </v-flex>
                            <v-flex xs4>
                                <v-card dark color="primary">Base Strength: {{currentCharacter.basePhysical}}</v-card>
                            </v-flex>
                            <v-flex xs4>
                                <v-card dark color="primary">Base Magic: {{currentCharacter.baseMagic}}</v-card>
                            </v-flex>
                            <v-flex xs4>    
                                <div id="charStrength"><v-card dark color="primary">Strength: {{currentCharacter.derivedPhysical}}</v-card></div>
                            </v-flex>
                            <v-flex xs4>    
                                <div id="charMagic"><v-card dark color="primary">Magic: {{currentCharacter.derivedMagic}}</v-card></div>
                            </v-flex>
                        </v-layout>
                    </v-container>  
       </div> 
    `
});

Vue.component('v-weapon-window', {

    props: {
        //weapons: {type: Array, required: true},
        currentWeapon: {type: Object, required: true}
    },

    data() {
        return {
            //currentWeapon: {type: Object},
        }
    },

    methods: {
        setCurrent: function () {

        }
    },

    watch: {
        currentWeapon() {

        }
    }
    ,
    template: `<div>
                            <v-container grid-list-md text-md-center>
                            <v-layout row wrap>
                            <v-flex md12>
                                <div id="weaponName"><v-card dark color="black">{{currentWeapon.name}}</v-card></div>
                            </v-flex>
                            <v-flex xs4>
                                <div id="weaponMultiplier"><v-card dark color="primary">Exp. Multiplier: x{{currentWeapon.multiplier}}</v-card></div>
                            </v-flex>
                            <v-flex xs4>
                               <div id="weaponXp"><v-card text-lg-center dark color="primary">Total Exp: {{currentWeapon.totalExperience}}</v-card></div>
                            </v-flex>
                            <v-flex xs4>    
                               <div id="weaponLevel"><v-card dark color="primary">Level: {{currentWeapon.level}}</v-card></div>
                            </v-flex>
                            <v-flex xs4>    
                               <div id="weaponStrength"><v-card dark color="primary">Strength Added: {{currentWeapon.weaponPhysical}}</v-card></div>
                            </v-flex>
                            <v-flex xs4>    
                                <div id="weaponMagic"><v-card dark color="primary" >Magic Added: {{currentWeapon.weaponMagic}}</v-card></div>
                            </v-flex>
                        </v-layout>
                    </v-container>  
               </div>`
});

Vue.component('v-stats-screen', {
    props: {
        currentWeapon: {type: Object},
        currentCharacter: {type: Object}
    },

    template: `<div>
            <!--<v-character-window :current-character="currentCharacter" :current-weapon="currentWeapon"></v-character-window>-->
            <v-weapon-window :current-weapon="currentWeapon"></v-weapon-window>
    </div>`
});

Vue.component('v-book-settings-pane', {
    props: {
        bookMetaData: {type: Object},
        coverImage: {type: String}
    },

    data() {
        return {
            titleRequest: new XMLHttpRequest(),
            tempRequestData: {type: Object},
            buttonText: "Search",
            titleCharacters: 20,
            pageCountCharacters: 2,
            currentJSONIndex: 0,
            previousTitle: "",
            nextTitle: "",
            results: 0,
            titleIsLocked: true,
            //coverImageURL: "./../assets/Book-Placeholder.png"
        }
    },

    methods: {
        findUserBook(titleQuery) {
            this.currentJSONIndex = 0;
            this.previousTitle = "";
            this.nextTitle = "";
            let GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1/volumes?q=";
            var queryURL = GOOGLE_BOOKS_URL + titleQuery;
            //this.titleRequest.open("GET", queryURL);
            //request.onload = function () {
            //var data = JSON.parse(this.response);
            //    console.log(request);
            //};
            //this.titleRequest.send();
            axios.get(queryURL).then(response => this.tempRequestData = response);
            //console.log(this.tempRequestData.items[0].volumeInfo.title);


        },

        moveUp() {


            if (this.tempRequestData != null && this.currentJSONIndex !== 0) {
                this.currentJSONIndex--;
                if(this.currentJSONIndex !== 0) {
                    this.previousTitle = this.tempRequestData.data.items[this.currentJSONIndex-1].volumeInfo.title;
                } else {
                    this.previousTitle = '';
                }

                this.nextTitle = this.tempRequestData.data.items[this.currentJSONIndex+1].volumeInfo.title;
                let tempTitle = this.tempRequestData.data.items[this.currentJSONIndex].volumeInfo.title;
                let tempPages = this.tempRequestData.data.items[this.currentJSONIndex].volumeInfo.pageCount;
                //console.log(this.tempRequestData.data.items);
                this.bookMetaData.title = tempTitle;
                this.bookMetaData.pageCount = tempPages;
                this.buttonText = "Search Again";

                if (tempTitle.length < 79) {
                    this.titleCharacters = tempTitle.length - 5;
                }


            }
        },

        moveDown() {
            //console.log(this.this.tempRequestData.data.items);
            if (this.tempRequestData !== undefined
                && this.currentJSONIndex < (this.tempRequestData.data.items.length-1)) {

                this.currentJSONIndex++;
                this.previousTitle = this.tempRequestData.data.items[this.currentJSONIndex-1].volumeInfo.title;
                if(this.tempRequestData.data.items.length !== (this.currentJSONIndex +1)) {
                    this.nextTitle = this.tempRequestData.data.items[this.currentJSONIndex + 1].volumeInfo.title;
                } else {
                    this.nextTitle = '';
                }
                let tempTitle = this.tempRequestData.data.items[this.currentJSONIndex].volumeInfo.title;
                let tempPages = this.tempRequestData.data.items[this.currentJSONIndex].volumeInfo.pageCount;
                //console.log(this.tempRequestData.data.items);
                this.bookMetaData.title = tempTitle;
                this.bookMetaData.pageCount = tempPages;
                this.buttonText = "Search Again";

                if (tempTitle.length < 79) {
                    this.titleCharacters = tempTitle.length - 5;
                }
            }
        },

        lockTitle() {

            this.previousTitle = "";
            this.nextTitle = "";
            this.titleIsLocked = true;
            try {
                this.$parent.$parent.$parent.coverImageURL = this.tempRequestData.data.items[this.currentJSONIndex].volumeInfo.imageLinks.thumbnail.toString();
                //this.coverImage = this.coverImageURL;
                console.log(this.coverImageURL.toString());
            } catch {
                console.log("no cover");
            }
        },

        unLockTitle() {
          this.titleIsLocked = false;
        }
    },

    mounted: function () {
        this.titleRequest.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var books = JSON.parse(this.responseText);
                console.log(books.items[0].volumeInfo.title);
                this.tempTitle = books.items[0].volumeInfo.title;

            }


        }
    },

    watch: {
        tempTitle: function (val) {
            this.bookMetaData.title = this.tempTitle;
            console.log(this.bookMetaData);


        },

        tempRequestData: function (val) {
            try {
                let tempTitle = this.tempRequestData.data.items[0].volumeInfo.title;
                let tempPages = this.tempRequestData.data.items[0].volumeInfo.pageCount;
                console.log(this.tempRequestData.data.items);
                this.bookMetaData.title = tempTitle;
                this.bookMetaData.pageCount = tempPages;
                this.buttonText = "Search Again";

                if (tempTitle.length < 79) {
                    this.titleCharacters = tempTitle.length - 5;
                }
                this.nextTitle = this.tempRequestData.data.items[this.currentJSONIndex+1].volumeInfo.title;
                this.results = this.tempRequestData.data.items.length;
                //this.pageCountCharacters = tempPages.toString().trim().length - 20;
            } catch (E) {
                //do nothing
                console.log("broken");
            }
        },

        coverImageURL: function (val) {
            //document.getElementById("bookCover").src = this.coverImageURL;
        }
    },
    template:
        `<div id="bookPane">
              <span v-if="!titleIsLocked">
                <h4>Edit your current book</h4>
                <div id="titleArea">
                    <p v-if="previousTitle != ''">{{previousTitle}}</p>
                    <input id="titleInput" class="innerInput" type="text" v-model="bookMetaData.title" :size="titleCharacters"><br />
                    <p v-if="nextTitle != ''">{{nextTitle}}</p>
                    <v-btn v-if="buttonText != 'Search'" small color="primary" v-on:click="moveUp"><i class="material-icons">arrow_upward</i></v-btn>
                    <v-btn v-if="buttonText != 'Search'" small color="primary" v-on:click="moveDown"><i class="material-icons">arrow_downward</i></v-btn>
                    <span id="results" v-if="buttonText != 'Search'">Results: {{results}}</span>
                </div>
                <input class="innerInput" type="text" v-model="bookMetaData.pageCount" :size="pageCountCharacters">
                <br />
                <v-btn color="success" v-on:click="findUserBook(bookMetaData.title)">{{buttonText}}</v-btn> 
                <v-btn color="default" v-on:click="lockTitle()">Lock-in your new book</v-btn>
                <br>
                <p class="disclaimer">* Anything with a black border can be edited manually, alternatively the title area 
                doubles as a search bar, enter "Buddy" and click search to try it out!</p>
              </span>
              <span v-if="titleIsLocked">
                <img :src="coverImage" id="bookCover">
                <br>
                <p>{{bookMetaData.title}}</p>
                <p>{{bookMetaData.pageCount}} pgs.</p>
                <v-btn color="warning" v-on:click="unLockTitle()">Change Book</v-btn>
                <p class="disclaimer">* If you click "CHANGE BOOK" you will lose ALL pages you've read in your
                current book, so strive to finish it!
                </p>
              </span>
        </div>`

});