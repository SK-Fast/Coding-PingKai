import LandingPage from '@/pages/index.vue'
import LessonPage from '@/pages/lesson-select/index.vue'
import World1    from '@/pages/lesson-select/world1.vue'
import settings from '@/pages/settings/index.vue'
import rick_roll from '@/pages/settings/rick_roll.vue'
import exit from '@/pages/exit/exit.vue'

export default [
    {
        path: '/',
        component: LandingPage
    },
    {
        path: '/lesson',
        component: LessonPage
    },
    {
        path: '/world1',
        component: World1
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
    

]