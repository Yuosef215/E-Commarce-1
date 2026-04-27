const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require('../utils/apiFeatures');


exports.deleteOne = (Model) => 
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const document = await Model.findByIdAndDelete(id);
        if (!document) {
            return next(new ApiError(`document with id ${id} not found`, 404));
        }
        res.status(200).json({ message: `document with id ${id} deleted` });
});

exports.updateOne = (Model) => 
    asyncHandler(async (req, res, next) => {
        
        
        const document = await Model.findByIdAndUpdate(
            req.params.id, 
            req.body,
            { new: true });
        if (!document) {
            return next(new ApiError(`Document with id ${ req.params.id} not found`, 404));
        }
        res.status(200).json({ data: document });
});

exports.CreateOne = (Model) => 
    asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
});

exports.getOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const document = await Model.findById(id);
        if (!document) {
            return next(new ApiError(`document with id ${id} not found`, 404));
        }
        res.status(200).json({ data: document });
});

exports.getAll = (Model, modelName = '') =>
    asyncHandler(async (req, res) => {
        let filter = {}; // ✅ let بدل const
        if(req.filterOdj){ filter = req.filterOdj }; // ✅ req.filterOdj
        
        const documentCounts = await Model.countDocuments();
        const apifeatures = new ApiFeatures(Model.find(filter), req.query)
            .filter()
            .sort()
            .limitFields()
            .search(modelName)
            .paginate(documentCounts);
    
        const { mongooseQuery, paginationresult } = apifeatures;
        const documents = await mongooseQuery;
        res.status(200).json({ 
            result: documents.length, 
            paginationresult, 
            data: documents 
        });
});