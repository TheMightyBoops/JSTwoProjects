window.onload = function () {
    new Vue({

        el: '#app',
        data: {
            craftingMaterials: [],
            characters: [],
            weapons: [],
            currentWeapon: {type: Object},
            currentCharacter: {type: Object},
            index: 0,

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
            },

            onButtonClickWeapon() {

                this.index++;

                if(this.index >= this.weapons.length) {
                    this.index = 0;
                }

                this.currentWeapon = this.weapons[this.index];
                //update character
                this.currentCharacter.equippedWeapon = this.currentWeapon;
            }
        },
        watch: {
            craftingMaterials() {
                //console.log(this.craftingMaterials);
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