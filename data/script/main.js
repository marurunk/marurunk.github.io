const themeProperties = [
    '--theme-accent',
    '--theme-bg-color',
]
const themeValues = [
    [
        '#0bf',
        '#035',
    ],

    [
        '#f05',
        '#503',
    ],

    [
        '#f30',
        '#533',
    ],

    [
        '#fd0',
        '#543',
    ],

]



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


let gallery_box = document.getElementById('gallery');
const total_images = 5;
const titles = [
    "Maru v23",
    "Teku v23",
    "Yuki v23",
    "Nogi v23",
    "Miku Esper - Proyect Voltage",
]

function init() {
    genRandomTheme(1);
    initSound();
    initButtons();
    genGallery();

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


function genRandomTheme(total_themes) {

    let x = Math.random() * total_themes;
    x = Math.round(x)
    if ( x == 0 ) { x=x+1; }

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

// GENERATE GALLERY

function genGallery() {
     for (let i = 1;  i <= total_images ; i++) {
        gallery_box.innerHTML += `
        <div class="gallery-image">
            <a class="gallery-image" data-lightbox="portfolio" data-title="${titles[i-1]}" href="data/img/slides/${i}.png"><img src="data/img/slides/small/${i}.jpg" alt=""></a>
        </div>
        `;
    }
}


// KANBAN BOARD



fetch(trelloLink)
  .then(response => response.json())
  .then(data => {

	  console.log(data);

    let html = ''

    // POR CADA LISTA DE LA TABLA
    data.lists.forEach(function(list){

        html += `
            <div class="flex col kanban-list" id="${list.name.replace(/\s/g, "")}">
            <h3 class="kanban-list-title">${list.name}</h3>
        `// INICIAMOS LA LISTA

        data.cards.forEach(function(card){
            // FILTRAMOS LAS CARTAS CORRESPONDIENTES A LA LISTA USANDO EL ID DE LA LISTA
            if (card.idList == list.id && card.closed == false){
                //GENERAMOS EL HTML DE LAS ETIQUETAS
                var labelsHtml = `<div class="kanban-labels row flex wrap"> `
                card.labels.forEach(function(label){
                    labelsHtml += `<span class="kanban-label ${label.color}">` +label.name + `</span>
                    `;
                    console.log(label.color + " | " + label.name)
                });
                labelsHtml += `</div>`

		    //
                // seleccionamos los que tienen cover
                if(card.cover.scaled) {
			html += `
                    <div class="flex col kanban-card">
		    	<div class="kanban-card-img flex col">
		    	<img src="${card.cover.scaled[5].url}">
			`
                // si tiene progreso
			if (card.badges.checkItems > 0){
				var progress = parseInt(card.badges.checkItemsChecked/card.badges.checkItems * 100) + "%";
                    	html += `
			<div class="kanban-card-bar flex" style="--x-progress:${progress}"></div>
			</div>`;

			} else {
                    	html += `</div>`;}
			
                        html += `<h4 class="kanban-card-title">${card.name}</h4>
                        ${labelsHtml}
                    </div>`;
		} else {

			if (card.badges.checkItems > 0){
				var progress = parseInt(card.badges.checkItemsChecked/card.badges.checkItems * 100) + "%";

			html += `
                    <div class="flex col kanban-card">
			<div class="kanban-card-bar flex" style="--x-progress:${progress}"></div>
                        <h4 class="kanban-card-title">${card.name}</h4>
                        ${labelsHtml}
                    </div>
                `;

			}else{

			html += `
                    <div class="flex col kanban-card">
                        <h4 class="kanban-card-title">${card.name}</h4>
                        ${labelsHtml}
                    </div>
                `;

			}
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

const musicWidget= document.getElementById("music-container");

const musicActivators = document.querySelectorAll('.music-activator');
musicActivators.forEach((activator) => {
activator.addEventListener("click", () => {
musicWidget.classList.remove("music-translate");
});
});

