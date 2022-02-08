window.onload = function rankingLists() {
    var mainContainer1 = document.getElementById("numComments");
    var mainContainer2 = document.getElementById("numVotes");
    var mainContainer3 = document.getElementById("rank");

    var storedComments = new Array();
    storedComments = JSON.parse((localStorage.getItem("comments"))) || [];
    storedComments.sort((a, b) => Number(b.numComments) - Number(a.numComments)); //sort descending
    storedComments = removeDuplicate(storedComments);

    var storedNumRating = new Array();
    storedNumRating = JSON.parse((localStorage.getItem("ratings"))) || [];
    storedNumRating.sort((a, b) => Number(b.votes) - Number(a.votes)); //sort descending
    storedNumRating = removeDuplicate(storedNumRating);

    var ratingsByValue = new Array();
    ratingsByValue = JSON.parse((localStorage.getItem("ratings"))) || [];
    ratingsByValue.sort((a, b) => Number(b.rate) - Number(a.rate));//sort descending
    ratingsByValue = removeDuplicate(ratingsByValue);

    for (var i = 0; i < 5 && i < storedComments.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = (i + 1) + ".     " + storedComments[i].movie;// + ":   " + storedComments[i].numComments;
        mainContainer1.appendChild(li);
    }

    for (var i = 0; i < 5 && i < storedNumRating.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = (i + 1) + ".     " + storedNumRating[i].movie;// + "  ->   " + storedNumRating[i].votes;
        mainContainer2.appendChild(li);
    }

    for (var i = 0; i < 5 && i < ratingsByValue.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = (i + 1) + ".     " + ratingsByValue[i].movie;// + "  ->   " + ratingsByValue[i].rate;
        mainContainer3.appendChild(li);
    }
}

function removeDuplicate(arr){
    var arrayNoDuplicate = new Array();
    arrayNoDuplicate.push(arr[0]);
    for (var i = 1, k = 0; i < arr.length; i++) {
        if(arr[i].movie != arr[k].movie)
        {
            arrayNoDuplicate.push(arr[i]);
            k++;
        }
    }
    return arrayNoDuplicate;
}
