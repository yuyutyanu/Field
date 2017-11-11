<template>
    <section>
        <div class="rooms-wrapper">
            <div class="rooms">
                <a v-for="room in rooms" :href="'rooms/' + room.id" class="room"><p>#{{room.id}}</p></a>
            </div>
        </div>

        <transition name="fade">
            <div v-if="show" class="create-room">
                <input type="password" placeholder="password" v-model="password">
                <button @click="createRoom">部屋をつくる</button>
                <button class="close" @click="show = !show">✖︎</button>
            </div>
        </transition>

        <button class="create-room-button" @click="show = !show">+</button>
    </section>
</template>
<script>
  import {http} from '../ApiService'
  export default{
    data(){
      return {
        password: '',
        show: false,
        rooms:[]
      }
    },
    created(){
      http.get('/rooms').then(({data}) => {
        this.rooms = data
      })
    },
    methods: {
      createRoom(){
        http.post('/room', {password: this.password}).then(({data}) => {
            location.href = `/rooms/${data.room_id}`
        })
      }
    }
  }
</script>