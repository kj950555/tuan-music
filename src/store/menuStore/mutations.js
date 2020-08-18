// 上传数据到state文件缓存
export const mutations = {
  getTheSongList(state, data) {
    // console.log("歌曲数据==》",data);
    // 歌曲列表
    state.TheSongList.unshift(data.valu);
    console.log("歌曲列表==》", state.TheSongList);
  },
  //  播放歌曲
  changeCurrentList(state, data) {
    state.ViewPlayback = {
      name: data.valu.name,
      singer: data.valu.singer,
      image: data.valu.image,
      isSwitchover: true,
      id: data.valu.id,
    };
    console.log("当前播放歌曲 ==> ", state.ViewPlayback);
  },
  // 大播放插件当前播放歌曲
  playTheSong(state, data) {
    state.PlayTime = {
      name: data.valu.name,
      singer: data.valu.singer,
      image: data.valu.image,
      isSwitchover: true,
      id: data.valu.id,
    };
    console.log("大播放组件接收 ==> ", state.PlayTime);
  },

  // 更多信息
  getMoreArtist(state, data) {
    state.MoreArtis = data.valu;
    console.log(state.MoreArtis);
  },
  // 歌手信息
  getSingerInformation(state, data) {
    state.SingerInformation = data.valu;
    console.log(state.SingerInformation);
  },

  // 是否显示播放插件
  Displayplayer(state, data) {
    console.log("关闭====》", data);
    state.PlayPart = data.valu;
  },
  getSongListID(state, data) {
    console.log("接受id", data);
    state.SongListID = data.valu;
    console.log("id", state.SongListID);
  },

  // 传入播放全部歌曲列表
  getPlayAll(state, data) {
    console.log("歌曲列表接受", data.valu);
    (state.TheSongList = data.valu),
      (state.ViewPlayback = {
        name: data.valu[0].name,
        singer: data.valu[0].singer,
        image: data.valu[0].image,
        isSwitchover: true,
        id: data.valu[0].id,
      });
    state.TheSongList = data.valu;
    console.log("当前播放歌曲 ==> ", state.ViewPlayback);
  },
  // 接收当前时间
  getMusicCurrentTime(state, data) {
    state.MusicCurrentTim = {
      currentTime: data.valu.Time,
      url: data.valu.url,
      index: data.valu.index,
    };
    console.log("接收到==>", state.MusicCurrentTim);
  },
};
