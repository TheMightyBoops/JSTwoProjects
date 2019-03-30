window.onload = function () {
    new Vue({

        el: '#app',
        data: {
            craftingMaterials: [],
            characters: [],

            firestore: {
                craftingMaterialsDB: db.collection('CraftingMaterial'),
                charactersDB: db.collection('Character')
            }
        },
        created: function () {

            //Get all data
            let bugFix = this;
            db.collection("CraftingMaterial").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    let tempdata = doc.data();
                    let tempMaterial = new CraftingMaterial(tempdata.name, tempdata.isOrganicMaterial,
                        tempdata.experience, tempdata.quantity);
                    console.log(tempMaterial);
                    bugFix.craftingMaterials.push(tempMaterial);
                });
            });


            bugFix = this;
            db.collection("Character").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    let tempdata = doc.data();
                    //TODO weapon goes here when modeled
                    let tempCharacter = new Character(tempdata.name, tempdata.basePhysical,
                        tempdata.baseMagic, new Weapon("Placeholder", 100, 100, 100));
                    console.log(tempCharacter);
                    bugFix.characters.push(tempCharacter);
                });
            });


        },
        watch: {
            craftingMaterials(){
                console.log(this.craftingMaterials)
            }
        }
    });
};