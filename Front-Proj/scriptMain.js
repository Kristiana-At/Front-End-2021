fetch('./data.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                appendData(data);
            })
            .catch(function (err) {
                console.log('error: ' + err);
            });
        function appendData(data) {
            var mainContainer = document.getElementById("main");
            data.sort((a, b) => Number(b.year) - Number(a.year)); //sort descending
            for (var i = 0; i < data.length; i++) {
                var div = document.createElement("div");
                div.className ="movie";

                var img = document.createElement("img");
                

                var div2 = document.createElement("div");
                div2.className = "image_cover";
                

                var p = document.createElement("p");
                p.className = "description";
                

                var div3 = document.createElement("div")
                div3.className = "movie-info";
                

                var a = document.createElement("a");
                a.className = "link";

                var span = document.createElement("span");
                

                img.src = data[i].image;
                p.innerHTML = data[i].description;
                a.href = data[i].href;
                a.innerHTML = data[i].title;
                span.innerHTML = data[i].year;

                div.appendChild(img);
                div.appendChild(div2);
                div2.appendChild(p);
                div.appendChild(div3);
                div3.appendChild(a);
                div3.appendChild(span);
                mainContainer.appendChild(div);
            }
        }

       