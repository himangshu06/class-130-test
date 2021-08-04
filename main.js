scoreRightWrist = 0;
scoreLeftWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

song = "";
function preload(){
  song = loadSound("music.mp3");
}
function setup(){
   canvas = createCanvas(500,500);
   canvas.center();
   video  = createCapture(VIDEO);
   video.hide();
   poseNet = ml5.poseNet(video,modelLoaded);
   poseNet.on('pose',gotPoses);
}
function modelLoaded(){
  console.log("poseNet is initilized!");
}
function gotPoses(results){
  if (results.length > 0){
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log("scoreRightWrist  = "+scoreRightWrist+"scoreLeftWrist = "+scoreLeftWrist);


    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    rightWristX  = results[0].pose.rightWrist.x;
    rightWristY  = results[0].pose.rightWrist.y;


    console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
    console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
  }
}
function draw(){
    image(video,0,0,500,500);
    fill("#0000FF");
    stroke("#0000FF");
    if (scoreRightWrist > 0.2){
      circle(rightWristX,rightWristY,20);
      if(rightWristY > 0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML="speed = 0.5x";
        song.rate(0.5);
      }
      if(rightWristY > 100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML="speed = 1x";
        song.rate(1);
      }
      if(rightWristY > 200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML="speed = 1.5x";
        song.rate(1.5);
      }
      if(rightWristY > 300 && rightWristY <= 400){
        document.getElementById("speed").innerHTML="speed = 2x";
        song.rate(2);
      }
      if(rightWristY > 400){
        document.getElementById("speed").innerHTML="speed = 2.5x";
        song.rate(2.5);
      }
    }
    if (scoreLeftWrist > 0.2){
      circle(leftWristX,leftWristY,20);
      inNumberLeftWristY = Number(leftWristY);
      removeDecimal = floor(inNumberLeftWristY*2);
      volume = removeDecimal/1000;
      document.getElementById("volume").innerHTML="volume= "+volume;
      song.setVolume(volume);
    }
  }
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}


