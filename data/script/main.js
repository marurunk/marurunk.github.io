const button_list = [
    document.getElementById('mobile-instagram'),
    document.getElementById('mobile-twitter'),
    document.getElementById('mobile-pixiv'),/* 
    document.getElementById('Telegram') */
]
let effect3 = new Audio('./data/audio/wave-in.wav');
let effect5 = new Audio('./data/audio/wave-out.wav');

let principal_character = document.getElementById('social-media-character');principal_character.oncontextmenu = ()=>{return false};

const trelloLink = "https://trello.com/b/2nSioGdD/marunk-work.json"

function init() {
    initSound();
    initButtons();
    
    detectDevice();

    // Animation Fade-In
    let animation_fadeInit = document.getElementById('init').animate(
        [
          { opacity: '0' },
          { opacity: '1' }
        ], {
          fill: 'forwards',
          duration: 1500
        });
    

    animation_fadeInit.play();
    
}

function initSound() {
    effect3.volume = 1;
    effect5.volume = 1;
    
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
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        console.log(`Your system is Mobile`)
    } else {
        if (/Windows/.test(navigator.userAgent)) {
            console.log(`Your system is: Windows`)
        } else if (/Mac OS X/.test(navigator.userAgent)) {
            console.log(`Your system is: MacOS`)
        } else if (/Linux/.test(navigator.userAgent)) {
            console.log(`Your system is: Linux`)
        
        } else {
            console.log(`Your platform is hidden.. \n Nice`)
        }
      
    }
}

document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        init()
    }
  };

// TABS LOGIC
const tabs = document.querySelectorAll('.tab-bt');
const info_side = document.querySelectorAll('.tab-content');

tabs.forEach((tab, index)=>{
    tab.addEventListener('click', (e)=>{
        tabs.forEach(tab=>{tab.classList.remove('tab-active')});
        tab.classList.add('tab-active')
    
        var line = document.querySelector('.tabs-line');
        line.style.width = e.target.offsetWidth + "px";
        line.style.left = e.target.offsetLeft + "px";

        info_side.forEach(content=>{content.classList.add('hidden')})
        info_side[index].classList.remove('hidden')


    })

})


// KANBAN BOARD

var trello_labels = ['Instagram', 'Twitter', 'MarunK']


fetch(trelloLink)
  .then(response => response.json())
  .then(data => {

    let html = ''

    // POR CADA LISTA DE LA TABLA
    data.lists.forEach(function(list){
        
        html += `
            <div class="flex col kanban-list">
            <h3 class="kanban-list-title">${list.name}</h3>
        `// INICIAMOS LA LISTA
        
        data.cards.forEach(function(card){
            // FILTRAMOS LAS CARTAS CORRESPONDIENTES A LA LISTA USANDO EL ID DE LA LISTA
            if (card.idList == list.id){
                //GENERAMOS EL HTML DE LAS ETIQUETAS
                var labelsHtml = ""
                card.labels.forEach(function(label){
                    labelsHtml += `<span class="kanban-label ${label.color}">` +label.name + `</span>
                    `;
                });
                //AGREGAMOS CADA CARTA EN EL HTML CON SUS ETIQUETAS
                html += `
                    <div class="flex row wrap kanban-card">
                        <h4 class="kanban-card-title">${card.name}</h4>
                        ${labelsHtml}
                    </div>
                `;
            }
        });

        html += `
            </div>
        `  // CERRAMOS EL DIV DE LA LIST
    });

    //Y FINALMENTE AGREGAMOS AL DOM
    document.getElementById('trello-board').innerHTML = html;

  })
  .catch(error => {
    // Manejo de errores
    console.log('Trello JSON ERROR:', error);
  });
