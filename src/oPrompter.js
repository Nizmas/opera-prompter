// browser.topSites.get()
//   .then((sites) => {
//     var div = document.getElementById('site-list');

//     if (!sites.length) {
//       div.innerText = 'No sites returned from the topSites API.';
//       return;
//     }

//     let ul = document.createElement('ul');
//     ul.className = 'list-group';
//     for (let site of sites) {
//       let li = document.createElement('li');
//       li.className = 'list-group-item';
//       let a = document.createElement('a');
//       a.href = site.url;
//       a.innerText = site.title || site.url;
//       li.appendChild(a);
//       ul.appendChild(li);
//     }

//     div.appendChild(ul);
//   });

$(document).ready(function(){
  //$("#search-input").val("");
  $("#search-input").keyup(function(event){
    if(event.keyCode == 13){
        //event.preventDefault();
        let searchTxt = $("#search-input").val();
        window.open("https://yandex.ru/search/?text=" + searchTxt, "_self");
    }
  });
  $("#searcher-yanex").click(function() {
    let searchTxt = $("#search-input").val();
    if(searchTxt === "") 
      window.open("https://yandex.ru/", "_self");
    else
      window.open("https://yandex.ru/search/?text=" + searchTxt, "_self");
  });

  $("#searcher-google").click(function() {
    let searchTxt = $("#search-input").val();
    if(searchTxt === "") 
      window.open("https://www.google.com/", "_self");
    else
      window.open("https://www.google.com/search?q=" + searchTxt, "_self");
  });


  $(".btn-search").on('contextmenu', function(e) {
    let top = e.pageY;
    let left = e.pageX-50;
    $("#context-menu").css({
      top: top,
      left: left
    }).addClass("context-menu");
    //console.log("btn-search", this);
    $(this).addClass("context-node");
    return false; //blocks default Webbrowser right click menu
});

  $("#context-menu a").on("click", function(e) {
    let contextNode = $(".context-node");
    console.log("contextNode", contextNode[0].id);
    console.log("context-menu a", this.id);
    //$(this).parent().removeClass("context-menu").hide();
    //contextNode.removeClass("context-node");
  });

  $("body").on("click", function(e) {
    let contextNode = $(".context-node");
    let contextMenu = $(".context-menu");
    if(contextNode.length > 0) {
      contextNode.removeClass("context-node");
      contextMenu.removeClass("context-menu");
    };
    //console.log("body", e);
  });
});

function LoadBookmarks(input) {
  let file = input.files[0];
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onloadend = function () {
  let operaBookmarksAll = JSON.parse(reader.result);
      let operaBookmarks = operaBookmarksAll.roots.custom_root.speedDial.children[0].children;
      console.log(operaBookmarks);
      let row ;
      for (var i=0; i < operaBookmarks.length; i++) {
          let bookMark = operaBookmarks[i];
          if (!(i % 6) )
            row = $('<div/>', {
                class: 'row' 
            }).appendTo('#opera-bookmark-container');

          let col_sm_2 = $('<div/>', {
              class: 'col-sm-2' 
          }).appendTo(row);

          let panel_primary = $('<div/>', {
              class: 'panel panel-primary' 
          }).appendTo(col_sm_2);

          let panel_heading = $("<div class='panel-heading-bookmarks'>"+ bookMark.name +"</div>").appendTo(panel_primary);  

          var panel_body = $('<div/>', {
                  class: 'panel-body-bookmarks',
                  "data-toggle": "modal",
                  "data-target": "#myModal"
              }).appendTo(panel_primary);

          for (let j=0; j < bookMark.children.length; j++) {
              let bMChildren = bookMark.children[j];

              let a = $('<a/>', {
                  href: bMChildren.url
              }).appendTo(panel_body);

              let display = j < 4 ? "inline-block;" : "none;";
               
              let img = $('<img/>', {
                  id: 'img-' + i + "/" + j,
                  src: bMChildren.meta_info?.imageData,
                  style: "padding: 3px; width: 50%; display:" + display,
                  href: bMChildren.url,
                  display: j < 4 ? "true" : "none"
              }).appendTo(a);
          };
      };
  };
};