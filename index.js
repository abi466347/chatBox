
let messages = [];
let selectedImage = null;
console.log(messages)

function sendmessage() {
  let input = document.getElementById("input-value");
  let text = input.value.trim();

  if (text !== "") {
    messages.push({ type: "text", content: text })
    rendermessage();
    input.value = "";
  }
  if (selectedImage) {
    messages.push({ type: "img", content: selectedImage });
    rendermessage();
    selectedImage = null;
    document.getElementById("image-preview").innerHTML = "";
  }
}


function imagePicker() {
  let imageinput = document.getElementById("image-input")
  imageinput.click();
  imageinput.onchange = () => {
    let file = imageinput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        selectedImage = reader.result;
        showimagepreview()
      };
      reader.readAsDataURL(file);
    }
  }
}

function showimagepreview() {
  let previewcontainer = document.getElementById("image-preview");

  if (selectedImage) {
    let img = document.createElement("img");
    img.src = selectedImage;
    img.className = "preview-image";
    previewcontainer.appendChild(img);
  }
}

function rendermessage() {
  let chatbox = document.getElementById("chat-box")
  chatbox.innerHTML = "";

  if (messages.length === 0) {
    let startconversation = document.createElement("div")
    startconversation.textContent = "Start a Conversation"
    startconversation.className = "start-conversation";
    chatbox.appendChild(startconversation);
    return;
  }

  messages.forEach((message, index) => {
    let msgcontainer = document.createElement("div")
    if (message.type === "text") {
      msgcontainer.className = "message-box"
    } else if (message.type === "img") {
      msgcontainer.className = "image-box"
    }


    let msg;
    if (message.type === "text") {
      msg = document.createElement("span");
      msg.textContent = message.content;
      msg.className = "msg-edit"
    }

    else if (message.type === "img") {
      msg = document.createElement("img");
      msg.src = message.content;
      msg.className = "msg-image"
    }

    let iconContainer = document.createElement("div")
    iconContainer.className = "icon-container"

    if (message.type === "text") {
      let editicon = document.createElement("i")
      editicon.className = "bi bi-pencil-square edit-icon"

      editicon.onclick = () => {
        msg.setAttribute("contenteditable", "true");
        msg.focus()

        msgcontainer.style.maxWidth = "60%";
        iconContainer.style.display="flex"
        iconContainer.style.gap="5px"

        let tickicon = document.createElement("i")
        tickicon.className = "bi bi-check2-circle action-icon"
        tickicon.onclick = () => {
          let newtext = msg.textContent.trim();
          if (newtext !== "") {
            messages[index].content = newtext;
          }
          msg.setAttribute("contenteditable", "false");

          msgcontainer.style.maxWidth = "";
          resetIcons()
          iconContainer.style.display="";
        }

        let cancelicon = document.createElement("i")
        cancelicon.className = "bi bi-x-circle action-icon"
        cancelicon.onclick = () => {
          msg.textContent = messages[index].content;
          msg.setAttribute("contenteditable", "false");

          msgcontainer.style.maxWidth = "";
          resetIcons();
          iconContainer.style.display=""
        };

        function resetIcons() {
          iconContainer.innerHTML = ""
          iconContainer.appendChild(editicon)
          iconContainer.appendChild(deleteicon)
        }

        iconContainer.innerHTML = "";
        iconContainer.appendChild(tickicon);
        iconContainer.appendChild(cancelicon);
      }
      iconContainer.appendChild(editicon)
    };

    let deleteicon = document.createElement("i")
    deleteicon.className = "bi bi-trash delete-icon"
    deleteicon.onclick = () => {
      messages.splice(index, 1)
      rendermessage();
    }
    iconContainer.appendChild(deleteicon)

    msgcontainer.appendChild(iconContainer)
    msgcontainer.appendChild(msg)
    chatbox.appendChild(msgcontainer)
  })
}
document.getElementById("input-value").addEventListener("keydown", (e) => {
  if (e.key == "Enter") sendmessage()
});

function threedot() {
  let dropdown = document.getElementById("dropdown-menu");

  if (dropdown.style.display === "none" || dropdown.style.display === "") {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
}

function clearchat() {
  messages = [];
  document.getElementById("chat-box").innerHTML = ""
  document.getElementById("image-preview").innerHTML = ""

  document.getElementById("dropdown-menu").style.display = "none";
  rendermessage();
}

window.onload = () => {
  document.getElementById("dropdown-menu").style.display = "none";
};

document.addEventListener("DOMContentLoaded", () => {
  rendermessage(); 
});