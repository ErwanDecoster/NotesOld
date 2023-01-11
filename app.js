let body = document.querySelector('body');
let h1 = document.querySelector('h1');
window.addEventListener('scroll', () => {
  if ((scrollY > 0)&&(scrollY < 160)) {
    h1.style.padding = `${80 - scrollY/2}px`;
    h1.style.boxShadow = '0 2px 4px #00000050';
    h1.style.borderRadius = '0 0 20px 20px';
  }
  else if (scrollY > 160) {
    h1.style.padding = '0';
  }
  else if (scrollY == 0) {
    h1.style.padding = "80px 0";
    h1.style.boxShadow = 'none';
    h1.style.borderRadius = '0';
  }
})
function adapteColorContast(hexcolor) {
	// If a leading # is provided, remove it
	if (hexcolor.slice(0, 1) === '#') {
		hexcolor = hexcolor.slice(1);
	}
	// Convert to RGB value
	var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);
	// Get YIQ ratio
	var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
	// Check contrast
	return (yiq >= 128) ? '#111' : 'white';
};
let notes = document.querySelectorAll('.note');
notes.forEach((note) => {
  note.addEventListener('click', () => {
    ul = note.querySelector('ul')
    noteInformation = note.getBoundingClientRect();
    ulInformation = ul.getBoundingClientRect();
    if (note.classList[1] == "checklist") {
      if (event.clientY - noteInformation.top < ulInformation.top - noteInformation.top) {
        noteEdit(note)
      }
      else if (event.clientY - noteInformation.top > ulInformation.top - noteInformation.top + ulInformation.height) {
        noteEdit(note)
      }
      else if ((event.clientX - noteInformation.left >= 45) ) {
        noteEdit(note)
      }
    }
    else if (note.classList[1] != "checklist") {
      noteEdit(note)
    }
  })
});
function changeColor(color) {
  let note = document.querySelector('.edited');
  // let note = document.querySelector('.edited');
  // console.log(color);
  note.style.backgroundColor = color;
  note.style.color = adapteColorContast(color);
}
function noteSettingtAddItem(buttonName, buttonColor, position) {
  let noteSetting = document.querySelector('.note_setting');
  let button = document.createElement('button');
  if (buttonName == "colorChange") {
    let span = document.createElement('span');
    button.setAttribute('onclick',`changeColor("${buttonColor}")`);
    button.classList = "change_color_button";
    span.style.backgroundColor = `${buttonColor}`;
    button.appendChild(span);
  }
  else{
    let image = document.createElement('img');
    button.setAttribute('onclick',`${buttonName}SettingItem()`);
    image.setAttribute('src',`ressources/icones/${buttonName}.svg`);
    button.appendChild(image);
  }
  button.style.transform = "scale(0)";
  delay = position * 30;
  setTimeout( function() {button.style.transform = "scale(1)"}, delay );
  noteSetting.appendChild(button);
}
let noteEditStatu = false;
function noteEdit(note) {
  if (noteEditStatu == false) {
    note.classList.add("edited");
    let noteSetting = document.createElement('div');
    noteSetting.classList = "note_setting";
    note.appendChild(noteSetting);

    let noteSettingChilds = document.querySelector('.note_setting').childNodes
    for (var i = 0; i < noteSettingChilds.length; i++) {
      noteSettingChilds[i].remove()
    }
    noteSettingtAddItem("palette", "", 1);
    noteSettingtAddItem("delete", "", 2);
    setTimeout( function() {noteSetting.style.transform = "translateY(0%)"}, 0 );
    noteEditStatu = true;

    let h1 = document.querySelector('h1')
    h1.setAttribute('onclick',`backZoneClick()`);
    let h2 = note.querySelector('h2')
    h2.setAttribute('contentEditable',`true`);

    let backZone = document.createElement('div');
    backZone.classList = "back_zone";
    backZone.setAttribute('onclick',`backZoneClick()`);

    body.appendChild(backZone)
    noteLi = note.querySelectorAll('li');

    if (note.classList[1] == "checklist") {
      for (var i = 0; i < noteLi.length; i++) {
        let label = noteLi[i].querySelector('label')
        label.setAttribute('contentEditable',`true`);
      }
      note.querySelector('ul').insertAdjacentHTML("beforeend", '<li class="newElement"><input id="2_5" type="checkbox" name="" value=""><label class="text">Nouvel element</label><svg viewBox="0 0 121 98" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="29" width="67" height="67" rx="22" fill="white" stroke="black" stroke-width="4"/><path d="M21 56C21 56 31 65.5 34.5 72.5C50 45.5 76 34 76 34" stroke="#50D876" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M83.1515 19.0165C91.5729 11.7825 96.4743 4.21773 96.4743 4.21773M93.6132 35.4117C104.251 31.7952 113.353 32.4377 113.353 32.4377M89.0436 26.6015L105.925 16.2566" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></li>')
      note.querySelector('.newElement label').setAttribute('contentEditable',`true`);
    }
    else {
      for (var i = 0; i < noteLi.length; i++) {
        noteLi[i].setAttribute('contentEditable',`true`);
      }
    }
  }
}
function deleteSettingItem() {
  document.querySelector('.note_setting').remove();
  document.querySelector('.back_zone').remove();
  document.querySelector('h1').removeAttribute("onclick");
  let note = document.querySelector('.edited');
  note.remove()
  setTimeout( function() {noteEditStatu = false;}, 100 );
}
function paletteSettingItem() {
  let noteSetting = document.querySelector('.note_setting');
  // noteSettingChilds.forEach((child) => {
  //   console.log("child");
  //   child.remove();
  // });
  // noteSetting.forEach((child) => {
  //   child.remove();
  // });
  // for (var i = 0; i < noteSettingChilds.length; i++) {
  //   noteSettingChilds[i].remove()
  //   console.log(noteSettingChilds[i]);
  // }
  noteSettingtAddItem("colorChange", "#F25C54", 1);
  noteSettingtAddItem("colorChange", "#0F7173", 2);
  noteSettingtAddItem("colorChange", "#F4D35E", 3);
  noteSettingtAddItem("colorChange", "#E8C7DE", 4);
  noteSettingtAddItem("colorChange", "#42E2B8", 5);
  noteSettingtAddItem("colorChange", "#5E4AE3", 6);
  noteSettingtAddItem("colorChange", "#9CF6F6", 7);
  noteSettingtAddItem("colorChange", "#4ECDC4", 8);
  noteSettingtAddItem("colorChange", "#F7FFF7", 9);
  noteSettingtAddItem("colorChange", "#E88D67", 10);
  noteSettingtAddItem("colorChange", "#F45B69", 11);
  noteSettingtAddItem("colorChange", "#456990", 12);

}
function backZoneClick() {
  if (noteEditStatu) {
    let note = document.querySelector('.edited');
    document.querySelector('h1').removeAttribute("onclick");
    let h2 = note.querySelector('h2')
    h2.setAttribute('contentEditable',`false`);

    if (note.classList[1] == "checklist") {
      for (var i = 0; i < noteLi.length; i++) {
        let label = document.createElement('label')
        label.removeAttribute("contentEditable");
      }
    }
    else {
      for (var i = 0; i < noteLi.length; i++) {
        noteLi[i].removeAttribute("contentEditable");
      }
    }
    note.classList.remove('edited')
    document.querySelector('.note_setting').remove();
    document.querySelector('.back_zone').remove();
    noteEditStatu = false;
  }
}
let navbarLi = document.querySelectorAll('nav ul li');
let navbarUl = document.querySelector('nav ul');
let severalNotesButton = document.querySelector('#several_notes');
let profilsButton = document.querySelector('#profils');
let addNoteButton = document.querySelector('#add_note');

function creatButton(buttonName, position) {
  let li = document.createElement('li');
  let button = document.createElement('button');
  let image = document.createElement('img');
  button.id = `${buttonName}`;
  button.setAttribute('onclick',`${buttonName}ButtonClick()`)
  image.setAttribute('src',`ressources/icones/${buttonName}.svg`)
  button.appendChild(image)
  li.appendChild(button)
  li.style.transform = "scale(0)";
  delay = position * 30;
  setTimeout( function() {li.style.transform = "scale(1)"}, delay );

  navbarUl.prepend(li);
  navbarLi = document.querySelectorAll('nav ul li');
}
function several_notesButtonClick() {
  navbarLi.forEach((li) => {
    li.remove();
  });
  creatButton('several_note', 4);
  creatButton('several_note', 3);
  creatButton('several_note', 2);
  creatButton('back', 1);
}
function backButtonClick() {
  navbarLi.forEach((li) => {
    li.remove();
  });
  creatButton('add_note', 3);
  creatButton('profil', 2);
  creatButton('several_notes', 1);
}
function add_noteButtonClick() {
  navbarLi.forEach((li) => {
    li.remove();
  });
  creatButton('note_list', 4);
  creatButton('checklist', 3);
  creatButton('list', 2);
  creatButton('back', 1);
}
