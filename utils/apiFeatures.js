class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'from', 'to'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  dateRange() {
    if (this.queryString.from || this.queryString.to) {
      const from = new Date(this.queryString.from);
      const to = new Date(this.queryString.to);

      console.log(from, to);

      // If both `from` and `to` are provided, filter by range
      if (!isNaN(from.getTime()) && !isNaN(to.getTime())) {
        this.query = this.query.find({
          created_at: { $gte: from, $lte: to },
        });
      }
      // If only `from` is provided, get all records from that date
      else if (!isNaN(from.getTime())) {
        this.query = this.query.find({
          created_at: { $gte: from },
        });
      }
      // If only `to` is provided, get all records until that date
      else if (!isNaN(to.getTime())) {
        this.query = this.query.find({
          created_at: { $lte: to },
        });
      }
    }
    console.log(this.queryString);

    return this;
  }
}

module.exports = APIFeatures;
