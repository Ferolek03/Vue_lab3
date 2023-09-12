let eventBus = new Vue();

Vue.component('container', {
    data() {
        return {
            firstCol: [],
            secondCol: [],
            thirdCol: [],
            fourthCol: [],
            isEdit: false
        }
    },
    methods: {},
    mounted() {


    },
    template: `
    <div>
        <create-form v-if="!isEdit"></create-form>
        <edit v-if="isEdit"></edit>
        <div class="container">
            <column1 v-if="!isEdit" class="column column1" :firstCol="firstCol"></column1>
            <column2 v-if="!isEdit" class="column column2" :secondCol="secondCol"></column2>
            <column3 v-if="!isEdit" class="column column3" :thirdCol="thirdCol"></column3>
            <column4 v-if="!isEdit" class="column column4" :fourthCol="fourthCol"></column4>
        </div>
    </div>
    `,
})

Vue.component('column1', {
    props: {
        firstCol: {
            type: Array,
            required: true
        },
    },
    data() {
        return {}
    },
    mounted() {
        eventBus.$on('on-submit', createNote => {
            this.firstCol.push(createNote)
        });
        eventBus.$on('delete-note', idNote => {
            this.firstCol.splice(idNote, 1)
        })
    },
    methods: {},
    template: `
     <div>
        <span class="col-title">Planned Tasks</span>
        <note v-for="(note, index) in firstCol" @save="save()" :firstCol="firstCol" :key="note.key" :idNote="index" :note="note">
            
        </note>
    </div>
    `,
})

Vue.component('column2', {
    props: {
        secondCol: {
            type: Array,
            required: true
        }
    },
    data() {
        return {}
    },
    methods: {},
    template: `
     <div>
        <span class="col-title">In Work</span>
        <note v-for="(note, index) in secondCol" @save="save()" :secondCol="secondCol" :key="note.key" :idNote="index" :note="note">
          
        </note>
    </div>
    `,
})

Vue.component('column3', {
    props: {
        thirdCol: {
            type: Array,
            required: true
        }
    },
    data() {
        return {}
    },
    methods: {},
    template: `
     <div>
        <span class="col-title">Testing</span>
        <note v-for="(note, index) in thirdCol" @save="save()" :thirdCol="thirdCol" :key="note.key" :idNote="index" :note="note">
            
        </note>
    </div>
    `,
})

Vue.component('column4', {
    props: {
        fourthCol: {
            type: Array,
            required: true
        }
    },
    data() {
        return {}
    },
    methods: {},
    template: `
     <div>
        <span class="col-title">Done Tasks</span>
        <note v-for="(note, index) in fourthCol" @save="save()" :fourthCol="fourthCol" :key="note.key" :idNote="index" :note="note">
            
        </note>
    </div>
    `,
})




Vue.component('create-form', {
    data() {
        return {
            title: null,
            description: null,
            time: null,
            date: null,
            deadlineDate: null,
            deadlineTime: null,
            isDone: null,
            reasons: [],
            isOverdue: null,
            timeCheck: null,
            reasonBuff: null
        };
    },
    methods: {
        onSubmit() {
            if (this.title && this.description) {
                let DateTime = new Date()
                let createNote = {
                    title: this.title,
                    description: this.description,
                    time: DateTime.getHours() + ':' + DateTime.getMinutes(),
                    date: DateTime.getFullYear() + '-' + DateTime.getMonth() + '-' + DateTime.getDay(),
                    deadlineTime: this.deadlineTime,
                    deadlineDate: this.deadlineDate,
                    statusCol: 1,
                    reasons: [],
                    editDate: null,
                    editTime: null,
                    isOverdue: null,
                    timeCheck: null,
                    reasonBuff: null
                }
                eventBus.$emit('on-submit', createNote);
                this.title = '';
                this.description = '';
                this.deadlineDate = null;
                this.deadlineTime = null;
            }
        },
    },
    template: `
    <form class="create-form" @submit.prevent="onSubmit">
        <label>Create Todo</label>
        <input v-model.trim="title" type="text" placeholder="title">
        <input v-model.trim="description" type="text" placeholder="description">
        <label>Deadline</label>
        <div class="date-input">
            <input type="date" v-model="deadlineDate" required>
            <input type="time" v-model="deadlineTime" required>
        </div>
        <input type="submit" value="Create">
    </form>
    `,
})


let app = new Vue({
    el: '#app',
    data: {},
})