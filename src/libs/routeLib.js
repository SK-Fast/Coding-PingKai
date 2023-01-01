import { useRoute } from 'vue-router';

export function currentPagePath() {
    return useRoute().fullPath
}