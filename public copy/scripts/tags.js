//getting the tags from the form
const ul = document.getElementById("add-tags").querySelector("ul");
let input = ul.querySelector("input");

let tags = [];

function createTag(){
    //remove all li tags before adding so there will be no duplicate tags
    ul.querySelectorAll("li").forEach(li => li.remove());
    tags.slice().reverse().forEach(tag => {
        let liTag = `<li>${tag} <img class="x" src="../images/x.png" onclick="remove(this, '${tag}')"></li>`;
        ul.insertAdjacentHTML("afterbegin", liTag); //inserting or adding li insite ul tag
    });
}
    function remove(element, tag){
        let index = tags.indexOf(tag);
        tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
        element.parentElement.remove();
    }

function addTag(e){
    if(e.key == "Enter"){
        let tag = e.target.value.replace(/\s+/g, ' '); //removing unwanted spaces
        if(tag.length > 1 && !tags.includes(tag)){
            tag.split(',').forEach(tag => {
                tags.push(tag);
                createTag();
            });
        }e.target.value ="";
    }
}

input.addEventListener("keyup", addTag);
console.log(tags);