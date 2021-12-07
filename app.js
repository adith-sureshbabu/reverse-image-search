var isGoogleUrl = "https://www.google.com/searchbyimage?image_url=";
var isBingUrl = "https://www.bing.com/images/searchbyimage?FORM=IRSBIQ&cbir=sbi&imgurl=";
var isYandexUrl = "https://yandex.com/images/search?source=collections&rpt=imageview&url=";
var isTineyeUrl = "https://www.tineye.com/search/?&url=";
var isSogouUrl = "https://pic.sogou.com/ris?flag=1&drag=0&query=";
var isBaiduUrl = "https://graph.baidu.com/details?isfromtusoupc=1&tn=pc&carousel=0&image=";
var ksGoogleUrl = "https://www.google.com/search?hl=EN&tbm=isch&q=";
var ksBingUrl = "https://www.bing.com/images/search?q=";
var ksYandexUrl = "https://yandex.com/images/search?text=";
var ksSogouUrl = "https://pic.sogou.com/pics?query=";
var ksBaiduUrl = "https://image.baidu.com/search/index?tn=baiduimage&word=";
var imgInputFile = null;

window.addEventListener("load", onLoad);
window.addEventListener("resize", onResize);

function onLoad(event) {
  resetSRItemsSize();
}

function onResize(event) {
  resetSRItemsSize();
}

function querySelectorAll(className, styleAtt, value) {
  var x, i;
  x = document.querySelectorAll(`.${className}`);
  for (i = 0; i < x.length; i++) {
    x[i].style[`${styleAtt}`] = value;
  }
}

function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}

function getImgInputFile() {
  var imgInput = document.querySelector("#imgInput");
  return imgInput.files[0];
}

function clearFields(keep) {
  if (keep == "byKeyword") {
    document.querySelector("#txtUrlSearch").value = "";
    document.querySelector("#imgInput").value = "";
  } else if (keep == "byUrl") {
    document.querySelector("#txtKeywordSearch").value = "";
    document.querySelector("#imgInput").value = "";
  }
}

function resetImage() {
  document.querySelector("#imgInput").value = "";
  document.querySelector("#txtUrlSearch").value = "";
  document.querySelector("#txtKeywordSearch").value = "";
  document.querySelector("#file_name").innerHTML = "";
  document.querySelector("#file_size").innerHTML = "";
}

function imgInputChange(event) {
  var file = event.files[0];
  var fileName = file.name;
  var fileExt = fileName.split(".").pop();
  var fileType = file.type;
  var fileSize = file.size;
  var validImageTypes = ["image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/bmp", "image/tiff"];
  var reader = new FileReader();
  if (validImageTypes.indexOf(fileType) < 0) {
    resetImage();
    alert("Only image types allowed");
    return false;
  } else if (parseInt(fileSize, 10) > 20 * 1024 * 1024) {
    resetImage();
    alert("File size too big, max limit is 20MB");
    return false;
  } else {
    var getReadableSize = bytesToSize(fileSize);
    document.querySelector("#txtUrlSearch").value = "";
    document.querySelector("#txtKeywordSearch").value = "";
    document.querySelector("#file_name").innerHTML = fileName;
    document.querySelector("#file_size").innerHTML = getReadableSize;
    // document.querySelector("#file_name").style.display = "block";
    document.querySelector("#file_size").style.display = "block";
    reader.onload = function (rdr) {
      document.querySelector("#prev_img_box").setAttribute("src", rdr.target.result);
      querySelectorAll("prev_outer_box", "display", "flex");
      querySelectorAll("drag_zone", "display", "none");
    };
    reader.readAsDataURL(file);
  }
}

function onDrop(e) {
  e.preventDefault();
  if (e.dataTransfer.items) {
    if (e.dataTransfer.items.length > 1) {
      querySelectorAll("drag_zone", "backgroundColor", "#dde5eaaa");
      querySelectorAll("drag_zone", "borderColor", "#aaa");
      alert("Only single file allowed");
      return false;
    } else if (e.dataTransfer.items[0].kind === "file") {
      document.querySelector("#imgInput").files = e.dataTransfer.files;
      var file = e.dataTransfer.items[0].getAsFile();
      var fileName = file.name;
      var fileExt = fileName.split(".").pop();
      var fileType = file.type;
      var fileSize = file.size;
      var validImageTypes = ["image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/bmp", "image/tiff"];
      var reader = new FileReader();
      if (validImageTypes.indexOf(fileType) < 0) {
        resetImage();
        querySelectorAll("drag_zone", "backgroundColor", "#dde5eaaa");
        querySelectorAll("drag_zone", "borderColor", "#aaa");
        alert("Only image types allowed");
        return false;
      } else if (parseInt(fileSize, 10) > 20 * 1024 * 1024) {
        resetImage();
        querySelectorAll("drag_zone", "backgroundColor", "#dde5eaaa");
        querySelectorAll("drag_zone", "borderColor", "#aaa");
        alert("File size too big, max limit is 20MB");
        return false;
      } else {
        var getReadableSize = bytesToSize(fileSize);
        document.querySelector("#txtUrlSearch").value = "";
        document.querySelector("#txtKeywordSearch").value = "";
        document.querySelector("#file_name").innerHTML = fileName;
        document.querySelector("#file_size").innerHTML = getReadableSize;
        // document.querySelector("#file_name").style.display = "block";
        document.querySelector("#file_size").style.display = "block";
        reader.onload = function (rdr) {
          document.querySelector("#prev_img_box").setAttribute("src", rdr.target.result);
          querySelectorAll("prev_outer_box", "display", "flex");
          querySelectorAll("drag_zone", "display", "none");
        };
        reader.readAsDataURL(file);
      }
    }
  }
}

function onDragenter(e) {
  e.preventDefault();
  querySelectorAll("drag_zone", "backgroundColor", "#dde5eaaa");
  querySelectorAll("drag_zone", "borderColor", "#aaa");
}

function onDragleave(e) {
  e.preventDefault();
  querySelectorAll("drag_zone", "backgroundColor", "#dde5eaaa");
  querySelectorAll("drag_zone", "borderColor", "#aaa");
}

function onDragover(e) {
  e.preventDefault();
  querySelectorAll("drag_zone", "backgroundColor", "#fff");
  querySelectorAll("drag_zone", "borderColor", "#0373dd");
}

function closeImage() {
  resetImage();
  document.querySelector("#file_name").style.display = "none";
  document.querySelector("#file_size").style.display = "none";
  querySelectorAll("drag_zone", "backgroundColor", "#dde5eaaa");
  querySelectorAll("drag_zone", "borderColor", "#aaa");
  querySelectorAll("drag_zone", "display", "block");
  querySelectorAll("prev_outer_box", "display", "none");
}

function searchSimilar() {
  var previewImage = document.querySelector("#prev_img_box").getAttribute("src");
  var urlValue = document.querySelector("#txtUrlSearch").value;
  var keywordValue = document.querySelector("#txtKeywordSearch").value;
  if (previewImage && !imgInputFile) {
    imgInputFile = getImgInputFile();
  }
  if (previewImage || urlValue || keywordValue) {
    if (previewImage) {
      uploadImage(imgInputFile);
    } else if (urlValue) {
      setupSearchLinks(urlValue, "imagesearch");
      setPartsDisplay("none", "flex", "block");
    } else if (keywordValue) {
      setupSearchLinks(keywordValue, "keywordsearch");
      setPartsDisplay("none", "flex", "none");
    }
  } else {
    alert("Upload an image or paste any image url or type any keyword to start searching!");
  }
}

function uploadImage(file) {
  try {
    document.querySelector(".loader").style.display = "grid";
    document.querySelector(".container").style.display = "none";
    var data = new FormData();
    data.append("auth_token", "3562ece80429b257452186d68be77d5ba6340a5d");
    data.append("action", "upload");
    data.append("source", file);
    data.append("type", "file");
    data.append("expiration", "P1D");
    data.append("timestamp", Date.now().toString());
    fetch("https://imgbb.com/json", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((result) => {
        setupSearchLinks(result.image.display_url, "imagesearch");
        setPartsDisplay("none", "flex", "block");
        document.querySelector(".loader").style.display = "none";
        document.querySelector(".container").style.display = "flex";
        return;
      })
      .catch((err) => {
        console.log(err);
        document.querySelector(".loader").style.display = "none";
        document.querySelector(".container").style.display = "flex";
      });
  } catch (err) {
    console.log(err);
    document.querySelector(".loader").style.display = "none";
    document.querySelector(".container").style.display = "flex";
  }
}

function setupSearchLinks(searchValue, searchType) {
  document
    .querySelector("#googleUrl")
    .setAttribute("href", searchType == "imagesearch" ? isGoogleUrl + searchValue : ksGoogleUrl + searchValue);
  document
    .querySelector("#bingUrl")
    .setAttribute("href", searchType == "imagesearch" ? isBingUrl + searchValue : ksBingUrl + searchValue);
  document
    .querySelector("#yandexUrl")
    .setAttribute("href", searchType == "imagesearch" ? isYandexUrl + searchValue : ksYandexUrl + searchValue);
  document
    .querySelector("#tineyeUrl")
    .setAttribute("href", searchType == "imagesearch" ? isTineyeUrl + searchValue : "#");
  document
    .querySelector("#sogouUrl")
    .setAttribute("href", searchType == "imagesearch" ? isSogouUrl + searchValue : ksSogouUrl + searchValue);
  document
    .querySelector("#baiduUrl")
    .setAttribute("href", searchType == "imagesearch" ? isBaiduUrl + searchValue : ksBaiduUrl + searchValue);
  return;
}

function setPartsDisplay(part1, part2, tineyeBlock) {
  querySelectorAll("part_1", "display", part1);
  querySelectorAll("part_2", "display", part2);
  document.querySelector("#tineyeBlock").style.display = tineyeBlock;
  resetSRItemsSize();
  return;
}

function newSearch() {
  imgInputFile = null;
  document.querySelector("#imgInput").value = "";
  document.querySelector("#txtUrlSearch").value = "";
  document.querySelector("#txtKeywordSearch").value = "";
  document.querySelector("#file_name").innerHTML = "";
  document.querySelector("#file_size").innerHTML = "";
  document.querySelector("#file_name").style.display = "none";
  document.querySelector("#file_size").style.display = "none";
  document.querySelector("#googleUrl").setAttribute("href", "#");
  document.querySelector("#bingUrl").setAttribute("href", "#");
  document.querySelector("#yandexUrl").setAttribute("href", "#");
  document.querySelector("#tineyeUrl").setAttribute("href", "#");
  document.querySelector("#sogouUrl").setAttribute("href", "#");
  document.querySelector("#baiduUrl").setAttribute("href", "#");
  document.querySelector("#prev_img_box").setAttribute("src", "");
  querySelectorAll("prev_outer_box", "display", "none");
  querySelectorAll("drag_zone", "display", "block");
  querySelectorAll("drag_zone", "backgroundColor", "#dde5eaaa");
  querySelectorAll("drag_zone", "borderColor", "#aaa");
  querySelectorAll("part_1", "display", "flex");
  querySelectorAll("part_2", "display", "none");
  return;
}

function resetSRItemsSize() {
  var sr_item = document.querySelectorAll(".sr_item");
  var visible_sr_item_count = 0;
  for (let i = 0; i < sr_item.length; i++) {
    var sr_item_display = sr_item[i].style.display
      ? sr_item[i].style.display
      : getComputedStyle(sr_item[i], null).display;
    if (sr_item_display !== "none") {
      visible_sr_item_count++;
    }
  }
  var max_width_sr_item = sr_item[0].scrollWidth;
  for (let i = 0; i < sr_item.length; i++) {
    if (visible_sr_item_count % 3 !== 0) {
      if (i > 0) {
        sr_item[i].style.maxWidth = max_width_sr_item + "px";
      }
    }
  }
  return;
}
