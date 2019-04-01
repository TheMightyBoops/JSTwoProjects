Vue.component('v-inventory', {
    props: {
        inventoryItems: {type: Array, required: true},
    },
    data() {
        return {
            qSlider: []
        }
    },

    template: `
        <ul> 
            <li v-for="(item, i) in inventoryItems">
                <h3>{{item.name}}</h3>
                <ul>
                    <br />
                    <li>{{item.experience}}<strong>exp.&nbsp;&nbsp;&nbsp;</strong>{{item.quantity}}<strong>qty.</strong>
                        <span v-if="qSlider[i] !== 0">
                           <v-btn color="success">Use</v-btn> 
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
                    <li>val to submit: {{qSlider[i]}}</li>
                </ul>
            </li>
            <!-- TODO if an inv item is organic give it a symbol -->
        </ul>
    `,
});

Vue.component('v-character-window', {
    props: {
        characters: {type: Array, required: true},
    },

    data() {
        return {
            currentCharacter: {type: Object},
        }
    },

    methods: {
        setCurrent: function () {

        }
    },

    watch: {
        characters() {
            this.currentCharacter = this.characters[1];
        }
    }
    ,
    template: `
    <div>
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
        -->
        
       <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>{{ currentCharacter.name }}</td>
      <td class="text-xs-left">{{ currentCharacter.basePhysical}}</td>
      <td class="text-xs-left">{{ currentCharacter.baseMagic}}</td>
      <td class="text-xs-left">{{ currentCharacter.derivedPhysical}}</td>
      <td class="text-xs-left">{{ currentCharacter.derivedMagic}}</td>
    </template>
  </v-data-table>
    </div>`
    });

Vue.component('v-weapon-window', {
    template: `<p>Test3</p>`
});