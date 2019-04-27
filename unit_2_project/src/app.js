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

            firestore: {
                craftingMaterialsDB: db.collection('CraftingMaterial'),
                charactersDB: db.collection('Character'),
                weaponsDB: db.collection('Weapon')
            }
        },
        created: function () {


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
            });

            //Declare Default Book for testing
            this.currentBook.title = "placeholder";
            this.currentBook.pageCount = 100;

        },
        methods: {
            onButtonClick() {

                this.index++;

                if(this.index >= this.characters.length) {
                    this.index = 0;
                }

                this.currentCharacter = this.characters[this.index];
                //update character
                this.currentCharacter.equippedWeapon = this.currentWeapon;

                //helper method
                function applyBorder(id) {
                    document.getElementById(id).style.border = '2px solid #f4b642';
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

                applyBorder('characterName');
                eraseBorder('weaponName')

            },

            onButtonClickWeapon() {

                this.index++;

                if(this.index >= this.weapons.length) {
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
                if(sI) {
                    this.showInventory = false;
                } else {
                    this.showInventory = true;
                }

            },

            onButtonClickName() {
                if(this.showNameField) {
                    this.showNameField = false;
                } else {
                    this.showNameField = true;
                }
            },

            onButtonClickBook() {
                if(this.settingsPaneIsOpen) {
                    this.settingsPaneIsOpen = false;
                } else {
                    this.settingsPaneIsOpen = true;
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

            }
        }
    });
};