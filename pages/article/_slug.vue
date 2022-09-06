<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <ArticleMeta :article="article"></ArticleMeta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleMeta :article="article"></ArticleMeta>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <ArticleComments :article="article"></ArticleComments>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'

export default {
  name: 'ArticlePage',
  async asyncData({ store, params }) {
    let data = { article: {} }
    try {
      data = await getArticle(params.slug)
      const { article } = data
      const md = new MarkdownIt()
      article.body = md.render(article.body)
    } catch (err) {
      console.error('get article err:', err)
    } finally {
      return {
        article: data.article,
      }
    }
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description',
        },
      ],
    }
  },
}
</script>
