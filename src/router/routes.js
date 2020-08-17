export const routes = [
  {
    path: "/Home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
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
        children: [
          // 歌手
          {
            path: "/discover/singer",
            name: "Singer",
            component: () => import("../views/discover/Singer.vue"),
          },
          //  专辑
          {
            path: "/discover/album",
            name: "Album",
            component: () => import("../views/discover/Album.vue"),
          },
          //  mv
          {
            path: "/discover/song",
            name: "Song",
            component: () => import("../views/discover/Song.vue"),
          },
          // 排行榜
          {
            path: "/discover/ranking",
            name: "Ranking",
            component: () => import("../views/discover/Ranking.vue"),
          },
          // 排行榜详细
          {
            path: "/discover/leaderboards",
            name: "Leaderboards",
            component: () =>
              import("../views/discover/particulars/Leaderboards.vue"),
          },
          // 更多
          {
            path: "/discover/moreartist",
            name: "MoreArtist",
            component: () =>
              import("@/views/discover/particulars/MoreArtist.vue"),
          },
          {
            path: "*",
            redirect: {
              name: "Singer",
            },
          },
        ],
      },
      // 热门
      {
        path: "/hot",
        name: "Hot",
        component: () => import("@/views/HotSongs/Hot.vue"),
      },
      // 音乐播放页面
      {
        path: "/playlist/player",
        name: "Player",
        component: () => import('../views/music/Player.vue'),
      },
      {
        path: "/artist",
        name: "Artist",
        component: () => import("@/views/discover/particulars/Artist.vue"),
      },
      //  歌单
      {
        path: "/playlist",
        name: "Playlist",
        component: () => import("@/views/music/Playlist.vue"),
        children: [
          {
            path: "/playlist/easyman",
            name: "Easyman",
            component: () => import("@/views/music/Easyman.vue"),
          },
          {
            path:'/playlist/category',
            name:"Category",
            component:()=>import('../views/music/SongSheet/Category.vue')
          },
         
         
        ],
      },
       // 歌单详情页
       {
        path:'/playlist/songdetails',
        name:"SongDetails",
        component:()=>import('../views/music/SongSheet/SongDetails.vue')
      }
    ],
  },

  {
    // 搜索页面
    path: "/search",
    name: "Search",
    component: () => import("@/views/search/Search.vue"),
  },
  // 歌手信息

  {
    path: "*",
    redirect: {
      name: "Home",
    },
  },
];
