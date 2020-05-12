let responseIndex = 0;

// Answer class
class Answer {
  constructor(q, x, y, imgtext, is_text) {
    this.q = q;
    this.x = x;
    this.y = y;
    this.imgtext = imgtext;
    this.is_text = is_text;

    if(!this.is_text) {
      this.img = loadImage('images/'+this.imgtext);
    }

  }

  // Display the Response
  display(r) {

    if(r == this.q) {
      if(!this.is_text) {
        //console.log('not ok:'+ this.imgtext);
          image(this.img, this.x, this.y, 500, 500);
      }
    }
  }

  displayText(r) {

    if(r == this.q) {
      if(this.is_text) {
        //console.log('ok');
        fill(239, 173, 27);
        textSize(43);
        textFont('Helvetica');
        textLeading(60)
        text(this.imgtext+'!', this.x, this.y, 460);
        //
      }
    }

    

  }

}

let data = {}; // Global object to hold results from the loadJSON call
let answers = []; // Global array to hold all answer objects

// Put any asynchronous data loading in preload to complete before "setup" is run
function preload() {

  data = loadJSON('js/data.json', function (data) { 
    loadData();
  });

}

function loadData(r) {
  //bg = loadImage('images/background.png');
  let responseData = data['data'];
  let responseKey = data['key'];

  //console.log(responseKey);

  for (let i = 0; i < responseData.length; i++) {
    //console.log(i+'-------------------------------');
    $("#nav").append('<li><a id="'+i+'" href="#">'+i+'</a></li>');

    let response = responseData[i];
    //console.log(response);
    var res = Object.entries(response);

    for (const [question, answer] of res) {
      console.log(`${question} and ${answer}`);
      let imgtext = '';
      let key = responseKey[question];
      let ans = key[answer];
      let x = key['x'];
      let y = key['y'];
      let is_text = key['is_text'];
      let determined_by = key['determined_by'];

      if(determined_by){
        console.log('det? '+determined_by);
        let det = responseKey[determined_by]
        let q = response[determined_by]
        let imdet = det[q]
        imdet = imdet.substr(0, imdet.lastIndexOf("."))
        let imkey = key[answer];
        imkey = imkey.substr(0, imkey.lastIndexOf("."))
        console.log(imkey+imdet+'.png');
        ans = imkey+imdet+'.png';
      }

      if(is_text == true){
        //console.log(answer);
        imgtext = answer;
      } else {
        imgtext = ans;
        //console.log(imgtext);
      }

      //console.log(x)
      // Put object in array
      answers.push(new Answer(i, x, y, imgtext, is_text));
    }

  }

  $("#nav a").click(function() {
      responseIndex = $(this).attr('id');
      //console.log(responseIndex);
      clear();
      //loop();
      redraw();
      return false;
  });
  
}


function setup() {
  var canvas = createCanvas(500, 500);
  canvas.parent('sketch');
}

function draw() {
  background(246,223,212);
  //image(bg, 0, 0);

  // Display all answers
  for (let i = 0; i < answers.length; i++) {
    answers[i].display(responseIndex);
    answers[i].displayText(responseIndex);
  }

  noLoop();

}


$(document).ready(function() {



});