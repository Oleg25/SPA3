/**
 * Created by ovel on 28.09.2015.
 */
function take_snapshot() {

  var data_uri = Webcam.snap();

  document.getElementById('results').innerHTML =
    '<img id="pic" src="'+data_uri+'" style="display:none;"/>';
  var ctx
  var canvas
  var workerCount = 0;
  var ResultOfDecoding = document.getElementById("dec")
  var gimgid;
  function receiveMessage(e) {
    if(e.data.success === "log") {
      console.log(e.data.result);
      return;
    }
    workerCount--;
    if(e.data.success){
      var tempArray = e.data.result;
      for(var i = 0; i < tempArray.length; i++) {
        if(resultArray.indexOf(tempArray[i]) == -1) {
          resultArray.push(tempArray[i]);
        }
      }
      ResultOfDecoding.innerHTML=resultArray.join("<br />");
      var shutter = new Audio();
      shutter.autoplay = false;
      shutter.src = navigator.userAgent.match(/Firefox/) ? 'assets/sounds/beep.mp3' : 'assets/sounds/beep.mp3';
      shutter.play();
      //alert(ResultOfDecoding.innerHTML)
      workerCount = 0;
    }else {
      if(workerCount == 1) {
        FlipWorker.postMessage({pixels: ctx.getImageData(0,0,canvas.width,canvas.height).data, cmd: "flip"});
      }
    }
    if(workerCount == 0){
      if(resultArray.length === 0) {
        ResultOfDecoding.innerHTML="Ошибка чтения.";
        setTimeout(function(){
          take_snapshot()
        }, 500);
      }else {
        ResultOfDecoding.innerHTML=resultArray.join("<br />");
      }
    }
  }
  var DecodeWorker = new Worker("DecoderWorker.js");
  var FlipWorker = new Worker("DecoderWorker.js");
  DecodeWorker.onmessage = receiveMessage;
  FlipWorker.onmessage = receiveMessage;
  var resultArray = [];
  function Decode(imgid) {
    gimgid = imgid
    var img = document.getElementById(imgid);
    canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    ctx = canvas.getContext("2d");
    if(workerCount > 0) return;
    workerCount = 2;
    ResultOfDecoding.innerHTML='чтение...';
    resultArray = [];
    ctx.drawImage(img,0,0,canvas.width, canvas.height);
    DecodeWorker.postMessage({pixels: ctx.getImageData(0,0,canvas.width,canvas.height).data, cmd: "normal"});
  }


  Decode('pic');
}

function start(){
  setInterval(function(){
    take_snapshot();
  }, 1000)
}

function talk() {
  var recognizer = new webkitSpeechRecognition();
  recognizer.lang = "ru";
  recognizer.onresult = function(event) {
    if (event.results.length > 0) {
      var result = event.results[event.results.length-1];
      if(result.isFinal) {
        //console.log(result[0].transcript);
        //document.getElementById("voice_result").innerHTML = "Вы сказали: "+result[0].transcript.trim()+" ?";
        document.getElementById("sb").value = result[0].transcript.trim();
      }
    }
  };
  recognizer.start();
}
