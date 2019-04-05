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
            qSlider: [],
            updatedMaterials: []
        }
    },
    methods: {
        useMaterial(materialName, quantity) {
            //console.log(materialName);
            //console.log(quantity);
            //First Quan must change
            let newQuantity = null;
            for (let i = 0; i < this.inventoryItems.length; ++i) {
                if (this.inventoryItems[i].name === materialName) {
                    newQuantity = this.inventoryItems[i].quantity - quantity;
                    this.inventoryItems[i].quantity = newQuantity;
                    //console.log(this.inventoryItems[i].quantity);

                    //this method gets the multiplyer
                    this.currentWeapon.generateMultiplier(this.inventoryItems[i].multiplier, quantity);


                    //set xp being added automatically levels up
                    this.currentWeapon.totalExperience =+ (this.currentWeapon.multiplier *
                        (quantity * this.inventoryItems[i].experience));

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
                <h3>{{item.name}}</h3>
                <ul>
                    <br />
                    <li>{{item.experience}}<strong>exp.&nbsp;&nbsp;&nbsp;</strong>{{item.quantity}}<strong>qty.</strong>
                        <span v-if="qSlider[i] !== 0">
                           <v-btn color="success" v-on:click="useMaterial(item.name, qSlider[i])">Use</v-btn> 
                        </span>
                        <span v-else-if="qSlider[i] === 0">
                            <v-btn color="error" disable>Use</v-btn>
                        </span>
                    </li>
                    <br />
                    <li>
                        <v-flex xs3>
                            <v-slider value="0" v-model='qSlider[i]' :max="item.quantity" thumb-label="always"></v-slider>
                        </v-flex>   
                    </li>
                </ul>
            </li>
            <!-- TODO if an inv item is organic give it a symbol -->
        </ul>
    `,
    watch: {
        inventoryItems() {
            //console.log(this.inventoryItems);
        }
    }
});

Vue.component('v-character-window', {
    props: {
        //characters: {type: Array, required: true},
        currentCharacter: {type: Object, required:true},
        currentWeapon: {type: Object, required:true}
    },

    data() {
        return {

        }
    },

    methods: {
        setCurrent: function () {

        }
    },

    watch: {

    }
    ,
    template: `
    <div>
        <!-- For Testing --> 
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
        
        <!--<v-data-iterator :items="">
            <v-card>
                <v-card-title><h4>{{currentCharacter.name}}</h4></v-card-title>
            </v-card>   
        </v-data-iterator> --> 
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
            //this.currentWeapon = this.weapons[0];

        }
    }
    ,
    template: `<div>
                    <h1>{{currentWeapon.name}}</h1>
                    <h4>X {{currentWeapon.multiplier}}</h4>
                    <h4>exp.{{currentWeapon.totalExperience}}</h4>
                    <h4>level:{{currentWeapon.level}}</h4>
                    <h4>phys:{{currentWeapon.weaponPhysical}}</h4>
                    <h4>mag:{{currentWeapon.weaponMagic}}</h4>   
               </div>`
});

Vue.component('v-stats-screen', {
   props: {
       currentWeapon: {type: Object},
       currentCharacter: {type: Object}
   },

    template:`<div>
            <v-character-window :current-character="currentCharacter" :current-weapon="currentWeapon"></v-character-window>
            <v-weapon-window :current-weapon="currentWeapon"></v-weapon-window>
    </div>`
});