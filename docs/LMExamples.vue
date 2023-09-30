<script setup>
import { data as examples } from './features/examples/examples.data.js'
import LMSideBySide from './LMSideBySide.vue'
import { ref } from 'vue'

const selectedExample = ref(examples[0].id)

defineProps(['header'])

</script>

<template>
<div class="examples">
    <!-- only if header is true -->
    <div style="margin-top: 60pt"/>
    <h1 v-if="header">Explore LMQL</h1>
    <span v-if="header">LMQL is a versatile language and simplifies many common LLM tasks.</span>
    
    <div class="btn-group" role="group" aria-label="Basic example">
        <button v-for="example in examples" :key="example.title" class="btn btn-primary" @click="selectedExample = example.id" :class="{ active: selectedExample === example.id }">
            {{ example.title }}
        </button>
    </div>


    <LMSideBySide>
        <template v-slot:code>
        <h2>LMQL</h2>
        <div v-html="examples.find(e => e.id === selectedExample).code"></div>
        </template>
        <template v-slot:output>
        <h2>Model Output</h2>
        <div v-html="examples.find(e => e.id === selectedExample).output"></div>
        </template>
    </LMSideBySide>
</div>
</template>

<style scoped>
.examples {
    margin: auto;
    max-width: 730pt;
    margin: auto;
    padding: 0pt 8pt;
}

.btn-group {
    margin-bottom: 1rem;
    font-size: 10pt;
    margin-top: 1em;
}

.btn {
    padding: 4pt;
    margin: 0;
    margin-right: 4pt;
}

.btn-group .btn.active {
    background-color: #007bff;
    color: white;
    border: 2pt solid #007bff;
}
</style>