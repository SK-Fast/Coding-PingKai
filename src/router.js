import LandingPage from '@/pages/index.vue'
import World2 from '@/pages/lesson-select/world2.vue'
import World1    from '@/pages/lesson-select/world1.vue'
import HomePage from '@/pages/Landing/HomePage.vue'
import settings from '@/pages/settings/index.vue'
import settings_password from '@/pages/settings/password.vue'
import settings_profile from '@/pages/settings/profile.vue'

import rick_roll from '@/pages/settings/rick_roll.vue'
import exit from '@/pages/exit/exit.vue'
import profile from '@/pages/settings/profile.vue'
import exits from '@/pages/exit/exit.vue'
import IDE from '@/pages/ide/index.vue'
import dashboard from '@/pages/dashboard/index.vue'

export default [
    {
        path: '/',
        component: LandingPage
    },
    {
        path: '/World2',
        component: World2
    },
    {
        path: '/world1',
        component: World1
    },
    {
        path: '/HomePage',
        component: HomePage
    },
    {
        path: '/settings',
        component: settings,
        children: [
            {
                path: '',
              component: settings_profile,
            },
            {
                path: 'password',
              component: settings_password,
            },
          ],  
    },
    {
        path: '/rick_roll',
        component: rick_roll
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
        component: IDE
    },
    {
       path: '/dashboard',
       component: dashboard,
    },
]