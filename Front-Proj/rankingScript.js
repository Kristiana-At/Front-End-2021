window.onload = function rankingLists() {
    var mainContainer1 = document.getElementById("numComments");
    var mainContainer2 = document.getElementById("numVotes");
    var mainContainer3 = document.getElementById("rank");

    var storedComments = new Array();
    storedComments = JSON.parse((localStorage.getItem("comments"))) || [];
    storedComments.sort((a, b) => Number(b.numComments) - Number(a.numComments)); //sort descending
    //storedComments = removeDuplicate(storedComments);

    var arrayNoDuplicate1 = new Array();
    arrayNoDuplicate1.push(storedComments[0]);
    for (var i = 1, k = 0; i < storedComments.length; i++) {
        if(storedComments[i].movie != arrayNoDuplicate1[k].movie)
        {
            arrayNoDuplicate1.push(storedComments[i]);
            k++;
        }
    }

    var storedNumRating = new Array();
    storedNumRating = JSON.parse((localStorage.getItem("ratings"))) || [];
    storedNumRating.sort((a, b) => Number(b.votes) - Number(a.votes)); //sort descending
    //storedNumRating = removeDuplicate(storedNumRating);

    var arrayNoDuplicate2 = new Array();
    arrayNoDuplicate2.push(storedNumRating[0]);
    for (var i = 1, k = 0; i < storedNumRating.length; i++) {
        if(storedNumRating[i].movie != arrayNoDuplicate2[k].movie)
        {
            arrayNoDuplicate2.push(storedNumRating[i]);
            k++;
        }
    }

    var ratingsByValue = new Array();
    ratingsByValue = JSON.parse((localStorage.getItem("ratings"))) || [];
    ratingsByValue.sort((a, b) => Number(b.rate) - Number(a.rate));//sort descending
    //ratingsByValue = removeDuplicate(ratingsByValue);

    var arrayNoDuplicate3 = new Array();
    arrayNoDuplicate3.push(ratingsByValue[0]);
    for (var i = 1, k = 0; i < ratingsByValue.length; i++) {
        if(ratingsByValue[i].movie != arrayNoDuplicate3[k].movie)
        {
            arrayNoDuplicate3.push(ratingsByValue[i]);
            k++;
        }
    }
        

    for (var i = 0; i < 5 && i < arrayNoDuplicate1.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = (i + 1) + ".   " + arrayNoDuplicate1[i].movie;// + "  ->   " + arrayNoDuplicate1[i].numComments;
        //console.log(storedComments[i].movie);
        mainContainer1.appendChild(li);
    }

    for (var i = 0; i < 5 && i < arrayNoDuplicate2.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = (i + 1) + ".   " + arrayNoDuplicate2[i].movie;// + "  ->   " + arrayNoDuplicate2[i].votes;
        //console.log(storedNumRating[i].movie);
        mainContainer2.appendChild(li);
    }

    for (var i = 0; i < 5 && i < arrayNoDuplicate3.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = (i + 1) + ".   " + arrayNoDuplicate3[i].movie;// + "  ->   " + arrayNoDuplicate3[i].rate;
        //console.log(ratingsByValue[i].movie);
        mainContainer3.appendChild(li);
    }
}

// function removeDuplicate(arr){
//     var arrayNoDuplicate = new Array();
//     arrayNoDuplicate.push(arr[0]);
//     for (var i = 1, k = 0; i < arr.length; i++) {
//         if(arr[i].movie != arr[k].movie)
//         {
//             arrayNoDuplicate.push(arr[i]);
//             k++;
//         }
//     }
//     return arrayNoDuplicate;
// }
