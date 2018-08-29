
var originalData , totalLength;
let titleData = new Map();
var titleArray = [];
let genreSet = new Set();
let platformSet = new Set();
let releaseSet = new Set();

$(document).ready(function(){
  $.get("http://starlord.hackerearth.com/gamesext", function(data, status){
      totalLength = data.length;
      originalData = data;
      //(JSON.stringify(data[0].title) + " " + data[0].title);
      for(i = 0;i < totalLength;i++)
      {
        var titleGenre = (String(originalData[i].title)).toLowerCase() + " ---- " + (String(originalData[i].platform)).toLowerCase();
        var tempArr = [data[i].editors_choice , data[i].title , data[i].platform , data[i].genre , data[i].score , data[i].url , data[i].release_year];
        titleData.set(titleGenre, tempArr);
        titleArray.push(titleGenre);
        var genres = data[i].genre.split(", ");
        for(genreValue in genres)
        {
            genreSet.add(genres[genreValue]);
        }
        platformSet.add(data[i].platform);
        releaseSet.add(data[i].release_year);
      }
      popFilter();
      printWhole();

  });

});

function printWhole(){

  totalLength = originalData.length;
  document.getElementById("gameSection").innerHTML = "";
  var element = document.getElementById("searchResult");
  element.innerHTML = "";


  for(i = 0; i<totalLength; i++)
  {
    var titleGenre = (String(originalData[i].title)).toLowerCase() + " ---- " + (String(originalData[i].platform)).toLowerCase();

    gameBox = document.createElement("div");
    gameIcon = document.createElement("div");
    editorChoice = document.createElement("div");
    gamePlatform = document.createElement("div");
    gameGenre = document.createElement("div");
    gameScore = document.createElement("div");
    gameBox = document.createElement("div");
    gameTitle = document.createElement("h3");
    gameLink = document.createElement("a");
    gameLink.href = titleData.get(titleGenre)[5];
    gameLink.target = "_blank";
    gameLink.className = "gameLink";

    gameBox.className = "gameBox";
    gameIcon.innerHTML += '<img src = "gameIcon.png" alt = "gameicon">';
    gameIcon.className = "gameIcon";
    if(originalData[i].editors_choice == "Y")
    {
      editorChoice.innerHTML += '<img src = "star.png">';
    }
    else
    {
      editorChoice.innerHTML += '<img src = "unstar.png">';
    }
    editorChoice.className = "editorChoice";
    gameTitle.innerHTML += originalData[i].title;
    gameTitle.className = "gameTitle";
    gamePlatform.innerHTML += originalData[i].platform;
    gamePlatform.className = "gamePlatform";
    gameGenre.innerHTML += "Genre: " + originalData[i].genre;
    gameGenre.className = "gameGenre";
    gameScore.innerHTML += originalData[i].score;
    gameScore.className = "gameScore";
    gameBox.appendChild(gameIcon);
    gameBox.appendChild(editorChoice);
    gameBox.appendChild(gameTitle);
    gameBox.appendChild(gamePlatform);
    gameBox.innerHTML += "<br><br><hr>";
    gameBox.appendChild(gameGenre);
    gameBox.appendChild(gameScore);
    gameLink.appendChild(gameBox);
    gameLink.appendChild(gameBox);
    gameSection.appendChild(gameLink);
  }
}

function checkMatch(mid, filter)
{
  for(i = 0; i < filter.length; i++)
  {
    if(filter[i] != titleArray[mid][i])
    {
      return 0;
    }
  }
  return 1;
}

function searchSingleGame(gameName = document.getElementById("searchBar").value)
{
  document.getElementById("gameSection").innerHTML = "";
  if(gameName == "")
  {
    printWhole();
  }
  var element = document.getElementById("searchResult");
  element.innerHTML = "";

  gameBox = document.createElement("div");
  gameIcon = document.createElement("div");
  editorChoice = document.createElement("div");
  gamePlatform = document.createElement("div");
  gameGenre = document.createElement("div");
  gameScore = document.createElement("div");
  gameBox = document.createElement("div");
  gameTitle = document.createElement("h3");
  gameLink = document.createElement("a");
  gameLink.href = titleData.get(gameName)[5];
  gameLink.target = "_blank";
  gameLink.className = "gameLink";

  gameBox.className = "gameBox";
  gameIcon.innerHTML += '<img src = "gameIcon.png" alt = "gameicon">';
  gameIcon.className = "gameIcon";
  if(titleData.get(gameName)[0] == "Y")
  {
    editorChoice.innerHTML += '<img src = "star.png">';
  }
  else
  {
    editorChoice.innerHTML += '<img src = "unstar.png">';
  }
  editorChoice.className = "editorChoice";
  gameTitle.innerHTML += titleData.get(gameName)[1];
  gameTitle.className = "gameTitle";
  gamePlatform.innerHTML += titleData.get(gameName)[2];
  gamePlatform.className = "gamePlatform";
  gameGenre.innerHTML += "Genre: " + titleData.get(gameName)[3];
  gameGenre.className = "gameGenre";
  gameScore.innerHTML += titleData.get(gameName)[4];
  gameScore.className = "gameScore";
  gameBox.appendChild(gameIcon);
  gameBox.appendChild(editorChoice);
  gameBox.appendChild(gameTitle);
  gameBox.appendChild(gamePlatform);
  gameBox.innerHTML += "<br><br><hr>";
  gameBox.appendChild(gameGenre);
  gameBox.appendChild(gameScore);
  gameLink.appendChild(gameBox);
  gameLink.appendChild(gameBox);
  gameSection.appendChild(gameLink);
}

function listToBar(str)
{
  var input = document.getElementById("searchBar");
  input.value = str;

  searchSingleGame(str);
}

function display(mid, filter)
{
  var displayArray = [];
  var dontDisplay = 0;
  var searchResult = document.getElementById("searchResult");
  searchResult.innerHTML = "";
  if(filter == "")
  {
    return;
  }
  for(i = 0; i < 10; i++)
  {
    dontDisplay = 0;
    for(j = 0; j < filter.length; j++)
    {
      if(titleArray[mid + i][j] != filter[j])
      {
        dontDisplay = 1;
      }
    }
    if(dontDisplay == 0)
    {
      displayArray.push(titleArray[mid + i]);
    }
  }
  for(i = 0; i < displayArray.length; i++)
  {
    searchResult.innerHTML += '<li id = "searchList" onclick = \'listToBar(\"' +displayArray[i] + '\")\'><a href = "#">' + displayArray[i] + '</a>' + '</li>';
  }
}

function searchDisplay()
{
  var input = document.getElementById("searchBar");
  var filter = input.value.toLowerCase();

  if(filter == "")
  {
    printWhole();
  }

  for(i = 0; i < totalLength; i++)
  {
    var title = originalData[i].title;
    var url = originalData[i].url;
  }

  titleArray.sort()

  var lo = 0, hi = totalLength - 1 , mid;
  while(lo<hi)
  {
    mid = Math.floor((lo + hi) / 2);
    if(checkMatch(mid, filter) == 1)
    {
      hi = mid;
    }
    else
    {
      if(filter < titleArray[mid])
      {
        hi = mid - 1;
      }
      else
      {
        lo = mid + 1;
      }
    }
  }
  display(mid, filter);

}

function popFilter()
{
  var filter = document.getElementById("filterResult");
  filterResult.style.visibility = "hidden";
  var platformFilter = document.getElementById("platformFilter");
  platformFilter.innerHTML="<div class = 'filterHeading' >Platform</div><br>";
  for(let platform of platformSet)
  {
    platformFilter.innerHTML += '<div class = "platformCheck" ><input type = "checkbox" >' + platform + '</div>';
  }

  var releaseFilter = document.getElementById("releaseFilter");
  releaseFilter.innerHTML="<div class = 'filterHeading' >Release Year</div><br>";
  for(let release of releaseSet)
  {
    releaseFilter.innerHTML += '<div class = "releaseCheck" ><input type = "checkbox" >' + release + '</div>';
  }

  var genreFilter = document.getElementById("genreFilter");
  genreFilter.innerHTML="<div class = 'filterHeading' >Genre</div><br>";
  for(let genre of genreSet)
  {
    genreFilter.innerHTML += '<div class = "genreCheck" ><input type = "checkbox" >' + genre + '</div>';
  }

}

function filterPress()
{
  var filter = document.getElementById("filterResult");
  filterResult.style.visibility = "visible";
}

function filterClose()
{
  var filter = document.getElementById("filterResult");
  filterResult.style.visibility = "hidden";
}

function filterApply() {
  let checkMap = new Map();
  var mainArr = [];
  var checkEmpty = 0;
  var checkboxes=document.getElementById("platformFilter").getElementsByTagName("input");
  (checkboxes[0].checked);
  var dataVis = [];
  for(i = 0;i<originalData.length;i++)
  {
    dataVis.push(0);
  }
  var platformArr = Array.from(platformSet);
  for(i = 0;i<checkboxes.length;i++)
  {
    if(checkboxes[i].checked)
    {
      checkMap.set(platformArr[i],1);
      checkEmpty = 1;
    }
    else{
      checkMap.set(platformArr[i],0);
    }
  }
  for(i = 0;i<originalData.length;i++)
  {
    for(j = 0;j < platformArr.length;j++)
    {
      if(originalData[i].platform == platformArr[j] && checkMap.get(platformArr[j]) == 1)
      {
        dataVis[i] = 1;
      }
    }
  }

  var checkboxes=document.getElementById("genreFilter").getElementsByTagName("input");
  var genreArr = Array.from(genreSet);
  for(i = 0;i<checkboxes.length;i++)
  {
    if(checkboxes[i].checked)
    {
      checkMap.set(genreArr[i],1);
    }
    else{
      checkMap.set(genreArr[i],0);
    }
  }
  for(i = 0;i<originalData.length;i++)
  {

    for(j = 0;j < genreArr.length;j++)
    {
      var difgenre = originalData[i].genre.split(",");
      for(k = 0;k<difgenre.length;k++)
      {
        if(difgenre[k].trim() == genreArr[j] && checkMap.get(genreArr[j]) == 1)
        {
          if(dataVis[i] == 1 || checkEmpty == 0)
          dataVis[i] = 1;
        }
      }
    }
  }
  for(i = 0;i<checkboxes.length;i++)
  {
    if(checkboxes[i].checked)
    {
      checkEmpty = 1;
    }
  }

  var checkboxes=document.getElementById("releaseFilter").getElementsByTagName("input");
  var releaseArr = Array.from(releaseSet);
  for(i = 0;i<checkboxes.length;i++)
  {
    if(checkboxes[i].checked)
    {
      checkMap.set(releaseArr[i],1);
    }
    else{
      checkMap.set(releaseArr[i],0);
    }
  }
  for(i = 0;i<originalData.length;i++)
  {
    for(j = 0;j < releaseArr.length;j++)
    {
      if(originalData[i].release_year == releaseArr[j] && checkMap.get(releaseArr[j]) == 1)
      {
        if(dataVis[i] == 1 || checkEmpty == 0)
        dataVis[i] = 1;
      }
    }
  }
  for(i = 0;i<checkboxes.length;i++)
  {
    if(checkboxes[i].checked)
    {
      checkEmpty = 1;
    }
  }
  var checkboxes=document.getElementById("editorFilter").getElementsByTagName("input");
  if(checkEmpty == 0)
  {
    for(i = 0;i<originalData.length;i++)
    {
      dataVis[i] = 1;
    }
  }
  if(checkboxes[0].checked)
  {
    for(i = 0;i<originalData.length;i++)
    {
      if(dataVis[i] == 1 && originalData[i].editors_choice == 'Y')
      {
        var tempArr = [originalData[i].editors_choice , originalData[i].title , originalData[i].platform , originalData[i].genre , originalData[i].score , originalData[i].url , originalData[i].release_year];
        mainArr.push(tempArr);
      }
    }
  }
  else if(checkboxes[1].checked)
  {
    for(i = 0;i<originalData.length;i++)
    {
      if(dataVis[i] == 1 && originalData[i].editors_choice == 'N')
      {
        var tempArr = [originalData[i].editors_choice , originalData[i].title , originalData[i].platform , originalData[i].genre , originalData[i].score , originalData[i].url , originalData[i].release_year];
        mainArr.push(tempArr);
      }
    }
  }
  else
  {
    for(i = 0;i<originalData.length;i++)
    {
      if(dataVis[i] == 1)
      {
        var tempArr = [originalData[i].editors_choice , originalData[i].title , originalData[i].platform , originalData[i].genre , originalData[i].score , originalData[i].url , originalData[i].release_year];
        mainArr.push(tempArr);
      }
    }
  }
  var checkboxes=document.getElementById("scoreFilter").getElementsByTagName("input");
  if(checkboxes[0].checked)
  {
    mainArr.sort(function(a,b){
      if(a[4]<b[4])
      {
        return -1;
      }
      else if(a[4]==b[4])
      {
        return 0;
      }
      else{
        return 1;
      }
    });
  }
  else if(checkboxes[1].checked)
  {
    mainArr.sort(function(a,b){
      if(a[4]>b[4])
      {
        return -1;
      }
      else if(a[4]==b[4])
      {
        return 0;
      }
      else{
        return 1;
      }
    });
  }

  finalDisplay(mainArr);
}

function finalDisplay(arr)
{
  document.getElementById("gameSection").innerHTML = "";
  for(i=0;i<arr.length;i++)
  {
    gameBox = document.createElement("div");
    gameIcon = document.createElement("div");
    editorChoice = document.createElement("div");
    gamePlatform = document.createElement("div");
    gameGenre = document.createElement("div");
    gameScore = document.createElement("div");
    gameBox = document.createElement("div");
    gameTitle = document.createElement("h3");
    gameLink = document.createElement("a");
    gameLink.href = arr[i][5];
    gameLink.target = "_blank";
    gameLink.className = "gameLink";

    gameBox.className = "gameBox";
    gameIcon.innerHTML += '<img src = "gameIcon.png" alt = "gameicon">';
    gameIcon.className = "gameIcon";
    if(arr[i][0] == "Y")
    {
      editorChoice.innerHTML += '<img src = "star.png">';
    }
    else
    {
      editorChoice.innerHTML += '<img src = "unstar.png">';
    }
    editorChoice.className = "editorChoice";
    gameTitle.innerHTML += arr[i][1];
    gameTitle.className = "gameTitle";
    gamePlatform.innerHTML += arr[i][2];
    gamePlatform.className = "gamePlatform";
    gameGenre.innerHTML += "Genre: " + arr[i][3];
    gameGenre.className = "gameGenre";
    gameScore.innerHTML += arr[i][4];
    gameScore.className = "gameScore";
    gameBox.appendChild(gameIcon);
    gameBox.appendChild(editorChoice);
    gameBox.appendChild(gameTitle);
    gameBox.appendChild(gamePlatform);
    gameBox.innerHTML += "<br><br><hr>";
    gameBox.appendChild(gameGenre);
    gameBox.appendChild(gameScore);
    gameLink.appendChild(gameBox);
    gameLink.appendChild(gameBox);
    gameSection.appendChild(gameLink);
  }
}

window.onclick=function(event) {
  var searchResult = document.getElementById("searchResult");
  if(event.target!=searchResult)
  searchResult.innerHTML = "";
};
