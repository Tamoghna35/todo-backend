const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res,next)).catch((err=>next(err)))
    }
}

export default asyncHandler


// function asyncHandler1(requestHandler1) {
//     return function (req, res, next) {
//         Promise.resolve(requestHandler1(req, res, next))
//             .catch(function (err) {
//             next(err)
//         })
//     }
// }