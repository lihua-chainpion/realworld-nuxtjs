<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'your_feed' }"
                  :to="{ name: 'index', query: { tab: 'your_feed' } }"
                  exact
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'global_feed' }"
                  :to="{ name: 'index', query: { tab: 'global_feed' } }"
                  exact
                >
                  Global Feed
                </nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'tag' }"
                  :to="{ name: 'index', query: { tab: 'tag', tag } }"
                >
                  #{{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link :to="`/profile/${article.author.username}`">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="`/profile/${article.author.username}`"
                  class="author"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{
                  article.createdAt | date('MMM DD, YYYY')
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                :disabled="article.favoriteDisabled"
                @click="onFavorite(article)"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article-slug',
                params: { slug: article.slug },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'index',
                  query: { tab: 'tag', tag, page },
                }"
                class="tag-pill tag-default"
                v-for="tag in tags"
                :key="tag"
              >
                {{ tag }}
              </nuxt-link>
            </div>
          </div>
        </div>

        <!-- 分页列表 -->
        <nav>
          <ul class="pagination">
            <li
              class="page-item"
              :class="{ active: item === page }"
              v-for="item in totalPage"
              :key="item"
            >
              <nuxt-link
                class="page-link"
                :to="{
                  name: 'index',
                  query: {
                    tab,
                    tag: $route.query.tag,
                    page: item,
                  },
                }"
                >{{ item }}</nuxt-link
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  getArticles,
  getFeedArticles,
  deleteFavorite,
  addFavorite,
} from '@/api/article'
import { getTags } from '@/api/tag'

export default {
  name: 'HomePage',
  async asyncData({ $axios, query, store }) {
    const page = parseInt(query.page || 1)
    const limit = 20
    const { tag, tab } = query
    const loadArticles =
      store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles
    let articleData = { articles: [], articlesCount: 0 }
    let tagData = { tags: [] }
    try {
      const [_articleData, _tagData] = await Promise.all([
        loadArticles($axios, {
          tag,
          limit,
          offset: (page - 1) * limit,
        }),
        getTags($axios),
      ])
      if (_articleData) {
        _articleData.articles.forEach(
          (article) => (article.favoriteDisabled = false)
        )
        articleData = _articleData
      }
      if (_tagData) {
        tagData = _tagData
      }
    } catch (err) {
      console.error('get articles err:', err)
    } finally {
      return {
        articles: articleData.articles,
        articlesCount: articleData.articlesCount + 100,
        tags: tagData.tags,
        limit,
        page,
        tag,
        tab: tab || 'global_feed',
      }
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    },
  },
  methods: {
    async onFavorite(article) {
      try {
        article.favoriteDisabled = true
        if (article.favorited) {
          // 取消点赞
          await deleteFavorite(this.$axios, article.slug)
          article.favorited = false
          article.favoritesCount--
        } else {
          // 添加点赞
          await addFavorite(this.$axios, article.slug)
          article.favorited = true
          article.favoritesCount++
        }
      } catch (err) {
        console.error('onFavorite err:', err)
      } finally {
        article.favoriteDisabled = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.home-page {
}
</style>
