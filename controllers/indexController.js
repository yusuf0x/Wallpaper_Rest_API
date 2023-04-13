const rp = require('request-promise');
const cheerio = require('cheerio');
const { json, errorJson } = require("../utils/response");

exports.index = (req, res) => {
    const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

    return json(res, {
        maintainer: "yusuf0x",
        source: "https://github.com/yusuf0x/Wallpaper_Rest_API",
        wallpapers: {
            endpoint: "/wallpapers/popular",
            endpoint : "/wallpapers?page=1",
            description: "Show list of wallpapers",
            example: fullUrl + "wallpapers/popular",
        },
        mobileWallpapers: {
            endpoint: "/wallpapers/mobile",
            description: "Show list of mobile wallpapers",
            example: fullUrl + "wallpapers/mobile",
        },
        avatars: {
            endpoint: "/avatars/popular",
            description: "Show list of avatars",
            example: fullUrl + "avatars/popular",
        },
        arts: {
            endpoint: "/arts/popular",
            description: "Show list arts images",
            example: fullUrl + "arts/popular",
        },
        pictures: {
            endpoint: "/pictures/popular",
            description: "Show list of pictures",
            example: fullUrl + "pictures/popular",
        },
        gifs: {
            endpoint: "/gifs/popular",
            description: "show list of  gifs",
            example: fullUrl + "gifs/popular",
        },
        games: {
            endpoint: "/games/popular",
            description: "show list of games images",
            example: fullUrl + "games/popular",
        },
        movies: {
            endpoint: "/movies/popular",
            description: "show list of movies images",
            example: fullUrl + "movies/popular",
        },
        tv_shows: {
            endpoint: "/tv_shows/popular",
            description: "show list of tv shows images",
            example: fullUrl + "tv_shows/popular",
        },
    });
};
exports.wallpapers = (req, res) => {
    let page = req.query.page;
    console.log(page);
    if(page==undefined || page == null){
        page = 0;
    }
    rp(`https://wall.alphacoders.com/featured.php?page=${page}`)
    .then(function(html){
        let $ = cheerio.load(html);
        const results = [];
        var statistic = [];
        var tag = [];
        $('.thumb-container-big ').each(function(index,element){
            const link = $(this).find('.thumb-container>.boxgrid>a>picture>img').attr('src');
            const name = $(this).find('.thumb-container>.boxcaption>.thumb-info>a').last().text().trim();
            const stat = $(this).find('.thumb-container>.boxcaption>.thumb-stats>span');
            stat.each(function(index,element) {
                statistic.push($(this).first().text().trim());
            });
            const tags = $(this).find('.tags-info>a');
            tags.each(function(index,element){
                tag.push($(this).text().trim());
            });
            results.push({
                name:name,
                image:link,
                statistic:{
                    Ratings:statistic[0],
                    Views : statistic[1],
                    Favorites : statistic[2],
                    Comments:statistic[3]
                },
                tags:tag,
            });
            tag = [];
            statistic = [];
        });
        return json(res, results);
    })
    .catch(function(err){
        return errorJson(res, err);
    });
};
exports.mobileWallpapers = (req, res) => {
    let page = req.query.page;
    console.log(page);
    if(page==undefined || page == null){
        page = 0;
    }
    rp(`https://mobile.alphacoders.com/?page=${page}`)
    .then(function(html){
        let $ = cheerio.load(html);
        const results = [];
        $('.thumb-element').each(function(index,element){
            const title = $(this).find('a>img').attr('title');
            const img = $(this).find('a>img').attr('src');
    
            results.push({
                title:title,
                image:img,
            });
        });
        return json(res, results);
    })
    .catch(function(err){
        return errorJson(res, err);
    });
};

exports.avatars = (req, res) => {
    let page = req.query.page;
    console.log(page);
    if(page==undefined || page == null){
        page = 0;
    }
    rp(`https://avatars.alphacoders.com/avatars/popular?page=${page}`)
    .then(function(html){
        let $ = cheerio.load(html);
        const results = [];
        $('.avatar-thumb').each(function(index,element){
            const title = $(this).find('a').attr('title').split('/')[1];
            const img = $(this).find('a>img').attr('src');
    
            results.push({
                title:title,
                image:img,
            });
        });
        return json(res, results);
    })
    .catch(function(err){
        return errorJson(res, err);
    });
};
exports.arts = (req, res) => {
    let page = req.query.page;
    console.log(page);
    if(page==undefined || page == null){
        page = 0;
    }
    rp(`https://art.alphacoders.com/arts/popular?page=${page}`)
    .then(function(html){
        let $ = cheerio.load(html);
        const results = [];
        
        $('.thumb-container').each(function(index,element){
            const title = $(this).find('a').attr('title');
            const img = $(this).find('a>picture>img').attr('src');
            const tag = $(this).find('.thumb-bottom>.center>.thumb-tags>a').attr('title');
            console.log(tag);
            results.push({
                title:title,
                image:img,
                tag:tag ? tag : "",
            });
        });
        return json(res, results);
    })
    .catch(function(err){
        return errorJson(res, err);
    });
};
exports.pictures = (req, res) => {
    let page = req.query.page;
    console.log(page);
    if(page==undefined || page == null){
        page = 0;
    }
    rp(`https://pics.alphacoders.com/pictures/popular?page=${page}`)
    .then(function(html){
        let $ = cheerio.load(html);
        const results = [];
        var statistic = [];
        $('.container-masonry>.item >.thumb-default').each(function(index,element){
            const title = $(this).find('.boxgrid>a').attr('title');
            const img = $(this).find('.boxgrid>a>img').attr('src');
            const caption = $(this).find('.boxcaption>.thumb-stats>span');
            caption.each(function(index,element){
                statistic.push($(element).text().trim());
            });
            const tag = $(this).find('.tag-container>a').text().trim();
            results.push({
                title:title,
                image:img,
                statistic : {
                    Ratings:statistic[0],
                    Views:statistic[1],
                    Favorites:statistic[2],
                    Comments:statistic[3]
                },
                tag:tag ? tag : "",
            });
            statistic = [];
        });
        return json(res, results);
    })
    .catch(function(err){
        return errorJson(res, err);
    });
};

exports.gifs = (req, res) => {
    let page = req.query.page;
    console.log(page);
    if(page==undefined || page == null){
        page = 0;
    }
    rp(`https://gifs.alphacoders.com/gifs/popular?page=${page}`)
    .then(function(html){
        let $ = cheerio.load(html);
        const results = [];
        $('.thumb-container').each(function(index,element){
            const title1 = $(this).find('.gif-right>.categorization>a').first().text().trim();
            const title2 = $(this).find('.gif-right>.categorization>a').last().text().trim();
            const gif = $(this).find('.gif-right>a>img').attr('src');
            results.push({
                title:title1+"-"+title2,
                gif:gif, 
            });
        });
        return json(res, results);
    })
    .catch(function(err){
        return errorJson(res, err);
    });
};
// https://games.alphacoders.com/games/popular
exports.games = (req, res) => {
    const fullUrl = 'https://games.alphacoders.com';
    let page = req.query.page;
    console.log(page);
    if(page==undefined || page == null){
        page = 0;
    }
    rp(`https://games.alphacoders.com/games/popular?page=${page}`)
    .then(function(html){
        let $ = cheerio.load(html);
        const results = [];
        // console.log($('.games-container>div>.border-blue').length);
        $('.games-container>div>.border-blue').each(function(index,element){
            const title = $(this).find('.link-game').text().trim();
            const link = $(this).find('.link-game').attr('href');
            const img = $(this).find('.thumb-link>img').attr('src');
            results.push({
                title:title,
                image:img,
                link:fullUrl+link 
            });
        });
        return json(res, results);
    })
    .catch(function(err){
        return errorJson(res, err);
    });
};
// https://movies.alphacoders.com/movies/by_popularity
exports.movies = (req, res) => {
    const fullUrl = 'https://movies.alphacoders.com';
    let page = req.query.page;
    console.log(page);
    if(page==undefined || page == null){
        page = 0;
    }
    rp(`https://movies.alphacoders.com/movies/by_popularity?page=${page}`)
    .then(function(html){
        let $ = cheerio.load(html);
        const results = [];
        // console.log($('.games-container>div>.border-blue').length);
        $('.movies-container>div>.border-blue').each(function(index,element){
            const title = $(this).find('.link-movie').text().trim();
            const link = $(this).find('.link-movie').attr('href');
            const img = $(this).find('.thumb-link>img').attr('src');
            results.push({
                title:title,
                image:img,
                link:fullUrl+link 
            });
        });
        return json(res, results);
    })
    .catch(function(err){
        return errorJson(res, err);
    });
};
//tv-shows-container
exports.tvShows = (req, res) => {
    const fullUrl = 'https://tvshows.alphacoders.com';
    console.log(fullUrl);
    let page = req.query.page;
    console.log(page);
    if(page==undefined || page == null){
        page = 0;
    }
    rp(`https://tvshows.alphacoders.com/tv_shows/by_popularity?page=${page}`)
    .then(function(html){
        let $ = cheerio.load(html);
        const results = [];
        // console.log($('.games-container>div>.border-blue').length);
        $('.tv-shows-container>div>.border-blue').each(function(index,element){
            const title = $(this).find('.link-show').text().trim();
            const link = $(this).find('.link-show').attr('href');
            const img = $(this).find('.thumb-link>img').attr('src');
            results.push({
                title:title,
                image:img,
                link:fullUrl+link 
            });
        });
        return json(res, results);
    })
    .catch(function(err){
        return errorJson(res, err);
    });
};