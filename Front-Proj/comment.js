window.onload = function () {
  var commentform = document.forms['commentForm']
  var commentObj = new CommentClass();
  commentObj.addInputBoxEventListener(document.getElementById('main-comment'), 'comments');

  var storedRating = new Array();
  storedRating = JSON.parse((localStorage.getItem("ratings"))) || [];
  var rating = 0;
  var title = document.getElementById('title').innerHTML;

  for(let i = 0; i < storedRating.length; i++)
  {
      if(storedRating[i].movie == title)
      {
          rating = parseInt(storedRating[i].rate);
      }
  }

  var hdata = document.getElementById("rating");
  hdata.innerHTML = "";
  hdata.innerHTML =rating;  
}

function CommentClass () {
  var _self = this;
  this.addInputBoxEventListener = function (elem, target, hideClass) {
    elem.addEventListener('keypress', function (evt) {
      evt = evt || window.event;
      if (evt.keyCode === 13) {
        _self.addComment(evt.target.value, target)
        evt.target.value = '';
        if (hideClass) {
          this.className = hideClass
        }
      }
      evt.stopPropagation();
      return false;
    }, false)
  }

  var today = new Date();
  var date = "date: " + today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();

  this.addComment = function (comment, target) {
    createCommentStructure(target, localStorage.getItem("logged"), comment, date)
  }  

    var createCommentStructure = function (target, header, content, date) {
    var outerDiv = document.createElement('div');
    outerDiv.className = 'comment-section';
 
    var commentDetails = document.createElement('div');
    commentDetails.className = 'comment-details';

    var commentHeader = document.createElement('div');
    commentHeader.className = 'comment-header';
    commentHeader.innerText = date + " " + header;

    var commentBody = document.createElement('div');
    commentBody.className = 'comment-body';
    commentBody.innerText = content;

    var inputElement = document.createElement('input');
    inputElement.placeholder = 'Add comment';
    inputElement.className = 'comment-box reply-comment hide';
    inputElement.setAttribute('autocomplete', 'off');

    var newComment = document.createElement('div');
    newComment.className = 'new-comment';

    commentDetails.appendChild(commentHeader);
    commentDetails.appendChild(commentBody);
    commentDetails.appendChild(newComment);

    outerDiv.appendChild(commentDetails);

    _self.addInputBoxEventListener(inputElement, newComment, 'comment-box reply-comment hide')

    if (typeof target === 'string') {
      document.getElementById(target).appendChild(outerDiv);
    } else {
      target.appendChild(outerDiv)
    }
  }

}

function getSelectValue()
{
    var selectedValue = document.getElementById("list").value;
    console.log(selectedValue);
}

function setRating()
{
    var title = document.getElementById("title").innerHTML;
    var rating = 0;
    var username = localStorage.getItem("logged");

    var storedRating = new Array();
    storedRating = JSON.parse((localStorage.getItem("ratings"))) || [];
            
    rate = new Object();
    var toInt = parseInt(document.getElementById("list").value);

    for(let i = 0; i < storedRating.length; i++)
    {
        if(username == storedRating[i].user && storedRating[i].movie == title)
        {
          alert("User already voted for the movie!")
          return;
        }
        else if(storedRating[i].movie == title)
        {
          rating = storedRating[i].rate;
        }
    }

    rating += toInt;

    rate={
        user: username,
        movie: title,
        rate: rating
    };

    for(let i = 0; i < storedRating.length; i++)
    {
        if(storedRating[i].movie == title)
        {
          storedRating[i].rate = rating;
        }
    }
    var hdata = document.getElementById("rating");
    hdata.innerHTML = rating;

    storedRating.push(rate);
    localStorage.setItem("ratings", JSON.stringify(storedRating));

}