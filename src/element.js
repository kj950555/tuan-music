import Vue from "vue";


import {
  NavBar,
  Icon,
  Swipe,
  SwipeItem,
  Notify,
  Tag,
  Button,
  Image as VanImage,
  Tabbar,
  TabbarItem,
  Tab, Tabs ,
  NoticeBar ,
  List,
  Lazyload ,
  DropdownMenu, 
  DropdownItem,
  Cell,
  Popup ,
  Field,
  Toast ,
  Pagination 
} from "vant";

Vue.use(NavBar)
  .use(Icon)
  .use(Swipe)
  .use(SwipeItem)
  .use(Notify)
  .use(Tag)
  .use(Button)
  .use(VanImage)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Tab)
  .use(Tabs)
  .use(NoticeBar)
  .use(List)
  .use(Lazyload ,{lazyComponent: true})
  .use(DropdownMenu )
  .use(DropdownItem )
  .use(Cell)
  .use(Popup)
  .use(Field)
  .use(Toast )
  .use(Pagination  )
 
