# Fitness Model 정리

1. Walking

   1. class1(오른쪽) 
   2. class2(stop) 
   3. class3(왼)

   

   walk-jump

   0. stop

   1. right

   2. left

   3. jump

      빠르게 뛰면 right-left 바로바로 반응 안하는 단점이 있음

   walk

   0. stop
   1. right
   2. left

   walking-jumping

   0. stop
   1. walk
   2. jump

   

2. Squat

   

3. Side_Crunch

   Class

   1. stand
   
    	2. right90
    	3. right_exact
    	4. left90
    	5. left_exact
   
 	6. stop



4. Shoulder Press

   Class

   1. down
   2. down_mid
   3. middle
   4. up_mid
   5. up

   

5. Side_Lunge

   무릎이 발끝보다 앞으로 나오지 않도록 엉덩이를 뒤로 뺀다.

   

   side_lunge_3

   Class

   1. middle
   
2. right_mid
   
   3. right
   
4. left_mid
   5. left 

   (화면상에 바닥 부분이 넓게 보일 수록 인식이 잘 됨)

   

6. Jumping Jacks ( PT 체조 )

   Class

   0: down

   1: down45
   
   2: middle
   
   3: up45
   
   4: up
   
9. ![`](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20200604151846603.png)

 





1. 주요기술스택

   spring, vue.js, mysql, tensorflow.js , teachablemachine,  firebase, docker, janus 등등

2. 프로젝트 특장점

   - "별도의 설치 필요 없어 부담없이 즐길 수 있는 웹기반 게임"
   - 모션인식 기술을 활용
   - 언택트 문화 및 사회적 분위기 흐름 반영
     (사회적 거리는 멀리하지만, 심리적 거리는 좁히고 물리적 활동 증진)
   - 다양한 게임 컨텐츠로의 성장 가능성
   - 코로나 사태 이후 글로벌 게임 시장 성장, 국내 게임 산업 및 스타트업 지원 확대

3. 우리팀만의 차별점/독창점

   - 값비싼 장비가 필요 없는 모션 게임
   - 게임의 순기능인 "스트레스 해소", "체력 증진" 등에 초점을 둔 긍정적 가치 제공



모션 인식을 통한 포즈 모델 활용

다양한 즐거움 선사

게임을 통하여 사람들과 심리적 거리는 좁히고, 체력을 증진하는 1석 2조 효과





```javascript
test() {
      if (this.getIdx === 0) {
        // new_squat
        if (this.predictions[0].probability > 0.9) {
          /// stop
          return "stnad";
        } else if (
          this.predictions[1].probability > 0.95 ||
          this.predictions[2].probability > 0.95
        ) {
          // right, left
          return "walk";
        } else if (this.predictions[3].probability > 0.95) {
          // up
          return "jump";
        }
        return "stand";
      } else if (this.getIdx === 1) {
        // shoulder_press
        console.log("$$$$$$$$$$$$$$$$$$$", this.predictions)
        if (this.predictions[0].probability.toFixed(2) == 1.0) {
          // down
          if (this.status == "up") {
            this.count++;
            console.log(this.count);
          } else if (this.status == "middle") {
            console.log("더 위로 올려");
          }
          this.status = "down";
          return this.count;
        } else if (this.predictions[1].probability.toFixed(2) == 1.0) {
          // middle
          if (this.status == "down") {
            this.status = "middle";
          }
        } else if (this.predictions[2].probability.toFixed(2) == 1.0) {
          // up
          this.status = "up";
        }
        return this.count;
      } else if (this.getIdx === 2) {
        // side_lunge
        if (this.predictions[0].probability.toFixed(2) == 1.0) {
          // middle
          if (this.status == "right" || this.status == "left") {
            this.count++;
            console.log(this.count);
          }
          this.status = "stand";
          return this.count;
        } else if (this.predictions[2].probability.toFixed(2) > 0.99) {
          // right
          if (this.status == "stand") {
            this.status = "right";
          }
        } else if (this.predictions[4].probability.toFixed(2) > 0.99) {
          // left
          if (this.status == "stand") {
            this.status = "left";
          }
        }
        return this.count;
      } else if (this.getIdx == 3) {
        // new_squat
        if (
          this.predictions[0].probability.toFixed(2) > 0.97 ||
          this.predictions[1].probability.toFixed(2) > 0.97
        ) {
          // stand , step2
          if (this.status == "squat") {
            this.count++;
            console.log(this.count);
          }
          this.status = "stand";
          return this.count;
        } else if (this.predictions[3].probability.toFixed(2) > 0.97) {
          if (this.status == "stand") {
            this.status = "squat";
          }
        }
        return this.count;
      } else if (this.getIdx == 4) {
        // side_crunch
        if(this.predictions[0].probability.toFixed(2) == 1.00) { // stand
            if(this.status == "right" || this.status == "left") {
                this.count++;
                console.log(this.count);
            }
            this.status = "stand";
            return this.count;
        } else if (this.predictions[2].probability.toFixed(2) > 0.99){ // right_exact
            if(this.status == "stand"){
            this.status = "right";
            }
        }else if(this.predictions[4].probability.toFixed(2) > 0.98){ // left_exact
            if(this.status == "stand"){
                this.status = "left";
            }
        }
        return this.count;
      } else if (this.getIdx == 5) {
        // jumping_jacks
        if(this.predictions[0].probability.toFixed(2) == 1.00){ // 0: down
            // console.log("down")
            if(this.midCnt == 1){
                this.count++;
                console.log(this.count);
                this.midCnt = 0;
            }
            this.status = "down";
        }else if(this.predictions[2].probability.toFixed(2) == 1.00){ // 2: middle
            if(this.status == "down"){
                this.midCnt++;
            }
            console.log("midCnt: ", this.midCnt);
            this.status = "mid";
        }else if(this.predictions[4].probability.toFixed(2) == 1.00){ // 4: up
            this.status = "up";
        }
        return this.count;
      }
      return "우리가 원하는 범위의 인덱스가 아니야!";
    }
```

