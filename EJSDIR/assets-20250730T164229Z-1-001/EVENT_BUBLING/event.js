let btn = document.querySelector("button");
let ul = document.querySelector("ul");
let inp = document.querySelector("input");

function addItem() {
    if (inp.value.trim() !== "") {
        let item = document.createElement("li");
        item.innerText = inp.value;

        // Create delete button
        let delBtn = document.createElement("button");
        delBtn.innerText = "Delete";
        delBtn.classList.add("delete");

        // Delete functionality
        delBtn.addEventListener("click", function () {
            item.remove(); // or: this.parentElement.remove();
            console.log("element deleted");
        });

        item.appendChild(delBtn);
        ul.appendChild(item);
        inp.value = "";
    }
}

// Add item on button click
btn.addEventListener("click", addItem);

// Add item on pressing Enter key
inp.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addItem();
    }
});


