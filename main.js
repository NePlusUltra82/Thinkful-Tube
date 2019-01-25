





function searchSubmit(){
    $('.js-search-form').submit(event => {
        event.preventDefault();
        const searchItem = $('.js-search-input').val();
        console.log(searchItem);
    });
}


$(searchSubmit);