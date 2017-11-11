<template>
    <div class="">
        <p class="room-number">Room: #{{id}}</p>

        <div class="md">
            <div class="before">
                <textarea name="" id="" cols="30" rows="10" v-model="before" @input="socket"></textarea>
            </div>
            <div class="after" v-html="after">
            </div>
        </div>
    </div>
</template>

<script>
  import marked from 'marked'
  import ws from 'adonis-websocket-client'
  const client = ws('http://localhost:3333', {}).channel('md').connect()

  export default {
    props:['id'],
    created(){
      let _me = this
      client.joinRoom(this.id, {}, function (error, joined) {
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

<style scoped>
    .room-number {
        position: absolute;
        color: #fff;
        font-weight: 600;
        left: 20px;
        top: 15px;
        font-size: 16px;
    }

    .md {
        width: 80%;
        height: 80vh;
        background: #fff;
        margin: 0 auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        letter-spacing: -.4em;
        border: solid 10px #DE4830;
        box-sizing: border-box;
        border-radius:3px;
    }

    .md .before {
        width: 50%;
        height: 100%;
        display: inline-block;
        letter-spacing: normal;
    }

    .md .before textarea {
        width: 100%;
        height: 100%;
        resize: none;
        font-size: 15px;
        letter-spacing: 2px;
        padding: 20px;
        box-sizing: border-box;
        background:#F7F7F7;
        outline: none;
        overflow-y: auto;
        border:solid 0px;
        border-right:solid 1px #27313D;
    }

    .md .after {
        display: inline-block;
        width: 50%;
        height: 100%;
        overflow-y: auto;
        background:#F7F7F7;
        padding: 20px;
        box-sizing: border-box;
        letter-spacing: 2px;
    }
</style>