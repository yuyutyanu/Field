<template>
    <section>
        <div class="rooms-wrapper">
            <div class="rooms">
                <a href="/1" class="room"><p>#1</p></a>
                <a href="/2" class="room"><p>#2</p></a>
                <a href="/3" class="room"><p>#3</p></a>
                <a href="/4" class="room"><p>#4</p></a>
                <a href="/5" class="room"><p>#5</p></a>
                <a href="/6" class="room"><p>#6</p></a>
            </div>
        </div>

        <transition name="fade">
            <div v-if="show" class="create-room">
                <input type="password" placeholder="password">
                <button @click="createRoom">部屋をつくる</button>
                <button class="close" @click="show = !show">✖︎</button>
            </div>
        </transition>

        <button class="create-room-button" @click="show = !show">+</button>
    </section>
</template>
<script>
  import {send} from '../ApiService'
  export default{
    data(){
      return {
        password: '',
        show: false
      }
    },
    methods: {
      createRoom(){
        send('post', '/', {password: this.password})
      }
    }
  }
</script>