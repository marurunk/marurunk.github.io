const ELEMENT = [
    'Resilience',
    'Passion',
    'Hate',
    'Ambition',
]
const ELEMENT_BG_INFO = [
    ["Devotion", "maru was been in a central park. Him was feeling conffortable around some flowers and him did some meditating there. Maybe too much."],
    ["", ""],
    ["", ""],
    ["", ""],
]

const INFORMATION = [
    [
        'Maru',
        'Lorem error provident velit iure adipisci. Sed praesentium similique repellat impedit quos vitae consectetur mollitia Veniam alias at consectetur consectetur elit odio? Alias vero sunt in fuga sapiente, vel! Ipsa quibusdam quam architecto eligendi obcaecati Sunt dolorem id hic magni dolore! Quis accusamus optio tempora quia veniam! Unde tenetur animi.',
    ],
    [
        'Teku',
        'Lorem error provident velit iure adipisci. Sed praesentium similique repellat impedit quos vitae consectetur mollitia Veniam alias at consectetur consectetur elit odio? Alias vero sunt in fuga sapiente, vel! Ipsa quibusdam quam architecto eligendi obcaecati Sunt dolorem id hic magni dolore! Quis accusamus optio tempora quia veniam! Unde tenetur animi.',
    ],
    [
        'Yuki',
        'Lorem error provident velit iure adipisci. Sed praesentium similique repellat impedit quos vitae consectetur mollitia Veniam alias at consectetur consectetur elit odio? Alias vero sunt in fuga sapiente, vel! Ipsa quibusdam quam architecto eligendi obcaecati Sunt dolorem id hic magni dolore! Quis accusamus optio tempora quia veniam! Unde tenetur animi.',
    ],
    [
        'Nogi',
        'Lorem error provident velit iure adipisci. Sed praesentium similique repellat impedit quos vitae consectetur mollitia Veniam alias at consectetur consectetur elit odio? Alias vero sunt in fuga sapiente, vel! Ipsa quibusdam quam architecto eligendi obcaecati Sunt dolorem id hic magni dolore! Quis accusamus optio tempora quia veniam! Unde tenetur animi.',
    ],
]


const themeProperties = [
    '--theme-accent',
    '--theme-bg-color',
    '--theme-dark-color',
]
const themeValues = [
    [
        '#0bf',
        '#035',
        '#030e18',
    ],

    [
        '#f05',
        '#503',
        '#16060f',
    ],

    [
        '#f30',
        '#533',
        '#1c0606',
    ],

    [
        '#fd0',
        '#543',
        '#1c1208',
    ],

]

const total_images = 4;
const titles = [
    "Maru 2023",
    "Teku 2023",
    "Yuki 2023",
    "Nogi 2023",
]

const trelloLink = "https://trello.com/b/2nSioGdD/marunk-work.json";

//const button_list = [
//    document.getElementById('mobile-instagram'),
//    document.getElementById('mobile-twitter'),
 //   document.getElementById('mobile-pixiv'),
//]
let effect3 = new Audio('./data/audio/wave-in.wav');
let effect5 = new Audio('./data/audio/wave-out.wav');

let hddElements=document.getElementsByClassName('no-context');for(let element of hddElements){element.oncontextmenu=()=>{return false};}

let presentation = document.getElementById('presentation');
//presentation.style.flexDirection = "row-reverse";
let gallery_box = document.getElementById('gallery');
let username = document.getElementById('username');
function copyUsername() {
    if (window.isSecureContext){
        navigator.clipboard
            .writeText(username.innerText)
            .then(console.log("copied"));
    }
    let animation_clicked = username.animate([
          { transform: 'scale(1.0, 1.0)'},
          { transform: 'scale(0.8, 1.0)', offset: 0.08},
          { transform: 'scale(1.0, 1.0)'}
        ], {
          fill: 'forwards',
          duration: 400 }
    );
        animation_clicked.play();
}


function init() {

    genGallery();
    genKanban();
    initSound();
    initButtons();
    detectDevice();
    genRandomTheme(ELEMENT.length);

}

function genRandomTheme(total_themes) {

    let x = Math.random() * total_themes;
    x = Math.round(x)
    if ( x == 0 ) { x=x+1; }

    let loader= document.getElementById('loader')
    let bg_title = document.getElementById('element_bg_title')
    console.log(bg_title)
    bg_title.innerText = `${ELEMENT_BG_INFO[x-1][0]}`;
    let bg_info = document.getElementById('element_bg_info')
    bg_info.innerText = `${ELEMENT_BG_INFO[x-1][1]}`;

    loader.children[0].innerText = `${ELEMENT[x-1]}`;
    loader.children[0].style.opacity = 1;

    let presentation_card = document.getElementsByClassName('presentation-card')[0]
    presentation_card.style.background = 'linear-gradient(to left, transparent, #000000aa)';
    if (x == 3){
        presentation.style.flexDirection = "row-reverse";
        presentation_card.style.background = 'linear-gradient(to right, transparent, #000000aa)';
    }

    // SET BACKGROUND THEME
    let bg = document.getElementById('background-illustration').children[0];
    bg.onload = function () {
        let animation_fadeInit = loader.animate(
        [
          { opacity: '1' },
          { opacity: '1' },
          { opacity: '0.7'},
          { opacity: '0' , backgroundColor: `${themeValues[x-1][0]}`, visibility: 'hidden'}
        ], {
          fill: 'forwards',
          duration: 1500
        });
        animation_fadeInit.play();

       let animation2_fadeInit = loader.children[0].animate(
        [
          { color: "#000000aa", textShadow: "0 0 0px #000000"},
          { color: "#00000000", textShadow: "0 0 10px #000000"},
          { color: "#00000000", textShadow: "0 0 30px #000000"},
          { color: "#00000000", textShadow: "0 0 60px #000000"}
        ], {
          fill: 'forwards',
          duration: 1000
        });
        animation2_fadeInit.play();

    };
    bg.src = `data/img/bg${x}.jpg`;

    // SET CSS VARIABLES THEME

    let root = document.querySelector(':root');
    console.log ( themeProperties[0] + "  :  " + themeValues[x-1][0]);
    for (let i=0; i<themeProperties.length; ++i) {
        root.style.setProperty(themeProperties[i], themeValues[x-1][i]);
    }

    // SET CHARACTER THEME


}

function initSound() {
    effect3.volume = 1;
    effect5.volume = 1;

    var playPromise = effect5.play();
    //Validated if sounds was played
    if (playPromise !== undefined) {
        playPromise.then(_ => {

        })
        .catch(error => {
            console.log(":( no sound started")
        });
    }
}

function initButtons() {
//    button_list.forEach((button)=>{
 //       button.addEventListener('click', ()=>{
  //          effect3.play()
   //     })
    // button.addEventListener( 'pointerenter', ()=>{});
  //  })
}

function genGallery() {
     for (let i = 1;  i <= total_images ; i++) {
        gallery_box.innerHTML += `
        <div class="gallery-image">
            <a class="gallery-image" data-lightbox="portfolio" data-title="${titles[i-1]}" href="data/img/slides/${i}.png"><img src="data/img/slides/small/${i}.jpg" alt=""></a>
        </div>
        `;
    }
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

function genKanban(){

fetch(trelloLink)
  .then(response => response.json())
  .then(data => {

    let html = ''

    // POR CADA LISTA DE LA TABLA
    data.lists.forEach(function(list){

        html += `
            <div class="flex col kanban-list" id="${list.name.replace(/\s/g, "")}">
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
                if(card.cover.scaled) {
    			console.log(card.cover.scaled[5].url);
			html += `
                    <div class="flex col wrap kanban-card">
		    	<div class="kanban-card-img flex">
		    	<img src="${card.cover.scaled[5].url}">
                    	</div>
                        <h4 class="kanban-card-title">${card.name}</h4>
                        ${labelsHtml}
                    </div>
                `;
		} else {
			html += `
                    <div class="flex row wrap kanban-card">
                        <h4 class="kanban-card-title">${card.name}</h4>
                        ${labelsHtml}
                    </div>
                `;
		}

            }
        });

        html += `
            </div>
        `  // CERRAMOS EL DIV DE LA LIST
    });
    // AÑADIMOS EL BOTTON A TRELLO
    html += `
    <div class="absolute flex trello-link">
    <a  href="https://trello.com/b/2nSioGdD/marunk-work" target="_blank">
        <img class=" trello-icon " src="data/img/trello.png" alt="" srcset="">
    </a><div>`
    //Y FINALMENTE AGREGAMOS AL DOM
    document.getElementById('trello-board').innerHTML = html;

  })
  .catch(error => {
    // Manejo de errores
    console.log('Trello JSON ERROR:', error);
  });
}
