import LandingPage from '@/pages/index.vue'
import LessonPage from '@/pages/lesson-select/index.vue'

export default [
    {
        path: '/',
        component: LandingPage
    },
    {
        path: '/lesson',
        component: LessonPage
    },
]