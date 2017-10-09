<template>
    <div class="">
        <p class="room-number">Room: #{{id}}</p>

        <div class="md">
            <div class="before">
                <textarea name="" id="" cols="30" rows="10" v-model="before" @input="socket" @change="store"></textarea>
            </div>
            <div class="after" v-html="after">
            </div>
        </div>
    </div>
</template>

<script>
  import marked from 'marked'
  import ws from 'adonis-websocket-client'
  const io = ws('http://localhost:3333', {})
  const client = io.channel('chat').connect()
  export default {
    props:['id'],
    created(){
      const _me = this
      client.joinRoom(`room${this.id}`, {}, function (error, joined) {
        client.on('message', function (room, message) {
          _me.before = message
        })
      })
    },
    data () {
      return {
        before:''
      }
    },
    computed: {
      after(){
        return marked(this.before)
      }
    },
    methods:{
      socket(){
        client.emit('message', this.before)
      }
    }
  }
</script>
