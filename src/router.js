import HomePage from '@/pages/Landing/HomePage.vue'
import settings from '@/pages/settings/index.vue'
import settings_password from '@/pages/settings/password.vue'
import settings_profile from '@/pages/settings/profile.vue'
import settings_dev from '@/pages/settings/dev.vue'
import settings_preferences from '@/pages/settings/preferences.vue'

import exit from '@/pages/exit/exit.vue'
import IDE from '@/pages/ide/index.vue'
import dashboard from '@/pages/dashboard/index.vue'
import Lookprofile from '@/pages/settings/Lookprofile.vue'
import congrat from '@/pages/congrat/congrat.vue'
import LearnPage from '@/pages/learn/index.vue'
import CreditsPage from '@/pages/credits/index.vue'
import Term_LegalPage from '@/pages/legal/term.vue'

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
        meta: {
            needAuth: true
        },
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
                path: 'pref',
                component: settings_preferences
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
        path: '/workspace/:id',
        meta: {
            navbarStyle: "hide",
            noScroll: true
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
        path: '/Lookprofile',
        component: Lookprofile,
    },
    {
        path: '/congrat',
        component: congrat,
     },
     {
        path: '/credits',
        component: CreditsPage,
        meta: {
            navbarStyle: "landing"
        },
     },
     {
        path: '/legal/term',
        component: Term_LegalPage
     }
]