const button_list = [
    document.getElementById('Instagram'),
    document.getElementById('Twitter'),
    document.getElementById('Pixiv'),
    document.getElementById('Telegram')
]
let effect3 = new Audio('./data/audio/wave-in.wav');
let effect5 = new Audio('./data/audio/wave-out.wav');

let principal_character = document.getElementById('principal-character')
principal_character.oncontextmenu = ()=>{return false}

// Animation Fade-In
let animation_fadeInit = document.getElementById('init').animate(
    [
      { opacity: '0' },
      { opacity: '1' }
    ], {
      fill: 'forwards',
      duration: 1500
    });

function init() {
    initSound();
    initButtons();

    detectDevice()
    var playPromise = effect5.play();

    //Validated if sounds was played
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            console.log("sound started! :)")

        })
        .catch(error => {
            console.log(":( no sound started")
        });
    }
    animation_fadeInit.play()
    
}

function initSound() {
    effect3.volume = 1;
    effect5.volume = 1;

}

function initButtons() {
    button_list.forEach((button)=>{
        button.addEventListener('click', ()=>{
            effect3.play()
        })
    // button.addEventListener( 'pointerenter', ()=>{});
    })    
}

function detectDevice(){
    if (navigator.userAgentData.mobile){
        console.log("You're a Mobile!!")
    } else {
        if (navigator.userAgentData.platform == ""){
            console.log(`Your platform is hidden.. \n Nice`)
        } else {
            console.log(`Your system is a: ${navigator.userAgentData.platform}`)
        }
    }
}

window.addEventListener('load', init)