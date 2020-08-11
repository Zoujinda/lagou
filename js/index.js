function userOnblur() {
  var getUser = document.getElementsByName("username");
  var getUsernull = document.getElementsByClassName("usernull");
  if (getUser.value == '' || getUser.value == undefined) {
    getUsernull[0].style.display = "block";
  } else {
    getUsernull[0].style.display = "none";
  }
}

function userOnfocus() {
  var getUsernull = document.getElementsByClassName("usernull");
  getUsernull[0].style.display = "none";
}

function passOnblur() {
  var getPass = document.getElementsByName("password");
  var getPassnull = document.getElementsByClassName("passnull");
  if (getPass.value == '' || getPass.value == undefined) {
    getPassnull[0].style.display = "block";
  } else {
    getPassnull[0].style.display = "none";
  }
}

function passOnfocus() {
  var getPassnull = document.getElementsByClassName("passnull");
  getPassnull[0].style.display = "none";
}

function gotoOnclick(node) {
  node.onclick = function () {
    window.location.href = "login.html";
    return false;
  }
}

function hideOnclick(clickBtn, positionBox, searchBox, centerBox) {
  clickBtn[0].onclick = function (ev) {
    ev.preventDefault();
    searchBox.style.display = "none";
    centerBox.style.display = "none";
    positionBox.style.display = "block";
    if (clickBtn[0].parentNode.classList.contains("active") == false) {
      clickBtn[0].parentNode.classList.add("active");
      clickBtn[1].parentNode.classList.remove("active");
      clickBtn[2].parentNode.classList.remove("active");
    }
  }
  clickBtn[1].onclick = function (ev) {
    ev.preventDefault();
    centerBox.style.display = "none";
    positionBox.style.display = "none";
    searchBox.style.display = "block";
    if (clickBtn[1].parentNode.classList.contains("active") == false) {
      clickBtn[1].parentNode.classList.add("active");
      clickBtn[2].parentNode.classList.remove("active");
      clickBtn[0].parentNode.classList.remove("active");
    }
  }
  clickBtn[2].onclick = function (ev) {
    ev.preventDefault();
    searchBox.style.display = "none";
    positionBox.style.display = "none";
    centerBox.style.display = "block";
    if (clickBtn[2].parentNode.classList.contains("active") == false) {
      clickBtn[2].parentNode.classList.add("active");
      clickBtn[0].parentNode.classList.remove("active");
      clickBtn[1].parentNode.classList.remove("active");
    }
  }
}