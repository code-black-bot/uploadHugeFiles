<template>
    <div>
        <!-- <tarBar>
               
        </tarBar> -->
        X:{{positionX}}
        Y:{{positionY}}
        <div class="box" @mousedown="drag"></div>
    </div>
</template>

<style>
  .box{
    background-color: red;
    width:200px;
    height:200px;
    position: relative;
  }
</style>

<script>
import tarBar from "./tarBar"
export default ({
    name:'thinkPad',
    components:{
        tarBar
    },
    data:function(){
        return{
           positionX:0,
           positionY:0 
        }
    },
    methods:{
        drag:function(e){
            var odiv = e.target;
            console.log(e)
            var dixX = e.clientX - odiv.offsetLeft;
            var dixY = e.clientY - odiv.offsetTop;
            document.onmousemove = (e) =>{
                let left = e.clientX - dixX;
                let top = e.clientY - dixY;
                // console.log(e)
                this.positionX = left;
                this.positionY = top;

                odiv.style.left = left + "px";
                odiv.style.top = top + "px";
            }
            document.onmouseup = function(e){
                document.onmousedown = null;
                document.onmousemove = null;
                return false
            }
        },
        
    }
})
</script>
