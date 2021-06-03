var prediction1, prediction2;

Webcam.set({
    width : 350,
    height : 300,
    image_format : "png",
    png_quality : 90
});

Webcam.attach("#camera");

function takesnapshot(){
    Webcam.snap(function(datauri){
        document.getElementById("result").innerHTML="<img src="+datauri+" id='captured-image'>"
    });
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/A8tSj4u-_/model.json",modelLoaded);

function modelLoaded(){
    console.log("The model is loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speakdata1 = "The first prediction is " + prediction1;
    speakdata2 = "And the second prediction is " + prediction2;
    utterThis = new SpeechSynthesisUtterance(speakdata1 + speakdata2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured-image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        document.getElementById("emotion_name1").innerHTML = prediction1;
        document.getElementById("emotion_name2").innerHTML = prediction2;
        speak();
        if(prediction1 == "Happy"){
            document.getElementById("emoji_1").innerHTML = "&#128512";
        }
        if(prediction1 == "Angry"){
            document.getElementById("emoji_1").innerHTML = "&#128545;";
        }
        if(prediction1 == "Sad"){
            document.getElementById("emoji_1").innerHTML = "&#128532;";
        }
        if(prediction2 == "Happy"){
            document.getElementById("emoji_2").innerHTML = "&#128512";
        }
        if(prediction2 == "Angry"){
            document.getElementById("emoji_2").innerHTML = "&#128545;";
        }
        if(prediction2 == "Sad"){
            document.getElementById("emoji_2").innerHTML = "&#128532;";
        }
    }
}
