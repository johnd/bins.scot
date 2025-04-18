function showPage(id) {
  let page=document.getElementById(id);
  page.style.display="";
}

function hidePage(id) {
  let page=document.getElementById(id);
  page.style.display="none";
}


async function submitPostCode() {
  showPage("loading");
  const postcode = this.previousElementSibling.value
  const url = encodeURI('https://workers-playground-dark-field-e4ba.john-521.workers.dev/?postcode=' + postcode);
  const select = document.getElementById("address_results");

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();

    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }

    for (const address of json){
      select.insertAdjacentHTML("beforeend","<option value='" + address.value + "'>" + address.label + "</option>");
      select.parentElement.classList.remove("is-loading");
    }
  } catch (error) {
    console.error(error.message);
  }

  hidePage("loading");
  hidePage("postcode");
  showPage("pickhouse");
}
let postcodebuttons=document.getElementsByClassName("postcodebutton");
for (const postcodebutton of postcodebuttons) {
  postcodebutton.onclick = submitPostCode;
}
let postcodefields=document.querySelectorAll('[placeholder="Postcode"]');
for (const postcodefield of postcodefields) {
  postcodefield.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.nextElementSibling.click();
    }
  });
}

function resetUPRN() {
  localStorage.removeItem('uprn');
  window.location.reload();
}
let resetbuttons=document.getElementsByClassName("resetbutton");
for (const resetbutton of resetbuttons) {
  resetbutton.onclick = resetUPRN;
}

async function getBinDataFromID() {
  showPage("loading");
  const houseid = document.getElementById("address_results").value;
  const url = "https://super-dream-e5c7.john-521.workers.dev/?houseid=" + houseid;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    const uprn = json["property-UPRN"];
    localStorage.setItem("uprn", uprn);
    getBinData(uprn);
  } catch (error) {
    console.error(error.message);
  }

  hidePage("loading");
  hidePage("pickhouse");
  showPage("showbins");
}
document.getElementById("addresselectbutton").onclick = getBinDataFromID;

async function getBinData(uprn) {
  const url = "https://workers-playground-winter-silence-5b90.john-521.workers.dev/?uprn=" + uprn;
  const binDataHolder = document.getElementById("bindata");

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    const binData = json["tab_collections"];
    console.log(binData);

    for (const bin of binData) {
      let binColour = "";
      switch (bin.colour) {
        case "Grey":
          binColour = "has-background-grey-light";
          break;
        case "Brown":
          binColour = "has-background-warning-dark";
          break;
        case "Blue":
          binColour = "has-background-link";
          break;
        case "Green":
          binColour = "has-background-success";
          break;
      }
      const binHTML = `<article class="media">
  <figure class="media-left ${binColour}">
    <p class="image is-64x64">
      <img src="bin.svg" />
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        ${bin.date}
        <br />
        ${bin.type}
      </p>
    </div>
  </div>
</article>`
      binDataHolder.insertAdjacentHTML("beforeend",binHTML);
    }
  } catch (error) {
    console.error(error.message);
  }
  hidePage("loading");

}


function getStarted() {
  hidePage("start");
  showPage("postcode");
}
document.getElementById("getstarted").onclick = getStarted;


const uprn = localStorage.getItem("uprn");

function welcomePage(uprn) {
  if (uprn) {
    getBinData(uprn);
    showPage("showbins");
  } else {
    hidePage("loading");
    showPage("start");
  }
}

welcomePage(uprn);
