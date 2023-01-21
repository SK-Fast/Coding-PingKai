import HomePage from '@/pages/Landing/HomePage.vue'
import settings from '@/pages/settings/index.vue'
import settings_password from '@/pages/settings/password.vue'
import settings_profile from '@/pages/settings/profile.vue'
import settings_dev from '@/pages/settings/dev.vue'

import exit from '@/pages/exit/exit.vue'
import profile from '@/pages/settings/profile.vue'
import IDE from '@/pages/ide/index.vue'
import dashboard from '@/pages/dashboard/index.vue'
import Moreinfo1 from '@/pages/dashboard/Moreinfo1.vue'
import Moreinfo2 from '@/pages/dashboard/Moreinfo2.vue'
import Lookprofile from '@/pages/settings/Lookprofile.vue'

import LearnPage from '@/pages/learn/index.vue'

export default [
    {
        path: '/',
        meta: {
            navbarStyle: "landing"
        },
        component: HomePage
    },
    {
        path: '/learn',
        component: LearnPage
    },
    {
        path: '/settings',
        component: settings,
        meta: {
            needAuth: true
        },
        children: [
            {
                path: 'general',
              component: settings_profile,
            },
            {
                path: 'password',
              component: settings_password,
            },
            {
                path: 'dev',
              component: settings_dev,
            },
          ],  
    },
    {

        path: '/exit',
        component: exit
    },
    {
        path: '/profile',
        component: profile
    },
    {
        path: '/exit',
        component: exit
    },
    {
        path: '/workspace',
        meta: {
            hideNavbar: true
        },
        component: IDE
    },
    {
        path: '/dashboard',
        meta: {
            needAuth: true
        },
       component: dashboard,
    },
    { 
        path: '/Moreinfo1',
        component: Moreinfo1,
    },
    { 
        path: '/Moreinfo2',
        component: Moreinfo2,
    },
    {
        path: '/Lookprofile',
        component: Lookprofile,
    },
]