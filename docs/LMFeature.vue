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
  margin-top: 100pt;
  width: 100%;
  max-width: 750pt;
  text-align: left;
  align-items: center;
  padding: 20pt;
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
}

.feature code {
    max-width: 60%;
    font-size: 0.8em;
}

.feature code pre {
    margin: 0;
    padding: 10pt;
}

.feature code {
    transform: translateX(0);
    animation: slidefade 0.5s;
    animation-fill-mode: forwards;
}

</style>
<style>
.feature .btn {
    margin-top: 20pt;
}

.feature code span.lang {
    display: none !important;
}
.feature code pre {
    margin-top: -15pt !important;
    line-break: anywhere;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    padding: 15pt;
}

/* hide scroll bars */
.feature code pre::-webkit-scrollbar {
    display: none;
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

.feature pre.promptdown {
    min-width: 390pt;
    width: 390pt;
    min-height: 180pt;
    position: relative;
    top: 20pt;
    white-space: pre-wrap;
    line-break: anywhere;

    /* first line indent */
    text-indent: 10pt !important;
    line-height: 1.5em !important;
}

.feature.left>code {
    display: none;
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


.feature.middle pre {
    text-align: left;
    padding: 10pt;
}

@media (max-width: 600px) {
    .feature {
        flex-direction: column !important;
        margin-top: 20pt !important;
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
        text-align: left;
    }
}
</style>