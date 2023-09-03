<script setup>
import { data as posts } from './posts.data.js'
</script>
<style>
.post {
    margin-bottom: 4rem;
}
</style>

<div v-for="post of posts">
    <!-- render raw html -->
    <div class='post' v-html="post.html"></div>
</div>
