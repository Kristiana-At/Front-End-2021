window.onload = function () {
  var commentform = document.forms['commentForm']
  var commentObj = new CommentClass();
  commentObj.addInputBoxEventListener(document.getElementById('main-comment'), 'comments');

  var storedRating = new Array();
  storedRating = JSON.parse((localStorage.getItem("ratings"))) || [];

  var storedComments = new Array();
  storedComments = JSON.parse((localStorage.getItem("comments"))) || [];

  var rating = 0;
  var title = document.getElementById('title').innerHTML;

  for(let i = 0; i < storedRating.length; i++)
  {
      if(storedRating[i].movie == title)
      {
          rating = parseInt(storedRating[i].rate);
      }
  }

  for(let i = 0; i < storedComments.length; i++)
  {
    if(storedComments[i].movie == title)
    loadComments(document.getElementById('comments'), storedComments[i].header, storedComments[i].comment)
  }

  var hdata = document.getElementById("rating");
  hdata.innerHTML = "";
  hdata.innerHTML = rating;  
}

function loadComments(target, header, comment){ //to show comments of old users
    var outerDiv = document.createElement('div');
    outerDiv.className = 'comment-section';
 
    var commentDetails = document.createElement('div');
    commentDetails.className = 'comment-details';

    var commentHeader = document.createElement('div');
    commentHeader.className = 'comment-header';
    commentHeader.innerText = header;

    var commentBody = document.createElement('div');
    commentBody.className = 'comment-body';
    commentBody.innerText = comment;

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
    var doc = document.getElementById('main-comment');
    if (typeof target === 'string') {
      document.getElementById(target).appendChild(outerDiv);
    } else {
      target.appendChild(outerDiv)
    }

}

function CommentClass () { //for new comments
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
      createCommentStructure(target, date + " " + localStorage.getItem("logged"), comment)
  }  
    var createCommentStructure = function (target, header, content) {

    var numComments = 0;
    var title = document.getElementById("title").innerHTML;
    var storedComments = new Array();
    storedComments = JSON.parse((localStorage.getItem("comments"))) || [];
    for(let i = 0; i < storedComments.length; i++){
        if(storedComments[i].movie == title)
        {
          numComments = storedComments[i].numComments; 
        }
    }
    numComments += 1;
    
    var outerDiv = document.createElement('div');
    outerDiv.className = 'comment-section';
 
    var commentDetails = document.createElement('div');
    commentDetails.className = 'comment-details';

    var commentHeader = document.createElement('div');
    commentHeader.className = 'comment-header';
    commentHeader.innerText = header;

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

    var storedComments = new Array();
    storedComments = JSON.parse((localStorage.getItem("comments"))) || [];
    comm = new Object();
    comm={
    movie: title,
    header: header,
    comment: content,
    numComments: numComments
    };

    for(let i = 0; i < storedComments.length; i++)
    {
        if(storedComments[i].movie == title)
        {
          storedComments[i].numComments = numComments;
        }
    }

    storedComments.push(comm);
    localStorage.setItem("comments", JSON.stringify(storedComments));  

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
    var numVotes = 0;
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
          numVotes = storedRating[i].votes;
        }
    }

    rating += toInt;
    numVotes += 1;

    rate={
        user: username,
        movie: title,
        rate: rating,
        votes: numVotes
    };

    for(let i = 0; i < storedRating.length; i++)
    {
        if(storedRating[i].movie == title)
        {
          storedRating[i].rate = rating;
          storedRating[i].votes = numVotes;
        }
    }
    var hdata = document.getElementById("rating");
    hdata.innerHTML = rating;

    storedRating.push(rate);
    localStorage.setItem("ratings", JSON.stringify(storedRating));

}