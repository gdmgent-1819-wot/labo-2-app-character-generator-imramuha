// APP CONSTRUCTOR
function App() {

    // all our lets
    let _pixel,
        _pixelsContainer,
        _quantity,
        _database,
        _saveCharacter,
        _showCharacters,
        _gallery;


    // initializing all whats needed in the right order
    function init(){

        _database = firebase.database();

        
        // cache dom elements
        _pixelsContainer = document.querySelector('.container');
        _saveCharacter = document.querySelector('.save');
        _showCharacter = document.querySelector('.gallery');
        _gallery = document.querySelector('.galleryContainer');
        _quantity = 8;

        createCharacterMatrix();
    }

    // create the interface to fill boxes to create a character
    function createCharacterMatrix () {
        let tempStr = '';

        for(let j = 0; j < _quantity; j++){
            tempStr += '<div class="pixels" style="background-color: rgb(255, 255, 255);">';

            for(let i = 0; i < _quantity; i++){                
                tempStr +=  `
                <div class="pixel"  style="background-color: rgb(255, 255, 255);"></div>`;

            }
            tempStr += '</div>'

        }
        _pixelsContainer.innerHTML = tempStr;

        // add eventlistener to each pixel
        _pixel = document.querySelectorAll('.pixel')
        for (let i = 0; i < _pixel.length; i++) {
            _pixel[i].addEventListener("click", function(event) {
                selected(_pixel[i]);
            })
        }
    }

    // function to colour/uncolour a pixel with a random colour
    function selected(item){      
        if (!item.style.backgroundColor || item.style.backgroundColor == "rgb(255, 255, 255)" ) {
            item.style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        } else {
            item.style.backgroundColor =  "rgb(255, 255, 255)";   
        }
    }

    // save character to the database
    document.querySelector('.save').addEventListener('click', function () {
        if(document.querySelector(".container").childNodes) {
            function saveCharacter (item) {
                _database.ref().child('characters').push().set(item);
                alert('Your character has been saved!');
                location.reload();
            }
        } else {
            console.log('No pixels were found!');
        }
        saveCharacter(document.querySelector(".container").innerHTML);
    })

     // gallery of the saved characters
     document.querySelector('.gallery').addEventListener('click', function () {
        tempStr = '<h3>Previously saved characters</h3>';
        _database.ref().child('characters').on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                tempStr +=  `<div class="character"> ${childSnapshot.val()} </div>`
            })
         });
         setTimeout(function(){  _gallery.innerHTML = tempStr;  }, 700);
    
    })


    // clears all the coloured pixels
    document.querySelector('.clear').addEventListener('click', function () {
        if(document.querySelector(".container").childNodes) {
            for (let i = 0; i < _pixel.length; i++) {
                _pixel[i].style.backgroundColor =  "rgb(255, 255, 255)";
            }
        } else {
            console.log('No pixels were found!');
        }
    })

    return {
        init: init
    };

}

// init the application 
window.onload = function(){
    const app = new App();
    app.init();
}


 