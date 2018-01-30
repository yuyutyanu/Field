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
        <div id="before">
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

  export default {
    props: ['id'],
    mounted(){
      this.initFirePad()
    },
    data () {
      return {
        editor: '',
        isCopy: false,
        isVisible: false,
        after: null
      }
    },
    computed: {
      url(){
        return location.href
      }
    },
    methods: {
      initFirePad(){
        const config = {
          apiKey: "AIzaSyBaH8CYz9zVNtKegHt2viukYGAabHCKAlA",
          authDomain: "field-65e8b.firebaseapp.com",
          databaseURL: "https://field-65e8b.firebaseio.com"
        }
        firebase.initializeApp(config)
        const firepadRef = firebase.database().ref().child(this.id)
        const codeMirror = CodeMirror(document.getElementById('before'), { lineWrapping: true });

        const firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {})

        firepad.on('ready', () => {
          if (firepad.isHistoryEmpty()) {
            firepad.setText('# hello');
          }else{
            this.after = marked(firepad.getText())
          }
        })

        firepad.on('synced', (isSynced) => {
          if(isSynced) {
            this.after = marked(firepad.getText())
          }
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
  }

  .message span {
    font-size: 14px;
    color: #fff;
  }

  .copy {
    display: inline-block;
    margin-top: 25px;
    margin-right: 25px;
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
    display: flex
  }

  .md #before {
    width: 50%;
    height: 100%;
    display: inline-block;
    letter-spacing: normal;
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

  @media screen and (max-width: 480px) {
    .invite {
      text-align: right;
    }

    .container {
      width: 100%;
      position: static;
      transform: translate(0, 0);
    }

    .container .md {
      height: 90vh;
      border: solid 10px #DE4830;
      box-sizing: border-box;
      border-radius: 0px;
    }

    .md #before {
      display: block;
      width: 100%;
      height: calc(45vh - 10px);
    }

    .md .after {
      display: block;
      width: 100%;
      height: calc(45vh - 10px);
    }

    .message span {
      color: #fff;
      font-size: 10px;
    }

    .copy {
      margin: 0;
      width: 25%;
    }

    .copy button {
      height: 10vh;
      margin: 0;
    }
  }
</style>

<style>
  .firepad{
    height:100%;
  }
  .CodeMirror{
    height:100%;
    padding:20px;
  }
</style>