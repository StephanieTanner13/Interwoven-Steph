const getPublicProfile = async () => {
    fetch(
        `${location.protocol}//${
            location.host
        }/profile?userId=${window.localStorage.getItem('userId')}`
    )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            createForm();
            displayFirstName(data.first_name);
            displayLastName(data.last_name);
            displayEmail(data.email);
            displayApprovedStories(
                data.stories,
                data.first_name + ' ' + data.last_name
            );
            const ismod = window.localStorage.getItem('isMod');
            // getprofileUnapprovedStories(data.first_name + ' ' + data.last_name);
            if (ismod === 'true') {
                getUnaprovedStories();
            }
        });
    // fetch(
    //     `${location.protocol}//localhost:8080/story?creator=62032b37c911458572150e9f`
    // ).then((res) => res.json())
    //     .then((data) => {
    //         userStory = data;
    //     })
    // const data = await apiFetch('${location.protocol}//localhost:8080/interwoven');
    // displayAllData(data);
};

function getprofileUnapprovedStories(name) {
    fetch(`${location.protocol}//${location.host}/unaprovedStories`, {
        headers: {
            Authorization: `Bear ${window.localStorage.getItem('token')}`,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            displayUnapprovedStories(data.stories);
        });
}

getPublicProfile();

function getUnaprovedStories() {
    fetch(`${location.protocol}//${location.host}/admin/getNonApprovedPosts`, {
        headers: {
            Authorization: `Bear ${window.localStorage.getItem('token')}`,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            displayStoriesToBeApproved(data.stories);
            // displayApprovedStories(data.stories, name);
        });
}
// getUnaprovedStories();
function hideAdminStories() {
    console.log('hidding');
    const div = document.querySelector('#storyForApproval');
    div.style = 'display:none;';
}
function displayFirstName(name) {
    const span = document.querySelector('#userFirstname');
    span.textContent = name;
}
function displayLastName(name) {
    const span = document.querySelector('#userLastname');
    span.textContent = name;
}
function displayEmail(email) {
    const span = document.querySelector('#userEmail');
    span.textContent = email;
}
function displayAllData(data) {
    displayFirstName(data.firstName);
    displayLastName(data.lastName);
    displayEmail(data.userEmail);
}

function displayApprovedStories(storyList) {
    displayStoryList(storyList, '#approvedStories', false);
}
function displayUnapprovedStories(storyList) {
    displayStoryList(storyList, '#unapprovedStories', false);
}
function displayStoriesToBeApproved(storyList) {
    displayStoryList(storyList, '#storyForApproval', true);
}

function approveStory(storyId) {
    console.log('Approving story for ' + storyId);
    fetch(`${location.protocol}//${location.host}/admin/approveStory`, {
        method: 'POST',
        headers: {
            Authorization: `Bear ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ storyId: storyId }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            // displayApprovedStories(data.stories, name);
            location.reload();
        });
}
function displayStoryList(storyList, elementIdString, isForAprroval) {
    const approvedContainer = document.querySelector(elementIdString);
    console.log(storyList, elementIdString, isForAprroval, storyList.length);
    if (!storyList || storyList.length == 0) {
        approvedContainer.style = 'display:none;';
    }
    for (story of storyList) {
        const storyContainer = document.createElement('div');
        const approveButton = document.createElement('button');
        approveButton.textContent = 'Approve Story';
        approveButton.onclick = () => {
            approveStory(story._id);
        };
        const headerDiv = document.createElement('div');
        const nameHeader = document.createElement('h3');
        const nameSpan = document.createElement('span');
        const countryHeader = document.createElement('h3');
        const countrySpan = document.createElement('span');
        const storyContent = document.createElement('p');
        countrySpan.textContent = story.country_code;
        nameSpan.textContent =
            story.creator.first_name + ' ' + story.creator.last_name;
        nameHeader.textContent = 'Name: ';
        countryHeader.textContent = 'Country: ';
        nameHeader.appendChild(nameSpan);
        countryHeader.appendChild(countrySpan);
        storyContent.textContent = story.content;
        headerDiv.appendChild(nameHeader);
        headerDiv.appendChild(countryHeader);
        storyContainer.appendChild(headerDiv);
        storyContainer.appendChild(storyContent);
        if (isForAprroval) {
            storyContainer.appendChild(approveButton);
        }
        approvedContainer.appendChild(storyContainer);
    }
}
//password?
function submit(e) {
    e.preventDefault();
    const country = document.querySelector('#country').value;
    const story = document.querySelector('#story').value;
    const title = 'title';
    fetch(`${location.protocol}//${location.host}/story/addStory`, {
        method: 'POST',
        headers: {
            Authorization: `Bear ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            content: story,
            country_code: country,
        }),
    }).then((res) => {
        console.log(res);
        location.reload();
    });
    return false;
}

function createForm() {
    //case statement for the following:
    //display the profile with form to add a story + country + submit for review
    document.getElementById('profileSpecifics').innerHTML = `
        <h2>Submit Your Story</h2>
        <form id="form">
            <!-- country and story -->
            <select id="country" name="country" class="form-control" required>
                <option value="Select a Country">Select a Country</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Angola">Angola</option>
                <option value="Albania">Albania</option>
                <option value="United-Arab-Emirates">United Arab Emirates</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Burundi">Burundi</option>
                <option value="Belgium">Belgium</option>
                <option value="Benin">Benin</option>
                <option value="Burkina-Faso">Burkina Faso</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Bosnia-and-Herzegovina">Bosnia and Herzegovina</option>
                <option value="Belarus">Belarus</option>
                <option value="Belize">Belize</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Brazil">Brazil</option>
                <option value="Brunei-Darussalam">Brunei Darussalam</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Botswana">Botswana</option>
                <option value="Central-African-Republic">Central African Republic</option>
                <option value="Canada">Canada</option>
                <option value="Switzerland">Switzerland</option>
                <option value="China">China</option>
                <option value="Côte-d'Ivoire">Côte d'Ivoire</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Democratic-Republic-of-the-Congo">Democratic Republic of the Congo</option>
                <option value="Republic-of-Congo">Republic of Congo</option>
                <option value="Colombia">Colombia</option>
                <option value="Costa-Rica">Costa Rica</option>
                <option value="Cuba">Cuba</option>
                <option value="Czech-Republic">Czech Republic</option>
                <option value="Germany">Germany</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Denmark">Denmark</option>
                <option value="Dominican-Republic">Dominican Republic</option>
                <option value="Algeria">Algeria</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Finland">Finland</option>
                <option value="Gabon">Gabon</option>
                <option value="United-Kingdom">United Kingdom</option>
                <option value="Georgia">Georgia</option>
                <option value="Ghana">Ghana</option>
                <option value="Guinea">Guinea</option>
                <option value="The-Gambia">The Gambia</option>
                <option value="Guinea-Bissau">Guinea Bissau</option>
                <option value="Equatorial-Guinea">Equatorial Guinea</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guyana">Guyana</option>
                <option value="Honduras">Honduras</option>
                <option value="Croatia">Croatia</option>
                <option value="Haiti">Haiti</option>
                <option value="Hungary">Hungary</option>
                <option value="Indonesia">Indonesia</option>
                <option value="India">India</option>
                <option value="Ireland">Ireland</option>
                <option value="Iran">Iran</option>
                <option value="Iraq">Iraq</option>
                <option value="Iceland">Iceland</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Jordan">Jordan</option>
                <option value="Japan">Japan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Republic-of-Korea">Republic of Korea</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Lao-PDR">Lao PDR</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Liberia">Liberia</option>
                <option value="Libya">Libya</option>
                <option value="Sri-Lanka">Sri Lanka</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Latvia">Latvia</option>
                <option value="Morocco">Morocco</option>
                <option value="Moldova">Moldova</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Mexico">Mexico</option>
                <option value="Macedonia">Macedonia</option>
                <option value="Mali">Mali</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Malawi">Malawi</option>
                <option value="Namibia">Namibia</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Norway">Norway</option>
                <option value="Nepal">Nepal</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Panama">Panama</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Papua-New-Guinea">Papua New Guinea</option>
                <option value="Poland">Poland</option>
                <option value="Dem-Rep-Korea">Dem Rep Korea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Palestine">Palestine</option>
                <option value="Qatar">Qatar</option>
                <option value="Romania">Romania</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Western-Sahara">Western Sahara</option>
                <option value="Saudi-Arabia">Saudi Arabia</option>
                <option value="Sudan">Sudan</option>
                <option value="South-Sudan">South Sudan</option>
                <option value="Senegal">Senegal</option>
                <option value="Sierra-Leone">Sierra Leone</option>
                <option value="El-Salvador">El Salvador</option>
                <option value="Serbia">Serbia</option>
                <option value="Suriname">Suriname</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Sweden">Sweden</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Syria">Syria</option>
                <option value="Chad">Chad</option>
                <option value="Togo">Togo</option>
                <option value="Thailand">Thailand</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Timor-Leste">Timor Leste</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
                <option value="Somalia">Somalia</option>
                <option value="Kosovo">Kosovo</option>
                <option value="South-Africa">South Africa</option>
                <option value="New-Zealand">New Zealand</option>
                <option value="Chile">Chile</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Portugal">Portugal</option>
                <option value="Russia">Russia</option>
                <option value="Spain">Spain</option>
                <option value="France">France</option>
                <option value="United-States">United States</option>
                <option value="United-States-Virgin-Islands">United States Virgin Islands</option>
                <option value="French-Guiana">French Guiana</option>
                <option value="Aruba">Aruba</option>
                <option value="Anguilla">Anguilla</option>
                <option value="American-Samoa">American Samoa</option>
                <option value="Antigua-and-Barbuda">Antigua and Barbuda</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Saint-Barthélemy">Saint Barthélemy</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Barbados">Barbados</option>
                <option value="Comoros">Comoros</option>
                <option value="Cape-Verde">Cape Verde</option>
                <option value="Curaçao">Curaçao</option>
                <option value="Cayman-Islands">Cayman Islands</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Dominica">Dominica</option>
                <option value="Falkland-Islands">Falkland Islands</option>
                <option value="Faeroe-Islands">Faeroe Islands</option>
                <option value="Federated-States-of-Micronesia">Federated States of Micronesia</option>
                <option value="Grenada">Grenada</option>
                <option value="Guam">Guam</option>
                <option value="Saint-Kitts-and-Nevis">Saint Kitts and Nevis</option>
                <option value="Saint-Lucia">Saint Lucia</option>
                <option value="Saint-Martin">Saint Martin</option>
                <option value="Maldives">Maldives</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Malta">Malta</option>
                <option value="Northern-Mariana-Islands">Northern Mariana Islands</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Mauritius">Mauritius</option>
                <option value="New-Caledonia">New Caledonia</option>
                <option value="Nauru">Nauru</option>
                <option value="Palau">Palau</option>
                <option value="Puerto-Rico">Puerto Rico</option>
                <option value="French-Polynesia">French Polynesia</option>
                <option value="Solomon-Islands">Solomon Islands</option>
                <option value="São-Tomé-and-Principe">São Tomé and Principe</option>
                <option value="Sint-Maarten">Sint Maarten</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Turks-and-Caicos-Islands">Turks and Caicos Islands</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad-and-Tobago">Trinidad and Tobago</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Saint-Vincent-and-the-Grenadines">Saint Vincent and the Grenadines</option>
                <option value="British-Virgin-Islands">British Virgin Islands</option>
                <option value="Samoa">Samoa</option>
                <option value="Netherlands">Netherlands</option>
                <option value="St-Eustatius">Saint Eustatius</option>
                <option value="Saba">Saba</option>
                <option value="Martinique">Martinique</option>
                <option value="Canary-Islands">Canary Islands</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Reunion">Reunion</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Fiji">Fiji</option>
            </select>
            <textarea id="story" rows="20" cols="100"></textarea>
            <input id="submitButton" type="submit">
        </form>
        `;

    document.querySelector('#form').addEventListener('submit', submit, true);
}
