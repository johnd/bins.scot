function showPage(id) {
  let page=document.getElementById(id);
  page.style.display="";
}

function hidePage(id) {
  let page=document.getElementById(id);
  page.style.display="none";
}


function submitPostCode() {
  showPage("loading");
  alert('beep doop, getting postcode data');
  hidePage("loading");
  hidePage("postcode");
  showPage("pickhouse");
}
let postcodebuttons=document.getElementsByClassName("postcodebutton");
for (const postcodebutton of postcodebuttons) {
  postcodebutton.onclick = submitPostCode;
}

function resetUPRN() {
  alert('beep boop what uprn?');
}
let resetbuttons=document.getElementsByClassName("resetbutton");
for (const resetbutton of resetbuttons) {
  resetbutton.onclick = resetUPRN;
}

function getStarted() {
  hidePage("start");
  showPage("postcode");
}
document.getElementById("getstarted").onclick = getStarted;


let uprn=0;

function welcomePage(uprn) {
  if (uprn == 0) {
    hidePage("loading");
    showPage("start");
  } else {
    alert("getting bin data");
    hidePage("loading");
    showPage("showbins");
  }
}

welcomePage(uprn);
