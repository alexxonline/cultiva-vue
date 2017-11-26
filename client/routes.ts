import Dashboard from './Dashboard.vue';
import OrchardEdit from './assistant/components/OrchardEdit.vue';
import Anonymous from './Anonymous.vue';

const routes = [
    {path: '/', component: Dashboard},
    {path: "/add", component: OrchardEdit},
    {path: '/edit/:id', component: OrchardEdit},
    {path: '/anonymous', component: Anonymous}
]

export default routes;