<script setup>
defineProps(['template', 'new'])
</script>

<template>
<!-- set additional class based on 'template' attribute -->
<div class="feature" :class="template">
    <div>
    <h1>
        <slot></slot>
        <span v-if="new" class="badge">NEW</span>
    </h1>
    <p>
        <slot name="description"></slot>
    </p>
    </div>
    <code class="reveal"><slot name="code"></slot></code>
</div>
</template>

<style scoped>
.feature {
  margin: auto;
  display: flex;
  flex-direction: row;
  margin-top: 120pt;
  width: 100%;
  max-width: 750pt;
  text-align: left;
  align-items: center;
  padding: 20pt;
}

h1 {
    font-size: 1.4em;
    font-weight: bold;
    margin-bottom: 10pt;
}

.feature>div:first-child {
    margin-right: 20pt;
    flex: 2;
}

.feature code {
    font-size: 1.0em;
    padding: 10pt;
    border-radius: 8px;
    padding-top: -10pt;
    background-color: #F6F6F7;
}

html.dark .feature code {
    background-color: #161618;
}

.feature code {
    max-width: 60%;
    font-size: 0.8em;
}

.feature code pre {
    margin: 0;
}

.feature code {
    transform: translateX(0);
    animation: slidefade 0.5s;
    animation-fill-mode: forwards;
}

</style>
<style>
.feature code span.lang {
    display: none !important;
}
.feature code pre {
    margin-top: -15pt !important;
    line-break: anywhere;
    overflow-x: auto;
}
@keyframes slidefade {
    from { opacity: 0; transform: translateX(20pt); }
    to   { opacity: 1; transform: translateX(0); }
}

@keyframes slidefadeleft {
    from { opacity: 0; transform: translateX(-20pt); }
    to   { opacity: 1; transform: translateX(0); }
}

/* every other feature is reversed */
div:nth-child(even)>.feature {
    flex-direction: row-reverse;
}

div:nth-child(even)>.feature>code {
    margin-right: 30pt;
    animation: slidefadeleft 0.2s;
    animation-fill-mode: forwards;
}

.feature.middle {
    position: relative;
    width: 520pt;
    max-width: 100vw;
}

.feature.middle>code {
    display: none;
}

.feature.middle {
    text-align: center;
}

span.badge {
    background-color: rgb(117, 117, 255);
    border-radius: 2pt;
    font-size: 0.5em;
    line-height: 1.2em;
    padding: 2pt 4pt;
    position: relative;
    top: -3pt;
    margin-left: 5pt;
    color: white;
}

.cards {
    display: flex;
    flex-direction: row;
    /* break rows */
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 40pt;
    margin-bottom: 40pt;
}

.cards>div {
    border-radius: 5pt;
    border: 1pt solid rgb(192, 190, 190);
    margin: 0pt 2.5pt;
    padding: 10pt;
    padding-top: 30pt;
    font-weight: bold;
    width: 100pt;
    height: 100pt;
    margin-top: 5pt;
}

.cards>div img {
    width: 50pt;
    height: 60pt;
    margin: auto;
    display: block;
    margin-top: -20pt;
    padding-bottom: 10pt;
}

.cards>div h1 {
    font-weight: bold !important;
    font-size: 10pt;
}

@media (max-width: 600px) {
    .feature {
        flex-direction: column !important;
        margin-top: 10pt !important;
    }

    .feature>div:first-child {
        margin-right: 0;
    }

    .feature>code {
        margin-right: 0;
        margin-top: 20pt;
        width: 100vw !important;
        max-width: 100vw !important;
        margin-left: 0pt;
        border-radius: 0;
        box-shadow: none !important;
        border: none !important;
        padding-left: 20pt !important;
        margin-right: 0 !important;
    }

    .feature.middle {
        width: calc(100vw - 10pt);
        padding: 0pt 10pt !important;
        margin: 0pt;
    }

    .feature.middle>div {
        max-width: 100%;
        margin-left: 20pt;
    }
}
</style>