import Home from '../views/Home';
import Name from '../views/Name';
import Version from '../views/Version';
import NotFound from '../views/NotFound';

export default [
  {
    path: '/',
    redirect: {
      name: 'home'
    }
  },
  {
    path: '/home',
    name: 'home',
    components: {
      default: Home,
      name: Name,
      version: Version
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/User'),
    children: [
      {
        path: '',
        name: '',
        component: () => import('../views/UserDetail')
      },
      {
        path: 'user-detail',
        name: 'user-detail',
        component: () => import('../views/UserDetail')
      },
      {
        path: 'user-list',
        name: 'user-list',
        component: () => import('../views/UserList')
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
]
