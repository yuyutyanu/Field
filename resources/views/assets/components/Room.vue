<template>
    <div class="">
        <p class="room-number">Room: #123</p>
        <div class="container">
            <div class="md">
                <div class="before">
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="after">

                </div>
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
  export default {
    created(){
      console.log(marked('# Marked in browser\n\nRendered by **marked**.'))
    }
  }
</script>
