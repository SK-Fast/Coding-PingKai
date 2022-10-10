export function lazyLoadPage(path) {
    return () => import(`../${path}.vue`);
}  