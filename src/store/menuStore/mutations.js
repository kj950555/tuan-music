

// 上传数据到state文件缓存
export const mutations = {
  getTheSongList(state, data) {
    console.log("歌曲数据==》",data);
    // 歌曲列表
    state.TheSongList.unshift(data.valu);
    console.log("歌曲列表==》",  state.TheSongList);
  },
  //  播放歌曲
  changeCurrentList(state, data) {
    state.ViewPlayback = {
      name: data.valu.name,
      singer: data.valu.singer,
      image: data.valu.image,
      isSwitchover: true,
      id: data.valu.id,
    }
    state.PlayPart = true;
    console.log("播放歌曲 ==> ", state.ViewPlayback);
  },
  // 更多信息
  getMoreArtist(state,data){
   state.MoreArtis=data.valu
   console.log(  state.MoreArtis );
  },
  // 歌手信息
  getSingerInformation(state,data){
    state.SingerInformation = data.valu
    console.log(state.SingerInformation);
  },
  
  // 是否显示播放插件
  Displayplayer(state,data){
  console.log('关闭====》',data);
    state.PlayPart=data.valu  
  }


};
