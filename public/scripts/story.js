function populateStory() {

   let story = JSON.parse(localStorage.getItem("current-story"));
   let storyElement = document.createElement("div");
   storyElement.classList.add("story");

   // Create title element
   let titleElement = document.createElement("h2");
   titleElement.classList.add("storyTitle");
   titleElement.innerHTML = story.title;

   // Create content element
   let paragraph = document.createElement("p");

   paragraph.classList.add("storyContent");
   paragraph.innerHTML = story.content;

   storyElement.appendChild(titleElement);
   storyElement.appendChild(paragraph);
   // storiesElement.appendChild(storyElement);
   document.getElementById("story").appendChild(storyElement)
}


populateStory()