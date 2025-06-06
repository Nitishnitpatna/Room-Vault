const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/Listing.js");
const {validateReview,isLoggedin, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js")

// Post review
router.post("/",isLoggedin,validateReview,wrapAsync(reviewController.createReview)
);
// Delete Review
router.delete("/:reviewId",isLoggedin,isReviewAuthor, wrapAsync(reviewController.destroyReview))


module.exports = router;