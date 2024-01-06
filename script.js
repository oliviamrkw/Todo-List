var enterButton = document.getElementById("enter");
var input = document.getElementById("itemName");
var deadline = document.getElementById("deadline");
var ul = document.querySelector("ul");
var item = document.getElementsByTagName("li");

function inputLength(){
	return input.value.length;
} 

function deadlineLength(){
	return deadline.value.length;
} 

function listLength(){
	return item.length;
}

function createListElement() {
  var container = document.createElement("container");
	var li = document.createElement("li");
  var itemText = input.value;
  var imp = document.createElement("important");
  if (deadlineLength() > 0){
    itemText += " (" + deadline.value + ")";
  }
  li.appendChild(document.createTextNode(itemText));
  imp.appendChild(document.createTextNode("!"));
  container.appendChild(imp);
	container.appendChild(li);
	  
  ul.appendChild(container);
  
  imp.addEventListener('click', function(){
    if (!imp.classList.contains("done")){
      imp.classList.toggle("important");
      ul.insertBefore(container, ul.firstChild);
    }
  })
  
	input.value = ""; //Reset text input field
  deadline.value = "";

  ul.insertBefore(container, ul.firstChild);

	//START STRIKETHROUGH
	// because it's in the function, it only adds it for new items
	function crossOut() {
    li.classList.toggle("done");
    imp.classList.toggle("done");
    if (li.classList.contains("done")) {
        ul.appendChild(container);
    }
	}

	li.addEventListener("click",crossOut);
	//END STRIKETHROUGH


	// START ADD DELETE BUTTON
	var dBtn = document.createElement("button");
	dBtn.appendChild(document.createTextNode("X"));
	container.appendChild(dBtn);
	dBtn.addEventListener("click", deleteListItem);
	// END ADD DELETE BUTTON


	//ADD CLASS DELETE (DISPLAY: NONE)
	function deleteListItem(){
		container.classList.add("delete")
	}
	//END ADD CLASS DELETE
}


function addListAfterClick(){
	if (inputLength() > 0) { //makes sure that an empty input field doesn't create a li
		createListElement();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.which === 13) { 
		createListElement();
	} 
}


enterButton.addEventListener("click",addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);
deadline.addEventListener("keypress", addListAfterKeypress);