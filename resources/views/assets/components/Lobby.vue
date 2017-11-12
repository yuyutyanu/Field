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

<style scoped>
    .rooms-wrapper{
        width:350px;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
    }
    .rooms{
        height:350px;
        background: #DE4830;
        text-align: center;
        padding:20px;
        box-sizing: border-box;
        border-radius: 10px;
        overflow-y:hidden;
    }
    .rooms .room{
        display: block;
        text-decoration: none;
        color:#fff;
        border-right:solid 2px #27313D;
        border-left:solid 2px #27313D;
        margin-bottom:20px;
    }
    .rooms .room:hover{
        background:rgba(255,255,255,0.1)
    }
    .rooms .room:last-child{
        margin:0;
    }
    .rooms .room p{
        font-size:20px;
        padding-top: 21.25px;
        padding-bottom: 21.25px;
        font-weight: 600;
        letter-spacing: 4px;
        color:#F7F7F7;
    }

    .create-room-button{
        position: absolute;
        bottom:15%;
        left:50%;
        transform: translate(-50%, 0);
        padding:20px;
        background:#ECB935;
        font-size:12px;
        color:#fff;
        border:solid 0px #fff;
        border-radius:3px;
        cursor: pointer;
        outline: none;
    }
    .create-room{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        background:#27313D;
        border-radius:10px;
        text-align: center;
        padding:20px;
        box-sizing: border-box;
    }
    .create-room input{
        background:#fff;
        border:solid 0px;
        letter-spacing: 2px;
        width:70%;
        height:30px;
        color:#27313D;
        margin-bottom:30px;
        border-radius:3px;
        text-align: center;
        font-weight: 400;
        outline: none;
    }
    .create-room button{
        height:30px;
        background:#fff;
        color:#27313D;
        border:solid 0px;
        border-radius:3px;
        letter-spacing: 2px;
        cursor: pointer;
        outline: none;
    }
    .create-room .close{
        color:#fff;
        background:#26313D;
        border:solid 3px #fff;
        text-align: center;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0
    }

    @media screen and (max-width:480px) {
        .rooms-wrapper{
            width:100%;
            position:static;
            transform:translate(0,0);
            -webkit-border-radius: 0px;
            -moz-border-radius: 0px;
        }
        .rooms{
            height:90vh;
            border-radius: 0px;
            overflow-y: auto;
        }
        .create-room-button{
            height:10vh;
            width:100%;
            -webkit-border-radius: 0px;
            -moz-border-radius: 0px;
            border-radius: 0px;
            position: static;
            transform:translate(0,0);
        }
    }
</style>