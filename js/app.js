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
var validImageTypes = ["image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/bmp", "image/tiff"];
var validImageExtn = ["gif", "jpg", "png", "svg", "bmp", "tiff"];

window.addEventListener("load", onLoad);
window.addEventListener("resize", onResize);

function onLoad(event) {
  resetSRItemsSize();
}

function onResize(event) {
  resetSRItemsSize();
}

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
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
  document.querySelector("#file_name").innerText = "";
  document.querySelector("#file_size").innerText = "";
  document.querySelector("#prev_img_box").setAttribute("src", "");
}

function imgInputChange(event) {
  var file = event.files[0];
  var fileName = file.name;
  var fileExt = fileName.split(".").pop();
  var fileType = file.type;
  var fileSize = file.size;
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
    document.querySelector("#file_name").innerText = fileName;
    document.querySelector("#file_size").innerText = getReadableSize;
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
  if (e.dataTransfer.files) {
    if (e.dataTransfer.files.length > 1) {
      querySelectorAll("drag_zone", "backgroundColor", "#dde5eaaa");
      querySelectorAll("drag_zone", "borderColor", "#aaa");
      alert("Only single file allowed");
      return false;
    } else if (e.dataTransfer.files.length === 1 && e.dataTransfer.items.length > 1) {
      let file = e.dataTransfer.files[0];
      let getReadableSize = bytesToSize(file.size);
      if (validImageTypes.indexOf(file.type) < 0) {
        querySelectorAll("drag_zone", "backgroundColor", "#dde5eaaa");
        querySelectorAll("drag_zone", "borderColor", "#aaa");
        alert("Only image types allowed");
        return false;
      } else {
        file.webUrl = /src="?([^"\s]+)"?\s*/.exec(e.dataTransfer.getData("text/html"))[1];
        document.querySelector("#imgInput").files = e.dataTransfer.files;
        document.querySelector("#prev_img_box").setAttribute("src", file.webUrl);
        document.querySelector("#txtUrlSearch").value = file.webUrl;
        document.querySelector("#file_name").innerText = file.name;
        document.querySelector("#file_size").innerText = getReadableSize;
        // document.querySelector("#file_name").style.display = "block";
        document.querySelector("#file_size").style.display = "block";
        querySelectorAll("prev_outer_box", "display", "flex");
        querySelectorAll("drag_zone", "display", "none");
        return;
      }
    } else if (e.dataTransfer.files.length === 1 && e.dataTransfer.items.length === 1) {
      let file = e.dataTransfer.files[0];
      var fileName = file.name;
      var fileExt = fileName.split(".").pop();
      var fileType = file.type;
      var fileSize = file.size;
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
        document.querySelector("#imgInput").files = e.dataTransfer.files;
        let getReadableSize = bytesToSize(fileSize);
        document.querySelector("#txtUrlSearch").value = "";
        document.querySelector("#txtKeywordSearch").value = "";
        document.querySelector("#file_name").innerText = fileName;
        document.querySelector("#file_size").innerText = getReadableSize;
        // document.querySelector("#file_name").style.display = "block";
        document.querySelector("#file_size").style.display = "block";
        reader.onload = function (rdr) {
          document.querySelector("#prev_img_box").setAttribute("src", rdr.target.result);
          querySelectorAll("prev_outer_box", "display", "flex");
          querySelectorAll("drag_zone", "display", "none");
        };
        reader.readAsDataURL(file);
      }
    } else {
      querySelectorAll("drag_zone", "backgroundColor", "#dde5eaaa");
      querySelectorAll("drag_zone", "borderColor", "#aaa");
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
  querySelectorAll("drag_zone", "borderColor", "#038970");
}

function closeImage() {
  resetImage();
  document.querySelector("#file_name").style.display = "none";
  document.querySelector("#file_size").style.display = "none";
  querySelectorAll("drag_zone", "backgroundColor", "#dde5eaaa");
  querySelectorAll("drag_zone", "borderColor", "#aaa");
  querySelectorAll("drag_zone", "display", "flex");
  querySelectorAll("prev_outer_box", "display", "none");
}

async function isValidUrlImage(urlImageStr = "") {
  let image = new Image();
  image.src = urlImageStr;
  return await new Promise((resolve) => {
    image.onload = function () {
      if (image.height === 0 || image.width === 0) {
        resolve(false);
        return;
      }
      resolve(true);
    };
    image.onerror = () => {
      resolve(false);
    };
  });
}

function getExtensionFromUrl(url) {
  return url.split(/[#?]/)[0].split(".").pop().trim();
}

function validateUrl(url = "") {
  try {
    let urlObj = new URL(url);
    let urlRgx =
      /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    if (!urlRgx.test(url)) {
      throw new Error("Invalid URL");
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

function generateRandomString(strLen = 5) {
  let charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = Array.apply(null, Array(strLen))
    .map(() => {
      return charSet.charAt(Math.floor(Math.random() * charSet.length));
    })
    .join("");
  return randomString;
}

function urlToFile(url, filename, mimeType) {
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType });
    });
}

function searchSimilar() {
  var previewImage = document.querySelector("#prev_img_box").getAttribute("src");
  var urlValue = document.querySelector("#txtUrlSearch").value;
  var keywordValue = document.querySelector("#txtKeywordSearch").value;
  if (previewImage || urlValue || keywordValue) {
    if (urlValue) {
      if (urlValue.startsWith("data:")) {
        isValidUrlImage(urlValue)
          .then((result) => {
            if (result) {
              imgInputFile = getImgInputFile();
              if (imgInputFile) {
                uploadImage(imgInputFile);
              } else {
                let mimeType = urlValue.split(":")[1].split(";")[0];
                let mimeIndex = validImageTypes.indexOf(mimeType);
                let fileExt = validImageExtn[mimeIndex];
                urlToFile(urlValue, `${generateRandomString(8)}.${fileExt}`, mimeType).then(function (file) {
                  uploadImage(file);
                });
              }
              return;
            } else {
              alert("File is Invalid or Unsupported");
              return;
            }
          })
          .catch((e) => console.log(e));
        return;
      } else {
        if (validateUrl(urlValue)) {
          isValidUrlImage(urlValue)
            .then((result) => {
              if (result) {
                setupSearchLinks(urlValue, "imagesearch");
                setPartsDisplay("none", "flex", "block");
                return;
              } else {
                alert("File is Invalid or Unsupported");
                return;
              }
            })
            .catch((e) => console.log(e));
        } else {
          alert("Invalid URL");
          return;
        }
      }
    } else if (keywordValue) {
      setupSearchLinks(keywordValue, "keywordsearch");
      setPartsDisplay("none", "flex", "none");
    } else if (previewImage) {
      if (!imgInputFile) {
        imgInputFile = getImgInputFile();
        uploadImage(imgInputFile);
      } else {
        uploadImage(imgInputFile);
      }
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
  document.querySelector("#file_name").innerText = "";
  document.querySelector("#file_size").innerText = "";
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
  querySelectorAll("drag_zone", "display", "flex");
  querySelectorAll("drag_zone", "backgroundColor", "#dde5eaaa");
  querySelectorAll("drag_zone", "borderColor", "#aaa");
  querySelectorAll("part_1", "display", "flex");
  querySelectorAll("part_2", "display", "none");
  return;
}

function resetSRItemsSize() {
  try {
    let sr_item = document.querySelectorAll(".sr_item");
    let visible_sr_item_count = 0;
    let max_width_sr_item = sr_item[0].scrollWidth;
    for (let i = 0; i < sr_item.length; i++) {
      let sr_item_display = sr_item[i].style.display
        ? sr_item[i].style.display
        : getComputedStyle(sr_item[i], null).display;
      if (sr_item_display !== "none") {
        visible_sr_item_count++;
      }
    }
    for (let i = 0; i < sr_item.length; i++) {
      if (visible_sr_item_count % 3 !== 0) {
        if (i > 0) {
          if (getWidth() > 768) {
            sr_item[i].style.maxWidth = max_width_sr_item + "px";
          } else {
            sr_item[i].style.maxWidth = "none";
          }
        }
      }
    }
    return;
  } catch (err) {
    console.log(err);
  }
}

function respondToVisibility(element, callback) {
  var options = {
    root: document.documentElement,
  };

  var observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      callback(entry.intersectionRatio > 0);
    });
  }, options);

  observer.observe(element);
}

document.addEventListener("DOMContentLoaded", function (event) {
  try {
    respondToVisibility(document.querySelector(".prev_outer_box"), (visible) => {
      let part_2Display = document.querySelector(".part_2").style.display
        ? document.querySelector(".part_2").style.display
        : getComputedStyle(document.querySelector(".part_2"), null).display;
      if (visible) {
        document.querySelector("#urlkeyword").style.display = "none";
      } else if (!visible && part_2Display === "none") {
        document.querySelector("#urlkeyword").style.display = "flex";
      }
    });
  } catch (err) {
    console.log(err);
  }
});
