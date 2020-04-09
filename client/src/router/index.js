import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Register from '@/components/Register'
import Login from '@/components/Login'
import UserMain from '@/components/UserMain'
import ExamTable from '@/components/ExamTable'
import Hospitales from '@/components/Hospitales'
import DoctorsTable from '@/components/DoctorsTable'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/usermain',
      name: 'User Main',
      component: UserMain,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: 'examenes',
          component: ExamTable
        },
        {
          path: 'hospitales',
          component: Hospitales
        }
        { path: 'doctores', component: DoctorsTable }
        
        // ...other sub routes
      ]
    }
  ]
})
