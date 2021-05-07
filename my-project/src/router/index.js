import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/admin/index'
import list from '@/components/admin/list'
import login from '@/components/Login'
import user from '../store/modules/user'
import thinkPad from '@/components/thinkpad/index';

Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {path:'/',redirect:'/admin/'},
    {
      path:'/admin/',
      name:'index',
      component:index,
      children:[
        {
          path:'/admin/list',
          name:'list',
          component:list
        },
      ]
    },
    {
      path:'/thinkPad',
      name:'thinkPad',
      component:thinkPad
    },
    {
      path:'/login',
      name:'login',
      component:login
    }
  ]
})

router.beforeEach((to,from,next)=>{
  const token = user.state.token;
  if(!token && to.fullPath !== "/login"){
    next({ path: '/login' })
  }else{
    next()
  }

})

export default router;
