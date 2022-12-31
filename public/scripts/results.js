// This file assumes that the "search-results" localStorage item was set
// to an array of stories returned from the database

function populateStories() {

    let stories = JSON.parse(localStorage.getItem("search-results")).searchStories;

    if (stories.length == 0) {
        // This happens when a country with no stories is clicked
        document.getElementById("search-results").innerHTML = "There are no stories associated with this country yet... I don't know, that's what Tanner said anyway."
    } else {
        let storiesElement = document.getElementById("search-results")
        for (const i in stories) {
            const story = stories[i];

            // Create story element
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

            let viewStory = document.createElement("button");
            viewStory.innerHTML = 'View Story'
            console.log(story)
            viewStory.addEventListener('click', () => { storyPage(story) })

            // Append all the children to the story
            storyElement.appendChild(titleElement);
            storyElement.appendChild(paragraph);
            storyElement.appendChild(viewStory)


            // Append the story to the stories list
            storiesElement.appendChild(storyElement);
        }
    }
}

function storyPage(story) {
    localStorage.setItem("current-story", JSON.stringify(story))
    window.location.href = '../views/story.html';
}

populateStories();