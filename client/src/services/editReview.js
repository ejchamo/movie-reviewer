const editReview = async (userId, reviewId) => {
  try {
    await fetch(`/api/v1/reviews/${reviewId}`, {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ userId, reviewId }),
    });
  } catch (err) {
    console.error(`Error in fetch: ${err.message}`);
  }
};

export default editReview;
