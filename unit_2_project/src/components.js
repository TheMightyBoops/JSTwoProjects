Vue.component('v-inventory',{
    props:{
        inventoryItems: {type:Array, required:true},
    },

    template: `
        <ul> 
            <li v-for="(item, i) in inventoryItems">{{item.name}}</li>
        </ul>
    `,
});

Vue.component('v-character-window', {
    template:'<p>Test2</p>'
});

Vue.component('v-weapon-window', {
    template: '<p>Test3</p>'
});