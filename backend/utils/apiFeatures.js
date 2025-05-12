class APIFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        let keyword =  this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {};

        this.query = this.query.find({...keyword}); // Reassign the query object
        return this;
    }

    filter() {
    const queryStrCopy = { ...this.queryStr };

    // Removing fields from query
    const removeFields = ['keyword', 'limit', 'page'];
    removeFields.forEach((field) => delete queryStrCopy[field]);

    let queryStr = JSON.stringify(queryStrCopy);

    // Handle operators like gte, lte, etc. in nested parameters (e.g., price[gte])
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // If there are nested parameters like price[gte], we need to change them to an object format
    queryStr = queryStr.replace(/"(\w+)\[(\w+)\]"/g, '"$1.$2"');

    this.query = this.query.find(JSON.parse(queryStr)); // Reassign the query object
    return this;
}


    paginate(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query = this.query.limit(resPerPage).skip(skip); // Reassign the query object
        return this;
    }
}

module.exports = APIFeatures;
