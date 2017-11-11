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