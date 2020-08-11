// 上传数据到state文件缓存
export const mutations = {

  getTheSongList(state, data) {
    // 歌曲列表
    state.TheSongList.unshift(data.valu);
    console.log("歌曲列表==》",  state.TheSongList);
  },
  //  播放歌曲
  changeCurrentList(state, data) {
    state.ViewPlayback = {
      name: data.valu.album.name,
      singer: data.valu.artists[0].name,
      image: data.valu.album.picUrl + "?param=70y70",
      isSwitchover: true,
      id: data.valu.id,
    };
    console.log("播放歌曲 ==> ", state.ViewPlayback);
  },
};
