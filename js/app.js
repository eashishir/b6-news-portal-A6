const loadCategorys = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const rep = await fetch(url);
    const data = await rep.json();
    displayNavCategory(data.data.news_category);
}

const displayNavCategory = (navbers) => {


    const navContainer = document.getElementById('navbarNav');
    navbers.forEach(navbar => {
        // console.log(navbar.category_id)


        const navli = document.createElement('li');
        navli.classList.add('navbar-nav');
        navli.innerHTML = `

        <li class="nav-item ps-3 fw-semibold hover-underline-animation">
        <a  onclick="loadNewsDetails('${navbar.category_id}')" class="nav-link active text-success" aria-current="page" href="#">${navbar.category_name}</a>
    </li>
        
        `;
        navContainer.appendChild(navli);
    })


}



// part - 2
const loadNewsDetails = async (id) => {

    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data);
}


const displayNewsDetails = (newses) => {
    toggleSpiner(true);

    const divContainer = document.getElementById('div-container');
    divContainer.innerHTML = ``;
    const cardNumber = document.getElementById('crd-number');
    cardNumber.innerText = newses.length;
    // short work 
    const shortFind = newses.sort((x, y) => {
        if (x.total_view < y.total_view) {
            return 1;
        }
        else {
            return -1
        }
    })


    newses.forEach(news => {
        // console.log(news._id);




        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <div class="col p-4">
        <div class="card">
        <img src="${news.thumbnail_url}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${news.title}</h5>
        <p class="card-text">${news.details.slice(0, 150)}....</p>
        <div>
            <div class="d-flex justify-content-between fw-bold ">
                <img src="${news.author.img}" alt="" width="50" height="25">
                <p>${news.author.name ? news.author.name : 'No Name '}</p>
                <p><i class="fa-regular fa-eye"></i>${news.total_view ? news.total_view : 'Not found'}M</p>
            </div>
            <p>${news.author.published_date ? news.author.published_date : 'No time data found'}</p>
            <button onclick="loadMoreDetails('${news._id}')"  href="#" class="btn btn-success"data-bs-toggle="modal" data-bs-target="#newsDetailModal">Show More</button>

          
        </div>
        
        
        `;

        divContainer.appendChild(newsDiv);
        toggleSpiner(false);

    });




}



const toggleSpiner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');

    }
    else {
        loaderSection.classList.add('d-none');
    }
}


// part-3
const loadMoreDetails = async (id2) => {

    const url = ` https://openapi.programming-hero.com/api/news/${id2}`;
    const res = await fetch(url);
    const data = await res.json();
    displayModalDetails(data.data[0]);
}

const displayModalDetails = modal => {
    console.log(modal);
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = modal.title;
    const phoneDetails = document.getElementById('modal-details');
    phoneDetails.innerHTML = `
    
    <p>publisher Name:${modal.author.name ? modal.author.name : 'No name data found'}</p>
    <img class="w-100 h-50 p-4" src="${modal.author.img}" alt="">
    <p>Published Time:${modal.author.published_date ? modal.author.published_date : "No time data found"}</p>
    

    `
}

loadNewsDetails('01');

loadCategorys();



