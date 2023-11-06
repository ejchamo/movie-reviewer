const deleteReview = async (reviewId) => {
  try {
    const deletedRows = await fetch(`/api/v1/reviews/${reviewId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ reviewId }),
    });
    return deletedRows;
  } catch (err) {
    console.error(`Error in fetch: ${err.message}`);
  }
};
export default deleteReview;
