export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    beforeEnter: (to, from, next) => {
      console.log('路由守卫to==>',to);
      console.log('路由守卫to==>',from);
      next()
    },
    children: [
      // 登录
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/register/Login.vue"),
      },
      // 发现
      {
        path: "/discover",
        name: "Discover",
        component: () => import("../views/discover/Discover.vue"),
        children:[
          {
          path:'/singer',
          name:"Singer",
          component:()=>import('../views/discover/Singer.vue')
        },
         
          {
          path:'/album',
          name:"Album",
          component:()=>import('../views/discover/Album.vue')
        },
         
          {
          path:'/song',
          name:"Song",
          component:()=>import('../views/discover/Song.vue')
        },
        {
          path:'/ranking',
          name:'Ranking',
          component:()=>import('../views/discover/Ranking.vue')
        },
        {
          path: '*',
          redirect: {
            name: 'Singer'
          }
        }
        ]
      },
      // 热门
      {
        path: "/hot",
        name: "Hot",
        component: () => import("@/views/HotSongs/Hot.vue"),
      },
      //  歌单
      {
        path: "/playlist",
        name: "Playlist",
        component: () => import("@/views/music/Playlist.vue"),
        children:[
          {
            path:'/easyman',
            name:'Easyman',
            component:()=> import('@/views/music/Easyman.vue')
          }
        ]
      },
     
    ],
   
  },
  {
    // 搜索页面
    path:'/search',
    name:'Search',
    component:()=> import('@/views/search/Search.vue')
  
    },
  {
    path: '*',
    redirect: {
      name: 'Home'
    }
  }
];
