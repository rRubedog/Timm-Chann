let songs = new Array("communism.mp3", "happy-2021.mp3", "happy-2022.mp3", "jacket-the-cat.mp3", "kill-it.mp3");

let radio = docuemnt.querySelector('#radio-src');

radio.src = songs[0];

radio.onended = (event) => {
    radio.src = "music-files/" + songs[1];
};