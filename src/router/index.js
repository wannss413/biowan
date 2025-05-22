import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SongPlaylist from '../views/SongPlaylist.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/playlist', name: 'Playlist', component: SongPlaylist }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
