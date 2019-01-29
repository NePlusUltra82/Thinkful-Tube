
$(function () {

    const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

    const accessKey = 'AIzaSyD_cr9i_SVDlO-sz0dC97hDrSdvj4bS_Vk';


    $('.js-search-form').submit(event => {
        event.preventDefault();
        const searchItem = $('.js-search-input').val();
        getApiResults(searchItem, displayResults);
    });

    function getApiResults(query, callback) {
        const options = {
            q: `${query} in:name`,
            part: 'snippet',
            key: `${accessKey}`,
            per_page: 5
        }
        $.getJSON(YOUTUBE_SEARCH_URL, options, callback);
    }

    function displayResults (data) {
        console.log(data);

        $('.js-search-input').val('');

        $('.js-results')
            .prop('hidden',false)
            .html(
            `
                <div>
                    <h1>The Results are in!</h1> 
                    <h2>Total Results: ${data.pageInfo.totalResults} </h2>
                    <ul>
                        ${data.items.map(item => (
                        `   <div class="container">
                                <h2 class="results">${item.snippet.title}</h2>
                                <h2 class="results">More From This Channel: <a target="_blank" href="https://www.youtube.com/channel/${item.snippet.channelId}" >${item.snippet.channelTitle}</a></h2>
                                <li class="results"><a target="_blank" href="https://www.youtube.com/watch?v=${item.id.videoId}" ><img alt='video thumbnail' src="${item.snippet.thumbnails.high.url}"/></a></li>
                            </div>   
                        `
                        )).join(' ')}
                    </ul>
                </div>
            `
        );
    }
});