class Movie {
    constructor(id, title, genre, director, year, imageURL,rating,description) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.director = director;
        this.year = year;
        this.imageURL = imageURL;
        this.rating = rating;
        this.description = description;
    }
}
module.exports = Movie