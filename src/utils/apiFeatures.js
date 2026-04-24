class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }
    filter() {
        const queryStringObject = { ...this.queryString };
    const excludedFields = ['page', 'limit', 'sort', 'fields', 'keyword'];
    excludedFields.forEach((field) => delete queryStringObject[field]);

    // Applying filtering for gte, gt, lt, lte
    let queryStr = JSON.stringify(queryStringObject);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
    return this;
    }

    sort() {
         if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    }else{
         this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
    }
    return this;
    }

    limitFields() {
         if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.mongooseQuery = this.mongooseQuery.select(fields);
    }else{
        this.mongooseQuery = this.mongooseQuery.select('-__v');
    }
    return this;
    }
}

