// 缓存数据
export const state = {
  // 歌曲列表
  TheSongList: [],
  // 当前播放音乐
  ViewPlayback: {
    name: "",
    singer: "",
    image: require("@/assets/images/user.png"),
    isSwitchover: false,
    id: null,
  },
  // 获取更多艺人信息
   MoreArtis:{},
  //  艺人信息
   SingerInformation:{},
   // 判断是否显示小播放插件
   PlayPart:false,
  // 歌单号码
  SongListID:0,
  // 歌曲当前时间
  MusicCurrentTim:0
};
