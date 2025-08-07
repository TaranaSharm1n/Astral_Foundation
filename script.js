/* VARIABLES */
let titleImg, bgImg, bgImg2, wishScImg, buttonImg, starImg, meteorImg, spaceShipImg, skyEnd;
let wishdirecImg;
let winImg, failImg;
let planetFont, font;
let catcher, object1, object2;
let score = 0;
let lives = 2;
let average;
let timerValue = 20;
let nextButton;
let screen = 0;
let test = 0; //all tests used for loops
let test1 = 0;
let test2 = 0;
let test3 = 0;
/* PRELOAD LOADS FILES */
function preload(){
  titleImg = loadImage('assets/Title.png');
  buttonImg = loadImage('assets/Buttons.png');
  bgImg2 = loadImage('assets/directionsImg.png');
  planetFont = loadFont('assets/space age.ttf');
  font = loadFont('assets/VCR_OSD_MONO_1.001.ttf');
  bgImg = loadImage('assets/sky.png');
  starImg = loadImage('assets/Shooting stars.png');
  meteorImg = loadImage('assets/Meteors.png');
  spaceShipImg = loadImage('assets/Spaceship.png');
  skyEnd = loadImage('assets/skyEnd.png');
  wishDirecImg = loadImage('assets/Wish Direc.png');
  wishScImg = loadImage('assets/Wish scenario.png');
  winImg = loadImage('assets/Win.png');
  failImg = loadImage('assets/Fail.png');
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  
  //create buttons/sprites
  playButton = new Sprite(buttonImg,width/2 - 100, height/2 + 100);
  direcButton = new Sprite(buttonImg,width/2 + 100, height/2 + 100);
  nextButton = new Sprite(buttonImg,-400, -400);
  
  a1 = new Sprite(buttonImg,-400, -400); //offscreen
  a2 = new Sprite(buttonImg,-400, -400);
  wish2Button = new Sprite(buttonImg,-400,-400);
  
  b1 = new Sprite(buttonImg,-400,-400);
  b2 = new Sprite(buttonImg,-400,-400);
  wish3Button = new Sprite(buttonImg,-400,-400);

  //resizeImg
  buttonImg.resize(200,80);
}

/* DRAW LOOP REPEATS */
function draw() {
  
  if(screen == 0){
    title();
  }
  if(screen == 1){
    directions();
  }
  if(screen == 2){
    game();
    timer();
  }
  if(screen == 3){
    wishDirec();
  }
  if(screen == 4){
    screen4();
  }
  if(screen == 5){
    screen5();
  }
  if(screen == 6){
    screen6();
  }
  if(screen == 7){
    screen7();
  }
  if(screen == 8){
    screen8();
  }
  if(screen == 9){
    screen9();
  }
  if(screen == 10){
    endingChecker();
  }
  if(screen == 11){
    screen11();
  }
  if(screen == 12){
    screen12();
  }
}
/* FUNCTIONS */
function title(){
  background(titleImg);
  textSize(20);
  textFont(planetFont);
  playButton.w = 100;
  playButton.h = 50;
  playButton.collider = 'k';
  playButton.textSize = 20;
  playButton.textAlign = 'CENTER';
  //text('PLAY', 50, 300);
  playButton.textColor = 'white';
  playButton.text = 'PLAY';
  
  direcButton.w = 100;
  direcButton.h = 50;
  direcButton.collider = 'k';
  direcButton.textSize = 18;
  direcButton.textColor = 'white';
  direcButton.text = '  DIRECTIONS';
    
  //checks directions button
  if(direcButton.mouse.presses()){
    print('pressed');
    screen = 1;
  }
  //checks play button
  if(playButton.mouse.presses()){
    print('play');
    screen = 2;
  }
}
function directions(){
  background(bgImg2);
  textSize(15);
  textFont(font);
  text("You’re a new intern on Space Collection\nx-18IV00 and just earned a temporary spot in\none of the leading stations in the galactic\nuniverse! However, new interns are monitored\non whether they’ll be getting a job offer.\nYou can't mess this up as this opportunity\nis given to you.Your first task is to\ncollect as many shooting stars as you can\nbefore your shift ends.(20 seconds) You will\nlose points for every star missed. Try your\nbest to make yourself stand out amongst the\nother interns and watch out for meteors!", 10, 50);

  textFont(planetFont);
  //move direction off screen & move play to center
  direcButton.pos = {x: -100, y: -100};
  playButton.pos = {x: width/2, y: height/2 + 100};

  //checks play button
  if(playButton.mouse.presses()){
    print('play');
    screen = 2;
  }
}
function game(){
  background(bgImg);

  //bring sprites on and off screen
  direcButton.pos = {x: -400, y: 400};
  playButton.pos = {x: -400, y: 400};

  //like a second "set up", creates everything once.
  while(test < 1){ 
    //to get the sprite to only be made once so it moves.
    catcher = new Sprite(spaceShipImg,200,350,100,20,"k");
    object1 = new Sprite(starImg,random(width),0,10);
    object1.color = color('purple');
    object1.vel.y = 5;
    object2 = new Sprite(meteorImg,random(width),0,10);
    object2.color = color('gray');
    object2.vel.y = 6;
    object1.rotationLock = true;
    object2.rotationLock = true;
    
    //create timer
    textAlign(RIGHT);
    textSize(20);
    fill('white');
    setInterval(timeIt, 1000);

    //resize
    spaceShipImg.resize(40,0);
    starImg.resize(65,0);
    meteorImg.resize(75,0);
    test++;
  }


  //moves catcher sprite
  if(kb.pressing("left")){
    catcher.vel.x = -6;
  } else if(kb.pressing("right")){
    catcher.vel.x = 6;
  } else {
    catcher.vel.x = 0;
  }
  //If fallingObject reaches bottom, move back to random position at top.
  if(object1.y >= height){
    object1.y = 0;
    object1.x = random(width);
    object1.vel.y = random(5,10);
    object1.direction = 'down';
    score--;
  }
  if(object2.y >= height){
    object2.y = 0;
    object2.x = random(width);
    object2.vel.y = random(5,7);
    object2.direction = 'down';
  }
  //stops catcher from edge 
  if(catcher.x < 50){
    catcher.x = 50;
  }else if(catcher.x > 350){
    catcher.x = 350;
  }
  //If fallingObject collides with catcher, move back to random position at top.
    if(object1.collides(catcher)){
      object1.y = 0;
      object1.x = random(width);
      object1.vel.y = random(3,5);
      object1.direction = 'down';
      score++;
    }
    if(object2.collides(catcher)){
      object2.y = 0;
      object2.x = random(width);
      object2.vel.y = random(2,3);
      object2.direction = 'down';
      score--;
    }
  //draw score 
  fill('white');
  textSize(25);
  text(score, 350, 30);
}
function timer(){
  //timer
  textSize(20);
  fill('white');
  if (timerValue >= 10) {
    text("0:" + timerValue, 50, 30);
  }
  if (timerValue < 10) {
    text('0:0' + timerValue, 50, 30);
  }
  if (timerValue == 0) {
    text('game over', 100,50);
    gameOver();
  }
}
function timeIt() {
  if (timerValue > 0) {
    timerValue--;
  }
}
function gameOver(){
  background(skyEnd);
    catcher.pos = { x: 600, y: -300 };
    object1.pos = { x: -100, y: 0 };
    object2.pos = { x: -100, y: 0 };

    textSize(12);
    textFont(font);
  if(score > 0){
      text("You've collected " + score + " " + "stars! Click next to proceed.", 200 ,   height/2 + 5);
    } else {
      text("You've lost " + score + " " + "stars.. Click the button to proceed.", 200,   height/2 + 5);
    }
  nextButton.pos = {x: width/2, y: height/2 + 80};
  nextButton.w = 60;
  nextButton.h = 35;
  nextButton.textColor = 'black';
  nextButton.text = "Next";
  nextButton.textSize = 20;
  nextButton.collider = 'k';
  if(nextButton.mouse.presses()){
    print('screen3');
    screen = 3;
  }
  textSize(20);
    textAlign(CENTER);
    fill('white');
    textFont(planetFont);
    text("Your Shift is over.", 200, height/2 - 30); 
}
function wishDirec(){
  background(wishDirecImg);
  //move sprites offscreen
  nextButton.pos = {x: -400, y: -400};
  //like a second "set up", creates everything once.
  while(test1 < 1){
    wishButton = new Sprite(buttonImg,width/2,height/2 + 80);
    test1++;
  }
  wishButton.color = 'purple';
  wishButton.text = 'START';
  nextButton.w = 100;
  nextButton.h = 50;
  nextButton.collider = 'k';
  
  textAlign(LEFT);
  textFont(font);
  textSize(15);
  text("You've completed your first assignment,\ngreat job! Now you must view different\nwishes and determine whether to send them to\ndepartment 17IV, where wishes are granted.\nClick accept or deny after each wish.\nChoosing wrong will make you lose a life!\nMalicious wishes exist and are against\npolicy. If chosen, You'll risk your chances\nof a job offer!" , 10 , 105); 

  if(wishButton.mouse.presses()){
    print('screen 4');
    screen = 4;
  }
}
function screen4(){
  background(wishScImg);
  //bring buttons on and off screen
  wishButton.pos = {x: -400, y: -400};
  a1.pos = {x: width/2 - 100, y: height/2 + 100};
  a2.pos = {x: width/2 + 100, y: height/2 + 100};
  
  fill('black');
  textFont(font);
  text("A transcript of the wish is given:\nShooting star, I wish my mother is cured\nfrom her sickness.", 30, 100);
text("\n- copied from the wisher's\n mind from the hospital window, the \nnight of a shooting star.", 60 , 150); 

  a1.color = 'pink';
  a1.text = 'ACCEPT';
  a1.w = 100;
  a1.h = 50;
  a1.collider = 's';
  a1.rotation = 360;

  a2.color = 'pink';
  a2.text = 'DENY';
  a2.w = 100;
  a2.h = 50;
  a2.collider = 's';
  a2.rotation = 360;
  
  //checks accept
  if(a1.mouse.presses()){
    print('screen5');
    screen = 5;
  }
  //checks deny
  if(a2.mouse.presses()){
    print('screen 6')
      screen = 6;
      lives--;
  }
  //draws lives  
  text('Lives: ' + lives,30,80);
}
function screen5(){
  background(wishDirecImg);
  fill('white');
  text("Correct! Great job, Wishes can be granted\nunder terms of one specific field. In this\ncase: improving health. Click the next\nbutton for the next wish.\n\nYou have: " + lives + " lives remaining.", 10, 105);
  //place buttons on and offscreen
  a1.pos = {x:-400, y: -400};
  a2.pos = {x: -400, y: -400};
  wish2Button.pos = {x:width/2, y:height/2 + 80};
  wish2Button.w = 100;
  wish2Button.h = 50;
  wish2Button.text = 'NEXT';
  wish2Button.rotation = 360;
  
  if(wish2Button.mouse.presses()){
    print('screen7');
    screen = 7;
  }
}
function screen6(){
  background(wishDirecImg);
  fill('white');
    text("Oh no! Unfortunately you chose the wrong\n choice. Wishes can be granted under\nterms of one specific field. In this case:\nimproving health. Click the next button for the\nnext wish.\n\nYou have: " + lives + " life remaining.", 10, 105);

  //place buttons on and offscreen
  a1.pos = {x: -400, y: -400};
  a2.pos = {x: -400, y: -400};
  wish2Button.pos = {x:width/2, y:height/2 + 120};
  wish2Button.w = 100;
  wish2Button.h = 50;
  wish2Button.text = 'NEXT';
  wish2Button.rotation = 360;
  
  if(wish2Button.mouse.presses()){
    print('screen7');
    screen = 7;
  }
}
function screen7(){
  background(wishScImg);
  fill(0);
  text("A transcript of the wish is given:\nShooting Star, I wish my enemy doesn't get anything\nhe wants!", 30, 100);
text("- copied from a journal that was written\nunder the night of a shooting star.", 30 , 170);

  //bring buttons on and off screen
  wish2Button.pos = {x: -400, y: -400};
  b1.pos = {x: width/2 - 100, y: height/2 + 100};
  b2.pos = {x: width/2 + 100, y: height/2 + 100};

  b1.color = 'pink';
  b1.text = 'ACCEPT';
  b1.w = 100;
  b1.h = 50;
  b1.rotation = 360;
  
  b2.color = 'pink';
  b2.text = 'DENY';
  b2.w = 100;
  b2.h = 50;
  b2.rotation = 360;
  
  //checks accept
  if(b1.mouse.presses()){
    print('screen8');
    screen = 9;
  }
  //checks deny
  if(b2.mouse.presses()){
    print('screen 9')
      screen = 8;
      lives--;
  }
  //draws lives  
  text('Lives: ' + lives,10,80);
}
function screen8(){
  background(wishDirecImg);
  fill('white');
  text("Correct! Great job, Wishes cannot be granted\n under such malice intentions. Click next to\nsee your evaluation!",10, 105);

  //place buttons on and offscreen
  b1.pos = {x: -400, y: -400};
  b2.pos = {x: -400, y: -400};
  wish3Button.pos = {x:width/2, y:height/2 + 80};
  wish3Button.w = 100;
  wish3Button.h = 50;
  wish3Button.text = 'NEXT';
  wish3Button.rotation = 360;

  if(wish3Button.mouse.presses()){
    print('screen10');
    screen = 10;
  }
}
function screen9(){
  background(wishDirecImg);
  fill('white');
  text("Oh no! Unfortunately you chose the wrong\nchoice. Wishes cannot be granted under such\nmalice intentions. Click next to see your\nevaluation!", 10, 105);

  //place buttons on and offscreen
  b1.pos = {x: -400, y: -400};
  b2.pos = {x: -400, y: -400};
  wish3Button.pos = {x:width/2, y:height/2 + 80};
  wish3Button.w = 100;
  wish3Button.h = 50;
  wish3Button.text = 'NEXT';
  wish3Button.rotation = 360;

  if(wish3Button.mouse.presses()){
    print('screen10');
    screen = 10;
  }
}
function endingChecker(){
  lives = lives * 2;
  average = (score/lives) * 100;
  //passing ending
  if(average > 50){
    screen = 11;
  }
  else{ //fail
    screen = 12;
  }
}
function screen11(){
  background(winImg);
  text('Refresh the screen to play again.', 100, 270);
  wish3Button.pos = {x: -400, y: -400};
}
function screen12(){
  background(failImg);
  wish3Button.pos = {x: -400, y: -400};
}
