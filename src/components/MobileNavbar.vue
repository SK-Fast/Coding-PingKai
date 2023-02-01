<template>
    <div class="bg-light-300 border-light-700 border-top mobile-nav">
        <router-link to="/"><vue-feather class="m-nav-icon" type="home" stroke="#606060" size="30"></vue-feather></router-link>
        <!--<vue-feather class="m-nav-icon" type="award" stroke="#606060" size="30"></vue-feather>-->        
        <router-link to="/learn"><vue-feather class="m-nav-icon" type="code" stroke="#606060" size="30"></vue-feather></router-link>
        <!--<vue-feather class="m-nav-icon" type="user" stroke="#606060" size="30"></vue-feather>-->
        <!--<vue-feather class="m-nav-icon" type="more-horizontal" stroke="#606060" size="30"></vue-feather>-->
        <router-link to="/settings/general"><vue-feather class="m-nav-icon" type="settings" stroke="#606060" size="30"></vue-feather></router-link>
    </div>
</template>

<style>
.mobile-nav {
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 0;
    
    display: flex;
    justify-content: space-around;
    align-items: center;

    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    transform: translateY(100%);
}

.mobile-nav .m-nav-icon {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform: translateY(120%);
}

@media only screen and (max-width: 600px) {
    html, body {
        overflow: scroll;
    }

    .main-pageview {
        margin-bottom: 60px;
    }

    .mobile-nav {
        transform: translateY(0%);
    }

    .mobile-nav .m-nav-icon:nth-child(3) {
        transform: translateY(0%);
        transition-delay: 0.05s;
    }

    .mobile-nav .m-nav-icon:nth-child(2), .mobile-nav .m-nav-icon:nth-child(4) {
        transform: translateY(0%);
        transition-delay: 0.1s;
    }

    .mobile-nav .m-nav-icon:nth-child(1), .mobile-nav .m-nav-icon:nth-child(5) {
        transform: translateY(0%);
        transition-delay: 0.15s;
    }

    .footer {
        display: none;
    }
}
</style>