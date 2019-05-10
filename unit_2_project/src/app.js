window.onload = function () {
    new Vue({

        el: '#app',
        data: {
            craftingMaterials: [],
            characters: [],
            weapons: [],
            currentWeapon: {type: Object},
            currentCharacter: {type: Object},
            currentBook: new Book(),
            index: 0,
            showInventory: false,
            showNameField: false,
            settingsPaneIsOpen: false,
            showPageLog: false,
            showTutorPane: true,
            underBuddyText: "Remember your buddy's always hungry!",
            coverImageURL: "./../assets/Book-Placeholder.png",
            buddyImageRef: "./../assets/egg.png",
            pageItems: {
                totalPages: 0,
                totalPagesAllBooks: 0,
                totalPagesThisEntry: 0,
                entryLog: [],
                entryLogDates: [],
                remainingPages: 0
            },

            firestore: {
                craftingMaterialsDB: db.collection('CraftingMaterial'),
                charactersDB: db.collection('Character'),
                weaponsDB: db.collection('Weapon')
            },
            tutorText: ""
        },
        created: function () {

            /*
            //Get all data
            let bugFix = this;
            db.collection("CraftingMaterial").get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());

                    let tempdata = doc.data();
                    let tempMaterial = new CraftingMaterial(tempdata.name, tempdata.isOrganicMaterial,
                        tempdata.experience, tempdata.quantity);
                    //console.log(tempMaterial);
                    bugFix.craftingMaterials.push(tempMaterial);

                });
            });

            bugFix = this;

            db.collection("Weapon").get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let tempdata = doc.data();
                    let tempWeapon = new Weapon(tempdata.name, tempdata.physical,
                        tempdata.magic, tempdata.experienceToLevelUp,
                        tempdata.addedPhysicalOnLevel, tempdata.addedMagicOnLevel);
                    //console.log(tempWeapon);
                    bugFix.weapons.push(tempWeapon);
                });
            });

            bugFix = this;
            db.collection("Character").get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let tempdata = doc.data();

                    let tempCharacter = new Character(tempdata.name, tempdata.basePhysical,
                        tempdata.baseMagic, bugFix.weapons[0]);
                    //console.log(tempCharacter);.
                    bugFix.characters.push(tempCharacter);
                });
            });*/

            if (localStorage.getItem("title") != null) {
                //local storage exists
                this.currentBook.title = localStorage.getItem("title");
                this.currentBook.pageCount = localStorage.getItem("pageCount");
                this.coverImageURL = localStorage.getItem("coverImageURL");
                this.craftingMaterials = localStorage.getItem("craftingMaterials");
                this.pageItems = localStorage.getItem("pageItems");
                this.buddyImageRef = localStorage.getItem("buddyImageRef");
            } else {
                //console.log("happened");
                //Declare Default Book for testing
                this.currentBook.title = "Buddy";
                this.currentBook.pageCount = 100;
                this.currentWeapon = new Weapon("Egg", 0, 0, 1000, 0, 0);
                this.craftingMaterials = [new CraftingMaterial("Hatch Light", false, 1000, 1, "./../assets/icons/light.png")];
            }

        },
        methods: {
            onButtonClick() {

                this.index++;

                if (this.index >= this.characters.length) {
                    this.index = 0;
                }

                this.currentCharacter = this.characters[this.index];
                //update character
                this.currentCharacter.equippedWeapon = this.currentWeapon;

                //helper method
                function applyBorder(id) {
                    //document.getElementById(id).style.border = '2px solid #f4b642';
                    //document.getElementById(id).style.borderRadius = '2px / 2px';
                    //document.getElementById(id).style.border
                }

                function eraseBorder(id) {
                    //document.getElementById(id).style.border = 'none';
                }

                eraseBorder('charStrength');
                eraseBorder('charMagic');
                eraseBorder('weaponXp');
                eraseBorder('weaponLevel');
                eraseBorder('weaponStrength');
                eraseBorder('weaponMagic');

                applyBorder('characterName');
                eraseBorder('weaponName')

            },

            onButtonClickWeapon() {

                this.index++;

                if (this.index >= this.weapons.length) {
                    this.index = 0;
                }

                this.currentWeapon = this.weapons[this.index];
                //update character
                this.currentCharacter.equippedWeapon = this.currentWeapon;

                //helper method
                function applyBorder(id, color) {
                    document.getElementById(id).style.border = '2px solid ' + color;
                    document.getElementById(id).style.borderRadius = '2px / 2px';
                    document.getElementById(id).style.border
                }

                function eraseBorder(id) {
                    document.getElementById(id).style.border = 'none';
                }

                eraseBorder('charStrength');
                eraseBorder('charMagic');
                eraseBorder('weaponXp');
                eraseBorder('weaponLevel');
                eraseBorder('weaponStrength');
                eraseBorder('weaponMagic');
                applyBorder('weaponName', '#f4b642');
                eraseBorder('characterName');

            },

            onButtonClickFeed() {
                let sI = this.showInventory;
                if (sI) {
                    this.showInventory = false;
                } else {
                    this.showInventory = true;
                }

            },

            onButtonClickName() {
                if (this.showNameField) {
                    this.showNameField = false;
                } else {
                    this.showNameField = true;
                }
            },

            onButtonClickBook() {
                if (this.settingsPaneIsOpen) {
                    this.settingsPaneIsOpen = false;
                } else {
                    this.settingsPaneIsOpen = true;
                }
            },

            onButtonClickLogPages() {
                if (this.showPageLog) {
                    this.showPageLog = false;
                } else {
                    this.showPageLog = true;
                }
            },

            onButtonClickTutor() {
              if (this.showTutorPane) {
                  this.showTutorPane = false;
              } else {
                  this.showTutorPane = true;
              }
            }
        },
        watch: {
            craftingMaterials() {

            },

            weapons() {
                //console.log(this.weapons);
                this.currentWeapon = this.weapons[0];
            },

            characters() {
                //console.log(this.characters);
                this.currentCharacter = this.characters[0];
            },

            currentCharacter: function () {

            },

            'currentWeapon.level': function () {
                console.log("ran");
                if(this.currentWeapon.level !== 1) {
                    switch (this.currentWeapon.level) {
                        case 2:
                            this.buddyImageRef = "./../assets/buddy1.png";
                            this.tutorText = "You've hatched a buddy! read and " +
                                "input more pages to get more food to feed your buddy. Also, click " +
                                "'Rename Your Buddy' to give him a name that's not egg.";
                            break;

                        case 3:
                            this.buddyImageRef = "./../assets/buddy2.png";
                            this.tutorText = "He's really growing! Here's a little secret " +
                                "between buddies, if you finish a whole book you will get something " +
                                "your buddy will love.";
                            break;

                        case 4:
                            this.buddyImageRef = "./../assets/buddy3.png";
                            this.tutorText = "What a buddy! You're good at this! Keep Reading!"
                    }
                }
            }
        }
    });
};