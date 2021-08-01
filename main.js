"use strict"; 
var apiUrl = 'https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Articl e%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init'

document.addEventListener("DOMContentLoaded", function () {
  var xmlhttp = new XMLHttpRequest();


xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var responseJSON = JSON.parse(this.responseText);
        myFunction(responseJSON);
    }
};
xmlhttp.open("GET", apiUrl, true);
xmlhttp.send();

function myFunction (json){
  console.log(json);
  for (var i=0; i<6; i++){
            var curRecomendation = json.list[i];
            if(curRecomendation != null){
                //for each recommensation on the list - creates new instanse of recommendation-item component and append to the widgetBody div
                var item = document.createElement("div");
                var recommendationHtml = "<img class='thumbnail' src ='' alt='' ><span class='title'></span><span class='category'></span> <span class='branding'></span>";
                item.innerHTML = recommendationHtml;
                item.setAttribute("class", "recommendationItem");
                item.setAttribute("id", curRecomendation.id);
                item.setAttribute( "onclick" ,"location.href= " + '"' + decodeURI(curRecomendation.url)+ '"');
                //add classes for IE css grid adjustments
                item.classList.add("column-"+ (i%3));
                item.classList.add("row-"+ (i%2));
                item.classList.add("m-row-"+ (i));
                document.getElementsByClassName('widgetBody')[0].appendChild(item);
    
                //inject all nedded information from current recomendation to the component 
                item.querySelector('img').src = curRecomendation.thumbnail[0].url;
                item.querySelector('.title').innerText = curRecomendation.name;
                item.querySelector('.category').innerText = curRecomendation.categories != null ? curRecomendation.categories[0] : '';
                item.querySelector('.branding').innerText = curRecomendation.branding;
            }    
        }
}
})



