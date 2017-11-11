<template>
    <section>
        <div class="login">
            <p>Room: #{{id}}</p>
            <input type="password" placeholder="password" v-model="password">
            <button @click="inRoom">部屋に入る</button>
        </div>
        <p class="failed" v-if="failed">パスワードが違います</p>
    </section>
</template>

<script>
  import {http} from '../ApiService'
  export default{
    props: ["id"],
    data(){
      return {
        password: "",
        failed:false
      }
    },
    methods: {
      inRoom(){
        http.post('login', {id: this.id, password: this.password}).then(({data}) => {
          if(!data.success) throw new Error()
          location.href = `/rooms/${this.id}`
        }).catch((e)=>{
          this.failed = true
        })
      }
    }
  }
</script>
<style scoped>
    .login{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        background:#27313D;
        border-radius:10px;
        text-align: center;
        padding:40px;
        border:solid 1px #fff;
        box-sizing: border-box;
    }
    .login p{
        color:#fff;
        padding-bottom:20px;
        font-size:20px;
        letter-spacing: 2px;
    }
    .login input{
        background:#fff;
        border:solid 0px;
        letter-spacing: 2px;
        width:100%;
        height:30px;
        color:#27313D;
        margin-bottom:30px;
        border-radius:3px;
        text-align: center;
        font-weight: 400;
        outline: none;
    }
    .login button{
        height:30px;
        background:#fff;
        color:#27313D;
        border:solid 0px;
        border-radius:3px;
        letter-spacing: 2px;
        cursor: pointer;
        outline: none;
    }

    .failed{
        position: absolute;
        top:75%;
        left:50%;
        transform: translate(-50%, -50%);
        letter-spacing: 2px;
        font-size:14px;
        color:#DE4830;
    }
</style>