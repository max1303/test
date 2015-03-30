var lists = {
  documents: [
    {
      title: 'Clean Code',
      description: 'Robert C. Martin, A Handbook of Agile Software Craftsmanship, 2014.'
    },
    {
      title: 'Patterns of Enterprise Application Architecture',
      description: 'Martin Fowler, 2 edition, 2002.'
    },
    {
      title: 'HTML, XHTML and CSS For DummiesJan',
      description: 'Ed Tittel and Jeff Noble,5 edition,2015.'
    },
    {
      title: 'HTML, XHTML and CSS For DummiesJan',
      description: 'Ed Tittel and Jeff Noble,5 edition,2015.'
    }
  ],
  links: [
    { 
      title: 'HTML, XHTML and CSS',
      description: 'http://htmlbook.ru/, HTML catalog.'
    },
    {
      title: 'Learn Web Building',
      description: 'http://www.w3schools.com/, Learn Web Building'
    },
    {
      title: 'Developer online magazine',
      description: 'habrahabr.ru'
    }
  ],
  labs: [
    {
      title: 'HTML test',
      description: 'First \'Hello world\' lab.'
    },
    {
      title: 'Animations',
      description: 'Animations using CSS'
    },
    {
      title: 'JS',
      description: 'Animations using JS'
    }
  ]
};

var attachments = [];

(function() {

  var elDocumentsList = document.querySelector('.documents ul'),
      elLinksList = document.querySelector('.links ul'),
      elLabsList = document.querySelector('.labs ul'),
      elAttachmentsList = document.querySelector('.attachments ul');

  initSelectList(elDocumentsList, 'documents');
  initSelectList(elLinksList, 'links');
  initSelectList(elLabsList, 'labs');

  function initSelectList(elList, listName) {
    var elListItem;

    for (var i in lists[listName]) {
      elListItem = createListItem(listName, i);
      elList.appendChild(elListItem);
    }
  }

  function createListItem(listName, index) {
    var item = lists[listName][index],
        listItemId = 'lists-' + listName + '-' + index + '';

    var listItemTempate = '<input id="' + listItemId + '" type="checkbox">' +
                          '<label for="' + listItemId + '">' +
                            '<p class="article-name">'+ item.title +'</p>' +
                            '<p class="authors">'+ item.description +'</p>'+
                          '</label>';

    var elListItem = document.createElement('li');
    elListItem.innerHTML = listItemTempate;

    var elCheckbox = elListItem.querySelector('input[type="checkbox"]');
    elCheckbox.addEventListener('change', getCheckedHandler(listName, index));

    return elListItem;
  }

  function getCheckedHandler(listName, index) {
    return function(event) {
      if(event.target.checked) {
          addAttachment(listName, index)
      } else {
          removeAttachment(listName, index)
      }
    }
  }

  function addAttachment(listName, index){
    
      var item = lists[listName][index],
          attachmentsItemId = listName + '-' + index;

      attachments.push(item);

      elAttachmentsList.appendChild(createAttachmentsItem(listName, index));

      // FIXME: update attached count
      // FIXME: add handler for delete button
  }

  function createAttachmentsItem(listName, index) {
    var item = lists[listName][index],
        attachmentsItemId = 'attachments-' + listName + '-' + index + '';

    var attachmentsItemTempate = '<p class="article-name">'+ item.title +'</p>' +
                                 '<p class="authors">'+ item.description +'</p>';

    var elAttachmentsItem = document.createElement('li');
    elAttachmentsItem.id = attachmentsItemId;
    elAttachmentsItem.innerHTML = attachmentsItemTempate;

    // FIXME: create delete button

    // var elCheckbox = elListItem.querySelector('input[type="checkbox"]');
    // elCheckbox.addEventListener('change', getCheckedHandler(listName, index));

    return elAttachmentsItem;
  }

})();

// function getItem(data, index, index2){
//     return '<li>' +
//               '<input id="article'+ index +'_'+ index2+'" type="checkbox" name="check2">' +
//               '<label for="article'+ index +'_'+ index2+'">' +
//               '<p class="article-name">'+ data.title +'</p>' +
//               '<p class="authors">'+ data.description +'</p>'+
//               '</label>' +
//            '</li>'
// }


// var attachments = [], articlesInput = [];
// var renderLists = document.querySelectorAll('.select-list ul'),
//     attachedList = document.querySelector('.attachments ul'),
//     attachedLength = document.querySelector('.attachments-count'),
//     form = document.querySelector('#send');

//  document.querySelector('.add-documents').onclick = function(){
//      for(var i=0; i< list.documents.length; i++){

//      }
//  }
// console.dir(form)
// form.submit.addEventListener('click', function(event){
//     var log = {
//         name: form.name.value,
//         email: form.mail.value,
//         text: form.text.value,
//         attached: attachments
//     }
//     alert(JSON.stringify(log))
// });

// function updateLenght(){
//     attachedLength.innerText = attachments.length
// }

// function getItem(data, index, index2){
//     return '<li>' +
//               '<input id="article'+ index +'_'+ index2+'" type="checkbox" name="check2">' +
//               '<label for="article'+ index +'_'+ index2+'">' +
//               '<p class="article-name">'+ data.title +'</p>' +
//               '<p class="authors">'+ data.description +'</p>'+
//               '</label>' +
//            '</li>'
// }
// function getAttach(data){
//     return '<li class="'+ data.listName +'" data-id="'+ data.id +'">' +
//               '<p class="article-name">'+ data.title +'</p>' +
//               '<p class="authors">'+ data.description +'</p>'+
//            '</li>';
// }
// function addAttach(attach){
//     var button = document.createElement('button');
//     button.className = 'remove';
//     button.innerText = 'remove';
//     attachments.push(attach);
//     attachedList.innerHTML += getAttach(attach);
//     updateLenght();
//     // attachedList.querySelector('li[data-id='+attach.id+']').appendChild(button);
//     // button.addEventListener('click', function(event){
//     //     removeAttach(attach);
//     // });   
// }
// function removeAttach(attach){
//     var index, 
//     element = document.querySelector('#'+ attach.id+''),
//     attachElement = attachedList.querySelector('[data-id='+attach.id+']');
//     for(var i=0; i< attachments.length; i++){
//         if(attachments[i].id == attach.id){
//             index = i;
//         }
//     }
//     element.checked = false;
//     attachments.splice(index, 1);
//     attachedList.removeChild(attachElement)
//     updateLenght()
// }


// Object.keys(lists).forEach(function(arr, arrindex){
//     lists[arr].forEach(function(article, index){
//         article.id = 'article'+arrindex+'_'+index;
//         renderLists[index].innerHTML += getItem(article, index, arrindex);
//     });
// });

// for(var i=0; i< renderLists.length; i++){
//     articlesInput.push(renderLists[i].querySelectorAll('li input'));
// }

// articlesInput.forEach(function(collection, index){
//     for(var j=0; j< collection.length; j++){
//        (function(j, index){
//             collection[j].addEventListener('change', function(event){
//                 console.log(attachedList.children)
//                 var attach = lists[Object.keys(lists)[index]][j];
//                     attach.listName = Object.keys(lists)[index];
//                 console.log(attach)
//                 if(event.target.checked){
//                     addAttach(attach)
//                 }else{
//                     removeAttach(attach)
//                 }
//             });
//         })(j, index);
//     }
// })
// console.log(lists)
