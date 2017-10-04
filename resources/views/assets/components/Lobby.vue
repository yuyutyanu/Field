<template>
    <section>
    <div class="rooms-wrapper">
        <div class="rooms">
            <a href="room" class="room"><p>#1</p></a>
            <a href="room" class="room"><p>#2</p></a>
            <a href="room" class="room"><p>#3</p></a>
            <a href="room" class="room"><p>#4</p></a>
            <a href="room" class="room"><p>#4</p></a>
            <a href="room" class="room"><p>#4</p></a>
        </div>
    </div>

    <button class="create-room">+</button>
    </section>
</template>
<script>
  import ws from 'adonis-websocket-client'
  const io = ws('http://localhost:3333', {})
  const client = io.channel('chat').connect()
    export default{

      created(){
        client.joinRoom('lobby', {}, function (error, joined) {
          client.emit('message', 'hello world')
          console.log('joined error : ', error, 'joined : ', joined)
          client.on('message', function (room, message) {
            console.log(room, message)
          })
        })
      }
    }
</script>