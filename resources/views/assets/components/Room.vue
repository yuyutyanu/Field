<template>
  <div>
    <div class="invite">
      <span id="url">{{url}}</span>
      <transition name="fade">
        <div class="message" v-if="isVisible">
          <span v-if="isCopy">Copied!: {{url}} </span>
          <span v-else>Copy to clipboard</span>
        </div>
      </transition>

      <div class="copy">
        <button @mouseover='isVisible = !isVisible' @click="urlCopy" @mouseout="reset">Invite url︎</button>
      </div>
    </div>

    <div class="container">
      <div class="md markdown-body">
        <div class="before">
          <textarea name="" id="" v-model="before" @keyup.enter="socket"></textarea>
        </div>
        <div class="after" v-html="after">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { http } from '../ApiService'
  import marked from 'marked'
  import ws from 'adonis-websocket-client'
  const client = ws('https://field-md.herokuapp.com', {}).channel('md').connect()
  //  const client = ws('http://localhost:3333', {}).channel('md').connect()

  export default {
    props: ['id'],
    created(){
      let _me = this
      _me.fetchText()

      client.joinRoom(this.id, {}, function (error, joined) {
        client.on('message', function (room, message) {
          _me.before = message
        })
      })
    },
    data () {
      return {
        before: '',
        isCopy: false,
        isVisible: false
      }
    },
    computed: {
      after(){
        return this.before ? marked(this.before) : marked("## Press enter to share")
      },
      url(){
        return location.href
      }
    },
    methods: {
      socket(){
        client.emit('message', this.before)
        this.storeText()
      },
      storeText(){
        http.put(`/room/${this.id}/text`, {md: this.before})
      },
      fetchText(){
        let _me = this
        http.get(`/room/${this.id}/text`).then(function ({data}) {
          _me.before = data.md
        })
      },
      reset(){
        this.isCopy = false
        this.isVisible = false
      },
      urlCopy(){
        const target = document.getElementById('url')
        const range = document.createRange()
        range.selectNode(target)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
        document.execCommand('copy')
        this.isCopy = true
      }
    }
  }
</script>

<style scoped>
  #url {
    font-size: 0px;
  }

  .invite {
    width: auto;
    text-align: right;
  }

  .message {
    display: inline-block;
    margin-right: 10px;
  }

  .message span {
    font-size: 14px;
    color: #fff;
  }

  .copy {
    display: inline-block;
    padding: 25px;
    right: 20px;
  }

  .copy button {
    background: rgba(255, 255, 255, 0.1);
    transition: ease .2s;
    border: solid 0px;
    padding: 10px 20px;
    margin-left: 10px;
    color: #fff;
    outline: none;
    font-size: 14px;
  }

  .copy button:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .container {
    position: absolute;
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .md {
    width: 100%;
    height: 80vh;
    background: #fff;
    margin: 0 auto;
    letter-spacing: -.4em;
    border: solid 10px #DE4830;
    box-sizing: border-box;
    border-radius: 3px;
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
    background: #F7F7F7;
    outline: none;
    overflow-y: auto;
    border: solid 0px;
    border-right: solid 1px #27313D;
  }

  .md .after {
    display: inline-block;
    vertical-align: top;
    width: 50%;
    height: 100%;
    overflow-y: auto;
    background: #F7F7F7;
    padding: 20px;
    box-sizing: border-box;
    letter-spacing: 2px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0
  }
</style>