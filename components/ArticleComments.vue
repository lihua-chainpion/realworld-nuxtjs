<template>
  <div>
    <form v-if="$store.state.user" class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="$store.state.user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile-username',
            params: { username: comment.author.username },
          }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile-username',
            params: { username: comment.author.username },
          }"
          class="comment-author"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">
          {{ comment.createdAt | date('MMM DD, YYYY') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments } from '@/api/article'

export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
    }
  },
  mounted() {
    this.getComments()
  },
  methods: {
    getComments() {
      getComments(this.$axios, this.article.slug)
        .then((res) => {
          this.comments = res.comments || []
        })
        .catch((err) => console.error('get comments err:', err))
    },
  },
}
</script>
