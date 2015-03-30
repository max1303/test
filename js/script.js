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

      elAttachmentsList = document.querySelector('.attachments ul'),
      elAttachmentsCount = document.querySelector('.attachments-count'),

      elAllDocumentsCheckboxes,
      elAllLinksCheckboxes,
      elAllLabsCheckboxes,

      elAddAllDocumentsBtn = document.querySelector('.add-documents'),
      elRemoveAllDocumentsBtn = document.querySelector('.remove-documents'),
      elAddAllLinksBtn = document.querySelector('.add-links'),
      elRemoveAllLinksBtn = document.querySelector('.remove-links'),
      elAddAllLabsBtn = document.querySelector('.add-labs'),
      elRemoveAllLabsBtn = document.querySelector('.remove-labs'),

      form = document.querySelector('#send');

  initSelectList(elDocumentsList, 'documents');
  initSelectList(elLinksList, 'links');
  initSelectList(elLabsList, 'labs');

  elAllDocumentsCheckboxes = elDocumentsList.querySelectorAll('input[type="checkbox"]');
  elAllLinksCheckboxes = elLinksList.querySelectorAll('input[type="checkbox"]');
  elAllLabsCheckboxes = elLabsList.querySelectorAll('input[type="checkbox"]');

  form.submit.addEventListener('click', function(event){
    var log = {
        name: form.name.value,
        email: form.mail.value,
        text: form.text.value,
        attached: attachments
    }
    alert(JSON.stringify(log))
  });

  elAddAllDocumentsBtn.addEventListener('click', function() {

    elAddAllDocumentsBtn.style.display = 'none';
    elRemoveAllDocumentsBtn.style.display = 'inline';

    getCheckedAllHandler('documents', elAllDocumentsCheckboxes, true)();
  });

  elRemoveAllDocumentsBtn.addEventListener('click', function() {

    elRemoveAllDocumentsBtn.style.display = 'none';
    elAddAllDocumentsBtn.style.display = 'inline';

    getCheckedAllHandler('documents', elAllDocumentsCheckboxes, false)();
  });

  elAddAllLinksBtn.addEventListener('click', function() {

    elAddAllLinksBtn.style.display = 'none';
    elRemoveAllLinksBtn.style.display = 'inline';

    getCheckedAllHandler('links', elAllLinksCheckboxes, true)();
  });

  elRemoveAllLinksBtn.addEventListener('click', function() {

    elRemoveAllLinksBtn.style.display = 'none';
    elAddAllLinksBtn.style.display = 'inline';

    getCheckedAllHandler('links', elAllLinksCheckboxes, false)();
  });

  elAddAllLabsBtn.addEventListener('click', function() {

    elAddAllLabsBtn.style.display = 'none';
    elRemoveAllLabsBtn.style.display = 'inline';

    getCheckedAllHandler('labs', elAllLabsCheckboxes, true)();
  });

  elRemoveAllLabsBtn.addEventListener('click', function() {

    elRemoveAllLabsBtn.style.display = 'none';
    elAddAllLabsBtn.style.display = 'inline';

    getCheckedAllHandler('labs', elAllLabsCheckboxes, false)();
  });

  function getCheckedAllHandler(listName, checkboxes, checked) {
    return function() {
      for (var i in checkboxes) {
        checkboxes[i].checked = checked;
      }

      for (var i in lists[listName]) {
        onItemChecked(listName, i, checked);
      }
    }
  }

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
                            '<span class="article-name">'+ item.title +'</span>' +
                            '<span class="authors">'+ item.description +'</span>'+
                          '</label>';

    var elListItem = document.createElement('li');
    elListItem.innerHTML = listItemTempate;

    var elCheckbox = elListItem.querySelector('input[type="checkbox"]');
    elCheckbox.addEventListener('change', getCheckedHandler(listName, index));

    return elListItem;
  }

  function getCheckedHandler(listName, index) {
    return function(event) {
      onItemChecked(listName, index, event.target.checked);
    }
  }

  function onItemChecked(listName, index, checked) {
    var item = lists[listName][index],
        attachmentsItemId = 'attachments-' + listName + '-' + index,
        alreadyAttached = attachments.indexOf(item) != -1;

      if(checked) {
        if (!alreadyAttached)
          addAttachment(attachmentsItemId, item)
      } else {
        if (alreadyAttached)
          removeAttachment(attachmentsItemId, item)
      }
  }

  function addAttachment(attachmentsItemId, item) {
    var elAttachmentsItem = createAttachmentsItem(attachmentsItemId, item);

    attachments.push(item);

    elAttachmentsList.appendChild(elAttachmentsItem);

    // FIXME: add handler for delete button
    
    updateAttachmentsCount();
  }

  function removeAttachment(attachmentsItemId, item) {
    var elAttachmentsItem = elAttachmentsList.querySelector('#' + attachmentsItemId);

    elAttachmentsItem.parentNode.removeChild(elAttachmentsItem);

    attachments.splice(attachments.indexOf(item), 1);
    
    updateAttachmentsCount();
  }

  function createAttachmentsItem(attachmentsItemId, item) {
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

  function updateAttachmentsCount() {
    elAttachmentsCount.innerText = attachments.length;
  }

})();