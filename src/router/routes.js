export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    children: [
      // 登录
      {
        path: "/login",
        name: "Login",
        component: () => import("../views/register/Login.vue"),
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
        component: () => import("../views/HotSongs/Hot.vue"),
      },
      //  播放
      {
        path: "/player",
        name: "Player",
        component: () => import("../views/music/Player.vue"),
      },
      {
        path: '*',
        redirect: {
          name: 'Hot'
        }
      }
      
    ],
   
  },
  {
    path: '*',
    redirect: {
      name: 'Home'
    }
  }
];
