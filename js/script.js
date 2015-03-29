var lists = {
    	documents: [
    		{
    			title: 'Article Name',
    			description: 'Authors, name of edition,publishing year,  (more info?)'
    		},
    		{
    			title: 'Article Name',
    			description: 'Authors, name of edition,publishing year,  (more info?)'
    		},
    		{
    			title: 'Article Name',
    			description: 'Authors, name of edition,publishing year,  (more info?)'
    		}
    	],
    	links: [
    		{
    			title: 'Article Name',
    			description: 'www address, (more info?)<br>second line of text'
    		},
    		{
    			title: 'Article Name',
    			description: 'www address, (more info?)<br>second line of text'
    		},
    		{
    			title: 'Article Name',
    			description: 'www address, (more info?)<br>second line of text'
    		}
    	],
    	labs: [
    		{
    			title: 'Article Name',
    			description: 'www address, (more info?)<br>second line of text'
    		},
    		{
    			title: 'Article Name',
    			description: 'www address, (more info?)<br>second line of text'
    		},
    		{
    			title: 'Article Name',
    			description: 'www address, (more info?)<br>second line of text'
    		}
    	]
    },
    attachedLinks = [], articlesInput = [];

var renderLists = document.querySelectorAll('.select-list .list');
var attachedList = document.querySelector('.attached-list');
var attachedLength = document.querySelector('.attach-length');
var form = document.querySelector('#send');

// document.querySelector('.add-documents').onclick = function(){
//     for(var i=0; i< list.documents.length; i++){
        
//     }
// }
console.dir(form)
form.submit.addEventListener('click', function(event){
    var log = {
        name: form.name.value,
        email: form.mail.value,
        text: form.text.value,
        attached: attachedLinks
    }
    alert(JSON.stringify(log))
});

function updateLenght(){
    attachedLength.innerText = attachedLinks.length
}

function getItem(data, index, index2){
    return '<li>' +
              '<input id="article'+ index +'_'+ index2+'" type="checkbox" name="check2">' +
              '<label for="article'+ index +'_'+ index2+'">' +
              '<p class="article-name">'+ data.title +'</p>' +
              '<p class="authors">'+ data.description +'</p>'+
              '</label>' +
           '</li>'
}
function getAttach(data){
    return '<li class="'+ data.listName +'" data-id="'+ data.id +'">' +
              '<p class="article-name">'+ data.title +'</p>' +
              '<p class="authors">'+ data.description +'</p>'+
           '</li>';
}
function addAttach(attach){
    var button = document.createElement('button');
    button.className = 'remove';
    button.innerText = 'remove';
    attachedLinks.push(attach);
    attachedList.innerHTML += getAttach(attach);
    updateLenght();
    // attachedList.querySelector('li[data-id='+attach.id+']').appendChild(button);
    // button.addEventListener('click', function(event){
    //     removeAttach(attach);
    // });   
}
function removeAttach(attach){
    var index, 
    element = document.querySelector('#'+ attach.id+''),
    attachElement = attachedList.querySelector('[data-id='+attach.id+']');
    for(var i=0; i< attachedLinks.length; i++){
        if(attachedLinks[i].id == attach.id){
            index = i;
        }
    }
    element.checked = false;
    attachedLinks.splice(index, 1);
    attachedList.removeChild(attachElement)
    updateLenght()
}


Object.keys(lists).forEach(function(arr, arrindex){
    lists[arr].forEach(function(article, index){
        article.id = 'article'+arrindex+'_'+index;
        renderLists[index].innerHTML += getItem(article, index, arrindex);
    });
});

for(var i=0; i< renderLists.length; i++){
    articlesInput.push(renderLists[i].querySelectorAll('li input'));
}

articlesInput.forEach(function(collection, index){
    for(var j=0; j< collection.length; j++){
       (function(j, index){
            collection[j].addEventListener('change', function(event){
                console.log(attachedList.children)
                var attach = lists[Object.keys(lists)[index]][j];
                    attach.listName = Object.keys(lists)[index];
                console.log(attach)
                if(event.target.checked){
                    addAttach(attach)
                }else{
                    removeAttach(attach)
                }
            });
        })(j, index);
    }
})
console.log(lists)
