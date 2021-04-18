function setSupervisor() {

    document.getElementById("currSup").innerHTML = document.getElementById("input").value;
    localStorage.setItem("sup", document.getElementById("input").value);
    console.log("supervisor changed")
    return;

}

function getSupervisor() {

    document.getElementById("currSup").innerHTML = localStorage.getItem("sup");

    console.log("supervisor fetched");
    return;

}

function setCap() {
    localStorage.setItem("cappy", document.getElementById("cap").value);
    console.log("cap set" + document.getElementById("cap").value);
    return;

}

function setOcc() {
    localStorage.setItem("occ", document.getElementById("occ").value);
    console.log("occ set" + document.getElementById("occ").value);
    return;

}

function addOption(name) {
    newOption = document.createElement('option');
    newOption.innerHTML = name;
    newOption.value = name;
    document.getElementById("input").insertAdjacentElement('beforeend', newOption)
}






