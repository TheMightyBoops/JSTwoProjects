window.onload = function () {
    new Vue({

        el: '#app',
        data: {
            craftingMaterials: [],

            firestore: {
                craftingMaterialsDB: db.collection('CraftingMaterial')
            }
        },
        created: function () {

            let bugFix = this;
            db.collection("CraftingMaterial").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    let tempdata = doc.data();
                    let tempMaterial = new CraftingMaterial(tempdata.name, tempdata.isOrganicMaterial,
                        tempdata.experience);
                    //console.log(tempMaterial);
                    bugFix.craftingMaterials.push(tempMaterial);
                });
            });

            console.log(this.craftingMaterials);
            console.log(tempArray)
        },
        watch: {
            craftingMaterials(){
                console.log(this.craftingMaterials)
            }
        }
    });
};