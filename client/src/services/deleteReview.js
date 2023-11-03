const deleteReview = async (reviewId, reviewUserID) => {
  try {
    const deletedRows = await fetch(`/api/v1/reviews/${reviewId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ reviewId, reviewUserID }),
    });
    return deletedRows;
  } catch (err) {
    console.error(`Error in fetch: ${err.message}`);
  }
};
export default deleteReview;
