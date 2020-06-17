<template>
  <div class="flex flex-center">
    <carousel-3d
      width="1000"
      height="1000"
      startIndex="0"
      perspective="20"
      controlsWidth="100"
      controlsHeight="100"
      :clickable="true"
      :controlsVisible="true"
      @after-slide-change="onAfterSlideChange"
    >
      <slide
        :index="0"
        style="background-color:rgba(0,0,0,0); border-style:none"
      >
        <template v-if="thisIndex == 0">
          <div class="content-container">
            <img
              class="img"
              src="https://cdn.flashtalking.com/xre/421/4214758/2776222/image/2776222.gif?434467347"
            />

            <div class="text-wrapper">
              <h3 class="subtitle subtitle-top">THE ARAD</h3>
              <h1 class="title text-weight-bolder">몰라</h1>
              <h3 class="subtitle subtitle-bottom">WINTER UPDATE</h3>
            </div>

            <div class="outline-wrapper">
              <div class="outline outline-x outline-top"></div>
              <div class="outline outline-x outline-bottom"></div>
              <div class="outline outline-y outline-left"></div>
              <div class="outline outline-y outline-right"></div>
            </div>
          </div>
        </template>
        <div v-else>
          <div class="content-container">
            <img
              class="img"
              src="https://cdn.flashtalking.com/xre/421/4214758/2776222/image/2776222.gif?434467347"
            />

            <div class="text-wrapper">
              <h3 class="subtitle subtitle-top">THE ARAD</h3>
              <h1 class="title text-weight-bolder">몰라</h1>
              <h3 class="subtitle subtitle-bottom">WINTER UPDATE</h3>
            </div>

            <div class="outline-wrapper">
              <div class="outline outline-x outline-top"></div>
              <div class="outline outline-x outline-bottom"></div>
              <div class="outline outline-y outline-left"></div>
              <div class="outline outline-y outline-right"></div>
            </div>
          </div>
        </div>
      </slide>
      <slide
        :index="1"
        style="background-color:rgba(0,0,0,0); border-style:none"
      >
        <template v-if="thisIndex == 1">
          <div class="content-container">
            <img class="img" src="../assets/mafia.png" />

            <div class="text-wrapper">
              <h3 class="subtitle subtitle-top">THE ARAD</h3>
              <h1 class="title text-weight-bolder">마피아</h1>
              <h3 class="subtitle subtitle-bottom">WINTER UPDATE</h3>
            </div>

            <div class="outline-wrapper">
              <div class="outline outline-x outline-top"></div>
              <div class="outline outline-x outline-bottom"></div>
              <div class="outline outline-y outline-left"></div>
              <div class="outline outline-y outline-right"></div>
            </div>
          </div>
        </template>
        <div v-else>
          <div class="content-container">
            <img class="img" src="../assets/mafia.png" />

            <div class="text-wrapper">
              <h3 class="subtitle subtitle-top">THE ARAD</h3>
              <h1 class="title text-weight-bolder">마피아</h1>
              <h3 class="subtitle subtitle-bottom">WINTER UPDATE</h3>
            </div>

            <div class="outline-wrapper">
              <div class="outline outline-x outline-top"></div>
              <div class="outline outline-x outline-bottom"></div>
              <div class="outline outline-y outline-left"></div>
              <div class="outline outline-y outline-right"></div>
            </div>
          </div>
        </div>
      </slide>
      <slide
        :index="2"
        style="background-color:rgba(0,0,0,0); border-style:none"
      >
        <template v-if="thisIndex == 2">
          <div class="content-container">
            <img class="img" src="../assets/ring.png" />

            <div class="text-wrapper">
              <h3 class="subtitle subtitle-top">THE ARAD</h3>
              <h1 class="title text-weight-bolder">피트런</h1>
              <h3 class="subtitle subtitle-bottom">WINTER UPDATE</h3>
            </div>

            <div class="outline-wrapper">
              <div class="outline outline-x outline-top"></div>
              <div class="outline outline-x outline-bottom"></div>
              <div class="outline outline-y outline-left"></div>
              <div class="outline outline-y outline-right"></div>
            </div>
          </div>
        </template>
        <div v-else>
          <div class="content-container">
            <img class="img" src="../assets/ring.png" />

            <div class="text-wrapper">
              <h3 class="subtitle subtitle-top">THE ARAD</h3>
              <h1 class="title text-weight-bolder">피트런</h1>
              <h3 class="subtitle subtitle-bottom">WINTER UPDATE</h3>
            </div>

            <div class="outline-wrapper">
              <div class="outline outline-x outline-top"></div>
              <div class="outline outline-x outline-bottom"></div>
              <div class="outline outline-y outline-left"></div>
              <div class="outline outline-y outline-right"></div>
            </div>
          </div>
        </div>
      </slide>
      <slide
        :index="3"
        style="background-color:rgba(0,0,0,0); border-style:none"
      >
        <template v-if="thisIndex == 3">
          <div class="content-container">
            <img class="img" src="../assets/room.png" />

            <div class="text-wrapper">
              <h3 class="subtitle subtitle-top">THE ARAD</h3>
              <h1 class="title text-weight-bolder">방탈출</h1>
              <h3 class="subtitle subtitle-bottom">WINTER UPDATE</h3>
            </div>

            <div class="outline-wrapper">
              <div class="outline outline-x outline-top"></div>
              <div class="outline outline-x outline-bottom"></div>
              <div class="outline outline-y outline-left"></div>
              <div class="outline outline-y outline-right"></div>
            </div>
          </div>
        </template>
        <div v-else>
          <div class="content-container">
          <img class="img" src="../assets/room.png" />

          <div class="text-wrapper">
            <h3 class="subtitle subtitle-top">THE ARAD</h3>
            <h1 class="title text-weight-bolder">방탈출</h1>
            <h3 class="subtitle subtitle-bottom">WINTER UPDATE</h3>
          </div>

          <div class="outline-wrapper">
            <div class="outline outline-x outline-top"></div>
            <div class="outline outline-x outline-bottom"></div>
            <div class="outline outline-y outline-left"></div>
            <div class="outline outline-y outline-right"></div>
          </div>
        </div>
        </div>
      </slide>
      <slide
        :index="4"
        style="background-color:rgba(0,0,0,0); border-style:none"
        ><template v-if="thisIndex == 4">
          <div class="content-container">
            <img class="img" src="../assets/tabsonic.png"  />

            <div class="text-wrapper">
              <h3 class="subtitle subtitle-top">THE ARAD</h3>
              <h1 class="title text-weight-bolder">
                비트<br />
                세이버
              </h1>
              <h3 class="subtitle subtitle-bottom">WINTER UPDATE</h3>
            </div>

            <div class="outline-wrapper">
              <div class="outline outline-x outline-top"></div>
              <div class="outline outline-x outline-bottom"></div>
              <div class="outline outline-y outline-left"></div>
              <div class="outline outline-y outline-right"></div>
            </div>
          </div>
        </template>
        <div v-else>
          <div class="content-container">
          <img class="img" src="../assets/tabsonic.png" />

          <div class="text-wrapper">
            <h3 class="subtitle subtitle-top">THE ARAD</h3>
            <h1 class="title text-weight-bolder">
              비트<br />
              세이버
            </h1>
            <h3 class="subtitle subtitle-bottom">WINTER UPDATE</h3>
          </div>

          <div class="outline-wrapper">
            <div class="outline outline-x outline-top"></div>
            <div class="outline outline-x outline-bottom"></div>
            <div class="outline outline-y outline-left"></div>
            <div class="outline outline-y outline-right"></div>
          </div>
          
        </div>
        </div>
      </slide>
    </carousel-3d>
  </div>
</template>

<style>
body {
  background-color: #221b1b;
}

.content-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 700px;
}

.img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: 120%;
  animation-name: img-mask;
  animation-delay: 0.3s;
  animation-duration: 0.8s;
  animation-fill-mode: both;
  /* -webkit-clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); */
  z-index: 1;
}

.text-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  animation-name: text-wrapper;
  animation-duration: 1.5s;
  animation-timing-function: cubic-bezier(0.5, 0, 0.3, 0.9);
  animation-fill-mode: forwards;
  z-index: 2;
}
.text-wrapper .title {
  position: absolute;
  top: 48.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "baskerville";
  font-size: 110px;
  letter-spacing: 0.04em;
}
.text-wrapper .subtitle {
  width: 80%;
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-family: "futura";
  font-size: 27px;
  font-weight: bold;
  letter-spacing: 0.02em;
  color: #e0dddf;
}
.text-wrapper .subtitle-top {
  top: 7.5%;
}
.text-wrapper .subtitle-bottom {
  bottom: 7.5%;
}

.outline {
  position: absolute;
  background-color: #d9b38e;
  animation-duration: 1s;
  box-shadow: 0px 0px 1px 0px #d9b38e;
}
.outline:after {
  position: absolute;
  content: "";
  display: block;
  background-color: white;
  box-shadow: 0px 0px 1px 0px white;
  animation-duration: 1s;
  animation-delay: 0.9s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
}
.outline-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  animation-name: outline-wrapper;
  animation-duration: 1.5s;
  animation-timing-function: cubic-bezier(0.5, 0, 0.3, 1);
  animation-fill-mode: forwards;
}
.outline-x {
  width: 88%;
  height: 3px;
  animation-name: outline-x;
  animation-timing-function: cubic-bezier(0.5, 0, 0.6, 0.6);
}
.outline-x:after {
  width: 100%;
  height: 1px;
}
.outline-y {
  width: 3px;
  height: 88%;
  animation-name: outline-y;
  animation-timing-function: cubic-bezier(0.5, 0, 0.6, 0.6);
}
.outline-y:after {
  width: 1px;
  height: 100%;
}
.outline-top {
  top: 0%;
  left: calc((100% - 88%) / 2);
  transform-origin: right center;
}
.outline-top:after {
  top: 7px;
  animation-name: inline-top;
  transform-origin: left center;
}
.outline-bottom {
  top: calc(100% - 3px);
  left: calc((100% - 88%) / 2);
  transform-origin: left center;
}
.outline-bottom:after {
  bottom: 7px;
  animation-name: inline-bottom;
  transform-origin: right center;
}
.outline-left {
  top: calc((100% - 88%) / 2);
  left: 0%;
  transform-origin: bottom center;
}
.outline-left:after {
  left: 7px;
  animation-name: inline-left;
  transform-origin: top center;
}
.outline-right {
  top: calc((100% - 88%) / 2);
  left: calc(100% - 3px);
  transform-origin: top center;
}
.outline-right:after {
  right: 7px;
  animation-name: inline-right;
  transform-origin: bottom center;
}

@keyframes img-mask {
  from {
    transform: translate(-50%, -62%);
    -webkit-clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%);
    clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%);
  }
  to {
    transform: translate(-50%, -50%);
    -webkit-clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }
}
@keyframes text-wrapper {
  from {
    transform: scale(0) rotate(135deg);
  }
  64% {
    transform: scale(1.01) rotate(0);
  }
  73% {
    transform: scale(1.01);
    animation-timing-function: cubic-bezier(0, 0.3, 0.4, 0.7);
  }
  to {
    transform: scale(0.92);
  }
}
@keyframes outline-wrapper {
  from {
    transform: scale(0.1) rotate(135deg);
  }
  66% {
    transform: scale(1) rotate(0);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  to {
    transform: scale(0.91);
  }
}
@keyframes inline-top {
  from {
    transform: translateX(-3.5%) scaleX(0);
  }
  to {
    transform: translateX(0%) scaleX(1);
  }
}
@keyframes inline-bottom {
  from {
    transform: translateX(3.5%) scaleX(0);
  }
  to {
    transform: translateX(0%) scaleX(1);
  }
}
@keyframes inline-left {
  from {
    transform: translateY(-3.5%) scaleY(0);
  }
  to {
    transform: translateY(0%) scaleY(1);
  }
}
@keyframes inline-right {
  from {
    transform: translateY(3.5%) scaleY(0);
  }
  to {
    transform: translateY(0%) scaleY(1);
  }
}
@keyframes outline-x {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
@keyframes outline-y {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}
</style>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
export default {
  name: "HelloWorld",
  components: {
    Carousel3d,
    Slide
  },
  data() {
    return {
      thisIndex: -1
    };
  },
  methods: {
    onAfterSlideChange(index) {
      this.thisIndex = index;
    }
  }
};
</script>
