<script setup>
defineProps(['template'])
</script>

<template>
<!-- set additional class based on 'template' attribute -->
<div class="feature" :class="template">
    <div>
    <h1>
        <slot></slot>
    </h1>
    <p>
        <slot name="description"></slot>
    </p>
    </div>
    <code><slot name="code"></slot></code>
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
    border: 1pt solid rgb(230, 227, 227);
    box-shadow: 0pt 0pt 10pt rgba(192, 190, 190, 0.639);
    padding-top: -10pt;
    background-color: #F6F6F7;
}

html.dark .feature code {
    border: 1pt solid rgb(30, 30, 30);
    box-shadow: 0pt 0pt 10pt rgba(51, 50, 50, 0.639);

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
    animation: slidefade 1s;
    transform: translateX(0);
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
    animation: slidefadeleft 1s;
}

.feature.middle {
    position: relative;
    width: 520pt;
}

.feature.middle>code {
    display: none;
}

.feature.middle {
    text-align: center;
}

.cards {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 40pt;
    margin-bottom: 40pt;
}

.cards>div {
    border-radius: 5pt;
    border: 1pt solid rgb(192, 190, 190);
    margin: 0pt 5pt;
    padding: 10pt;
    padding-top: 30pt;
    font-weight: bold;
    box-shadow: 0pt 0pt 20pt rgba(192, 190, 190, 0.639);
    width: 100pt;
    height: 100pt;
}

html.dark .cards>div {
    box-shadow: 0pt 0pt 20pt rgba(51, 50, 50, 0.639);
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
</style>