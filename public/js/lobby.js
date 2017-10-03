const io = ws('http://localhost:3333', {})
const client = io.channel('chat').connect()


client.joinRoom('lobby', {}, function (error, joined) {
  client.emit('message', 'hello world')
  console.log('joined error : ', error, 'joined : ',joined)
  client.on('message', function (room, message) {
    console.log(room, message)
  })
})