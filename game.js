var tetris = document.querySelector('#tetris');
var tetrisData = [];

function makeColums(){
    var fragment = document.createDocumentFragment();
    for(var i =0; i <20; i++){
        var tr = document.createElement('tr');
        fragment.appendChild(tr);
        for(var j = 0; j <10; j++){
            var td = document.createElement('td');
            tr.appendChild(td);
        }
    }
    tetris.appendChild(fragment);
}

window.addEventListener('keydown', function(e){
 this.console.log(e);
 switch(e.code){
    case 'Space':
        break;
    case 'ArrowRight':
        break;
    case 'ArrowLeft':
        break;
    case 'ArrowDown':
        break;
    case 'ArrowUp':
        break; 

 } 
});

window.addEventListener('keyup', function(e){
    this.console.log(e);
    switch(e.code){
       case 'Space':
           break;
       case 'ArrowUp':
           break; 
   
    } 
   });

makeColums();