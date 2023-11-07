const editReview = async (reviewId, content) => {
  try {
    const response = await fetch(`/api/v1/reviews/${reviewId}`, {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ content }),
    });
    const updatedReview = await response.json();
    return updatedReview;
  } catch (err) {
    console.error(`Error in fetch: ${err.message}`);
  }
};

export default editReview;
