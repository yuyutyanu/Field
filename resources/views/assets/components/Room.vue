<template>
    <div class="">
        <p class="room-number">Room: #123</p>

        <div class="md">
            <div class="before">
                <textarea name="" id="" cols="30" rows="10" v-model="before" @input="socket"></textarea>
            </div>
            <div class="after" v-html="after">
            </div>
        </div>

        <!--<div class="sidebar">-->
        <!--<div class="invite">-->
        <!--<img src="/assets/favicon.png" alt="">-->
        <!--<p>invite</p>-->
        <!--</div>-->
        <!--<div class="import">-->
        <!--<img src="/assets/favicon.png" alt="">-->
        <!--<p>import</p>-->
        <!--</div>-->
        <!--<div class="export">-->
        <!--<img src="/assets/favicon.png" alt="">-->
        <!--<p>export</p>-->
        <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
  import marked from 'marked'
  import ws from 'adonis-websocket-client'
  const io = ws('http://localhost:3333', {})
  const client = io.channel('chat').connect()
  export default {
    data () {
      return {
        before: `# Welcome to Your Vue.js App
## Welcome to Your Vue.js App

### hoge

* hogehoge
* hogehoge
* hogehoge


# React Native

## untarakantara
### untarakantara
* untara
* untara
        `
      }
    },
    computed: {
      after(){
        return marked(this.before)
      }
    },
    methods:{
      socket(){
        const _me = this
        client.joinRoom('lobby', {}, function (error, joined) {
          client.emit('message', _me.before)
          client.on('message', function (room, message) {
            _me.before = message
          })
        })
      }
    }
  }
</script>
