---
layout: home
title: LMQL is a programming language for LLM interaction.
outline: false
---
<script setup>
import LMHero from './LMHero.vue'
import LMFeature from './LMFeature.vue'
import { data as features } from './features/features.data.js'
import { data as examples } from './features/examples/examples.data.js'
import LMExamples from './LMExamples.vue'
</script>

<LMHero>
  <template v-slot:title>LMQL is a programming language for LLMs.</template>
  <template v-slot:subtitle>Robust and modular LLM prompting using <b>types, templates, constraints and an optimizing runtime.</b></template>
</LMHero>

<style>
.post {
    margin-bottom: 4rem;
}
</style>

<div v-for="feature in features" :key="feature.title">
  <LMFeature v-bind:template="feature.template" v-bind:new="feature.new">
    {{ feature.title }}
    <template v-slot:template>
      {{ feature.template }}
    </template>
    <template v-slot:description>
      <div v-html="feature.description"></div>
    </template>
    <template v-slot:code v-if="feature.snippet">
      <div v-html="feature.snippet"></div>
    </template>
  </LMFeature>
</div>

<LMExamples v-bind:header="true"/>