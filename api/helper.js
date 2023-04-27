exports.getMemberId = function  (req) {
    let memberId = null;
    if (req.user) {
        memberId = req.user.id;
    }
    return memberId;
}