---
title: Blog
layout: doc
aside: false
outline: false
---

<script setup>
import { data as posts } from './posts.data.js'

function getTitleVersion(title) {
    const version = title.match(/v\d+\.\d+(\.\d+)?/)
    if (version) {
        return version[0]
    }
}

function getTitleText(title) {
    // strip version from title
    console.log(title)
    return title.replace(/v\d+\.\d+(\.\d+)?/, '').trim()
} 

</script>

<div class="posts" v-for="post of posts">
    <div class="post">
        <a :href="post.url">
        <h1>
            {{ getTitleText(post.frontmatter.title) }} 
            <Badge type="tip" v-if="getTitleVersion(post.frontmatter.title)" :text="getTitleVersion(post.frontmatter.title)" />
        </h1>
        </a>
        <div class="body" v-html="post.html"></div>
    </div>
</div>

<style scoped>
.post>a {
    text-decoration: none;
    color: var(--color-text);
}

h2, h3, h4 {
    color: var(--color-text);
}

h1 {
    font-size: 2.5em !important;
    line-height: 1.2em;
    font-weight: 700;
}

.post {
    margin-top: 10pt;
    margin-bottom: 4rem;
}

.post h1 .VPBadge {
    transform: scale(1.2);
    margin-left: 10pt;
    position: relative;
    top: 7pt;
}
</style>
<style>
.post .body h1:first-child {
    display: none;
}
</style>