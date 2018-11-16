<template>
    <div class="app-container">
        <p class="warn-content">
            引导描述
            <a href="https://github.com/kamranahmedse/driver.js" target="_blank">
                driver.js.
            </a>
        </p>
        <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guide">打开引导</el-button>
    </div>
</template>

<script>
    //import * as Driver from 'driver.js' // import driver.js
    //import 'driver.js/dist/driver.min.css' // import driver.js css
    //import steps from './defineSteps'

    export default {
        name: 'Guide',
        data() {
            return {
                driver: null
            }
        },
        mounted() {
            //this.driver = new Driver()
        },
        methods: {
            guide() {
                alert('guid')
            }
        }
    }
</script>
