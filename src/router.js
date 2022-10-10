import LandingPage from '@/pages/index.vue'
import World2 from '@/pages/lesson-select/world2.vue'
import World1    from '@/pages/lesson-select/world1.vue'
import HomePage from '@/pages/Landing/HomePage.vue'
import settings from '@/pages/settings/index.vue'
import rick_roll from '@/pages/settings/rick_roll.vue'
import exit from '@/pages/exit/exit.vue'
import profile from '@/pages/settings/profile.vue'
import password from '@/pages/settings/password.vue'

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
        component: settings
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
        path: '/password',
        component: password
    },

]