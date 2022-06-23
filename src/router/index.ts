import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/email',
    name: 'Email',
    component: () => import('../pages/Email.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue'),
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../pages/Logout.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../pages/Profile.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../pages/Settings.vue'),
  },
  {
    path: '/profiles',
    name: 'Profiles',
    component: () => import('../pages/Profiles.vue'),
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../pages/Blog.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/About.vue'),
  },
  {
    path: '/card/bookmark',
    name: 'Bookmark',
    component: () => import('../pages/card/Bookmark.vue'),
  },
  {
    path: '/branch',
    name: 'Branch',
    component: () => import('../pages/Branch.vue'),
  },
  {
    path: '/card/envelope',
    name: 'Envelope',
    component: () => import('../pages/card/Envelope.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  // console.log('\nrouter > watch > from:\n ', from)
  // console.log('\nrouter > watch > to:\n ', to)
  return true
})

export default router
