let songs = new Array("communism.mp3", "happy-2021.mp3", "happy-2022.mp3", "jacket-the-cat.mp3", "kill-it.mp3");

let radio = docuemnt.getElementById('radio-src');

radio.src = songs[1];

radio.onended = (event) => {
    radio.src = "music-files/" + songs[2];
};