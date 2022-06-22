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
                          <li class="nav-item">
                              <a class="nav-link disabled" href="">Your Feed</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link active" href="">Global Feed</a>
                          </li>
                      </ul>
                  </div>

                  <div class="article-preview"
                  v-for="article in articles"
                  :key="article.slug">
                        <div class="article-meta">
                            <!-- <a href="profile.html">
                                <img src="http://i.imgur.com/N4VcUeJ.jpg"/>
                            </a> -->
                            <nuxt-link :to="{
                                name:'profile',
                                params:{
                                    username:article.author.username
                                }
                            }">
                                <img src="http://i.imgur.com/Qr71crq.jpg"/>
                            </nuxt-link>
                            <div class="info">
                                <!-- <a href="" class="author">Eric Simons</a> -->
                                <nuxt-link  class="author" :to="{
                                    name:'profile',
                                    params:{
                                        username:article.author.username
                                    }
                                }">
                                    {{article.author.username}}
                                </nuxt-link>
                                <!-- <span class="date">January 20th</span> -->
                                <span class="date">{{article.createdAt}}</span>
                            </div>
                            <button 
                            class="btn btn-outline-primary btn-sm pull-xs-right"
                            :class="{
                                active:article.favorited
                            }"
                            >
                                <i class="ion-heart"></i> 
                                <!-- 29 -->
                                {{article.favoritesCount}}
                            </button>
                        </div>
                        <nuxt-link 
                            :to="{
                                name:'article',
                                params:{
                                    slug:article.slug
                                }
                            }" 
                            class="preview-link"
                        >
                            <!-- <h1>How to build webapps that scale</h1> -->
                            <h1>{{article.title}}</h1>
                            <!-- <p>This is the description for the post.</p> -->
                            <p>{{article.description}}</p>
                            <span>Read more...</span>
                        </nuxt-link >
                  </div>

                  <div class="article-preview">
                      <div class="article-meta">
                          <a href="profile.html"><img src="http://i.imgur.com/N4VcUeJ.jpg"/></a>
                          <div class="info">
                              <a href="" class="author">Albert Pai</a>
                              <span class="date">January 20th</span>
                          </div>
                          <button class="btn btn-outline-primary btn-sm pull-xs-right">
                              <i class="ion-heart"></i> 32
                          </button>
                      </div>
                      <a href="" class="preview-link">
                          <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
                          <p>This is the description for the post.</p>
                          <span>Read more...</span>
                      </a>
                  </div>

              </div>

              <div class="col-md-3">
                  <div class="sidebar">
                      <p>Popular Tags</p>

                      <div class="tag-list">
                          <a href="" class="tag-pill tag-default">programming</a>
                          <a href="" class="tag-pill tag-default">javascript</a>
                          <a href="" class="tag-pill tag-default">emberjs</a>
                          <a href="" class="tag-pill tag-default">angularjs</a>
                          <a href="" class="tag-pill tag-default">react</a>
                          <a href="" class="tag-pill tag-default">mean</a>
                          <a href="" class="tag-pill tag-default">node</a>
                          <a href="" class="tag-pill tag-default">rails</a>
                      </div>
                  </div>
              </div>

          </div>
      </div>

  </div>
</template>

<script>
import {
  getArticles,
} from '@/api/article'
export default {
    name:'HomeIndex',
    async asyncData () {
        const {data}=await getArticles()
        console.log('datadd:',data)
        // const page = Number.parseInt(query.page|| 1)
        // const limit = 20
        // const tab = query.tab || 'global_feed'
        // const tag = query.tag

        // const loadArticles = tab === 'global_feed'
        // ? getArticles
        // : getYourFeedArticles

        // const [ articleRes, tagRes ] = await Promise.all([
        //     loadArticles({
        //         limit,
        //         offset: (page - 1) * limit,
        //         tag
        //     }),
        //     getTags()
        // ])

        // const { articles, articlesCount } = articleRes.data
        // const { tags } = tagRes.data

        // articles.forEach(article => article.favoriteDisabled = false)

        return {
            articles:data.articles, // 文章列表
            articlesCount:data.articlesCount, // 文章总数
            // tags, // 标签列表
            // limit, // 每页大小
            // page, // 页码
            // tab, // 选项卡
            // tag // 数据标签
        }
    },
    components: {},
    props:{},
    data(){
        return {}
    },
    computed:{},
    watch:{},
    created(){},
    mounted(){},
    methods:{}
}
</script>

<style scoped>

</style>




