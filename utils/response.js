exports.successResponse = function (res, data) {
    const body = {
        data: data || null
    }
    return res.status(200).json(body)
}

exports.errorResponse = function(res, msg, code) {
    const body = {
        msg: msg
    }
    return res.status(code).json(body)
}