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
                                    :class="{
                                        active:tab==='your_feed'
                                    }"
                                    exact
                                    :to="{
                                        name:'home',
                                        query: {
                                            tab:'your_feed'
                                        }
                                    }"
                                >Your Feed</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <!-- <a class="nav-link active" href="">Global Feed</a> -->
                                <nuxt-link 
                                    class="nav-link" 
                                    :class="{
                                        active:tab==='global_feed'
                                    }"
                                    exact
                                    :to="{
                                        name:'home',
                                        query: {
                                            tab:'global_feed'
                                        }
                                    }"
                                >Global Feed</nuxt-link>
                            </li>
                            <li v-if="tag" class="nav-item">
                                <!-- <a class="nav-link active" href="">#{{tag}}</a> -->
                                <nuxt-link 
                                    class="nav-link" 
                                    :class="{
                                        active:tab==='tag'
                                    }"
                                    :to="{
                                        name:'home',
                                        query: {
                                            tab:'tag',
                                            tag:tag
                                        }
                                    }"
                                >#{{tag}}</nuxt-link>
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
                                    <!-- 调用全局过滤器date -->
                                    <span class="date">{{article.createdAt | date('MMM DD,YYYY')}}</span>
                                </div>
                                <button 
                                class="btn btn-outline-primary btn-sm pull-xs-right"
                                :class="{
                                    active:article.favorited
                                }"
                                @click="onFavorite(article)"
                                :disabled="article.favoriteDisabled"
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

                    <!-- 分页列表 -->
                    <nav>
                        <ul class="pagination">
                        <li
                            class="page-item"
                            :class="{
                            active: item === page
                            }"
                            v-for="item in totalPage"
                            :key="item"
                        >
                            <nuxt-link
                            class="page-link"
                            exact
                            :to="{
                                name: 'home',
                                query: {
                                page: item,
                                tag: $route.query.tag,
                                tab: tab
                                }
                            }"
                            >{{ item }}</nuxt-link>
                        </li>
                        </ul>
                    </nav>
                    <!-- /分页列表 -->

                </div>

                <div class="col-md-3">
                    <div class="sidebar">
                        <p>Popular Tags</p>
                        <div class="tag-list">
                            <!-- <a href="" class="tag-pill tag-default">programming</a> -->
                            <nuxt-link 
                            :to="{
                                name:'home',
                                query: {
                                    tag:item,
                                    tab:'tag'
                                }
                            }"
                            class="tag-pill tag-default"
                            v-for="item in tags"
                            :key="item"
                            >{{item}}</nuxt-link>
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
    getYourFeedArticles,
    addFavorite,
    deleteFavorite
} from '@/api/article'
import {getTags} from '@/api/tag'
import { mapState } from 'vuex';
export default {
    name:'HomeIndex',
    async asyncData ({query,store}) {
        // console.log("store:",store)
        const page=Number.parseInt(query.page||1);
        const limit=20;
        // const {data}=await getArticles({
        //     limit,
        //     offset:(page-1)*limit,
        // })
        // const {data:tagData}=await getTags()
        // console.log('tagData:',tagData)
        // const page = Number.parseInt(query.page|| 1)
        // const limit = 20
        const tab = query.tab || 'global_feed'
        const {tag} = query
        const loadArticles=store.state.user&&tab=== 'your_feed'
        ?getYourFeedArticles
        :getArticles

        // const loadArticles = tab === 'global_feed'
        // ? getArticles
        // : getYourFeedArticles
        // 首页-优化并行异步任务
        const [ articleRes, tagRes ] = await Promise.all([
            loadArticles({
                limit,
                offset:(page-1)*limit,
                tag,
            }),
            getTags()
        ])
        // 结构后下面就不用...去拿数据
        const { articles, articlesCount } = articleRes.data
        const { tags } = tagRes.data
        //给每个 article对象添加 favoriteDisabled未禁用
        articles.forEach(article => article.favoriteDisabled = false)


        // articles.forEach(article => article.favoriteDisabled = false)

        return {
            // 放进来才能表示放进组件的data里面来，别的地方才能用
            // articles:data.articles, // 文章列表
            // articlesCount:data.articlesCount, // 文章总数
            // tags:tagData.tags, // 标签列表
            articles, // 文章列表
            articlesCount, // 文章总数
            tags, // 标签列表
            limit, // 每页大小
            page, // 页码
            tab, // 选项卡
            tag // 数据标签
        }
    },
    components: {},
    props:{},
    data(){
        return {}
    },
    // 监视路由变化
    watchQuery:['page','tag','tab'],
    computed:{
        ...mapState(['user']),
        totalPage(){
            return Math.ceil(this.articlesCount/this.limit)
        }
    },
    watch:{},
    created(){},
    mounted(){},
    methods:{
        async onFavorite(article){
            console.log('article:',article)
            // 避免连续点击当前按钮
            article.favoriteDisabled = true
            if (article.favorited) {
                // 取消点赞
                await deleteFavorite(article.slug)
                article.favorited = false
                article.favoritesCount += -1
            } else {
                // 添加点赞
                await addFavorite(article.slug)
                article.favorited = true
                article.favoritesCount += 1
            }
            article.favoriteDisabled = false
        }
    }
}
</script>

<style scoped>

</style>




