prediction_1=" ";
prediction_2=" ";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';

    });
}

console.log("ml 5 version", ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/HhoPsOATU/model.json",modelLoaded);
function modelLoaded(){
    console.log("Model Loaded!");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="Your hand gesture is"+prediction_1;
var utterThis= new SpeechSynthesisUtterance(speak_data_1);
synth.speak(utterThis);
}
function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        document.getElementById("hand_gesture").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if (results[0].label == "Hi-Five") {
            document.getElementById("emoji_updated").innerHTML = "&#128400;";
        }
        if (results[0].label == "Thumbs-up") {
            document.getElementById("emoji_updated").innerHTML = "&#128077;";
        }
        if (results[0].label == "Nice") {
            document.getElementById("emoji_updated").innerHTML = "&#128076;";
        } 
         if (results[0].label == "Writing") {
            document.getElementById("emoji_updated").innerHTML = "&#9997;";
        }
        if (results[0].label == "Bye") {
            document.getElementById("emoji_updated").innerHTML = "&#128075;";
        }

    }

}