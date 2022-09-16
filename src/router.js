import LandingPage from '@/pages/index.vue'
import LessonPage from '@/pages/lesson-select/index.vue'
import World1    from '@/pages/lesson-select/world1.vue'

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
]