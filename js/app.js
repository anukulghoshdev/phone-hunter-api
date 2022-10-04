const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);

}

const displayPhones = (phones, dataLimit) => {
    // console.log(phones); //array[]

    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = ``;



    // display only 6 phones
    const showAllBtnDiv = document.getElementById('show-all-btn-div');
    if (dataLimit && phones.length > 6) {
        phones = phones.slice(0, 6);

        showAllBtnDiv.classList.remove('d-none');
    }
    else {
        showAllBtnDiv.classList.add('d-none');
    }



    // display no phone found messege
    const noPhoneMsg = document.getElementById('not-found-msg');
    if (phones.length === 0) {
        noPhoneMsg.classList.remove('d-none');
    }
    else {
        noPhoneMsg.classList.add('d-none');
    }



    // display all phones
    phones.forEach(phone => {
        // console.log(phone); // {phone}

        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div class="card p-4">
            <img src=" ${phone.image}" class="card-img-top" alt="..." >
            <div class="card-body">
                <h3 class="card-title">${phone.brand} ${phone.phone_name}</h3>
                <p class="card-text">This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit longer.</p>

                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>

            </div>
        </div>
        `;
        phonesContainer.appendChild(div);

    });


    // stop loader here
    toggleSpinner(false);
}



//common function - search button , show all button
const searchAndLoadPhoneFunCall = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    loadPhones(searchFieldValue, dataLimit);
}



// handle search btn click
document.getElementById('search-btn').addEventListener('click', function () {
    // console.log('search btn click');


    // start loader from here       //goes to common function - searchAndLoadPhoneFunCall()  
    /* toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    loadPhones(searchFieldValue); */

    searchAndLoadPhoneFunCall(6); // search e click korle data limit thakbe
})

// search input field key 'enter' handler
document.getElementById('search-field').addEventListener('keypress', function (e) {

    if (e.key === 'Enter') {
        searchAndLoadPhoneFunCall(6);
    }
})



// loader toggle - nijer deya
const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById('spinner');

    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }

}


document.getElementById('show-all-btn').addEventListener('click', function () {

    /* toggleSpinner(true);     //goes to common function - searchAndLoadPhoneFunCall()  
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    loadPhones(searchFieldValue); */

    searchAndLoadPhoneFunCall();


})

const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;

    const res = await fetch(url);
    const data = await res.json()
    displayPhoneDetails(data.data);

}

const displayPhoneDetails = (phone) => {
    console.log(phone);
    const phoneTitle = document.getElementById('phoneDetailsModalLabel');
    phoneTitle.innerText = phone.name
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <h3>Specification</h2>


    <p>Processor: ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'Main Features not Found'}</p>
    <p>Display: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'Main Features not Found'}</p>

    <p>Sensors: ${phone.mainFeatures ? phone.mainFeatures.sensors : 'Main Features not Found'}</p>

    `
    
    const phoneDetailsFooter = document.getElementById('phone-details-footer');
    phoneDetailsFooter.innerHTML =`

    <p class="pr-4"> ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    
    `
    


}

loadPhones('a');