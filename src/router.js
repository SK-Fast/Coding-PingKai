import LandingPage from '@/pages/index.vue'
import World2 from '@/pages/lesson-select/world2.vue'
import World1    from '@/pages/lesson-select/world1.vue'
import HomePage from '@/pages/Landing/HomePage.vue'

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
    }
]