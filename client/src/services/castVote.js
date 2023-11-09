const castVote = async (vote, reviewId) => {
  try {
    const response = await fetch(`/api/v1/votes/${reviewId}`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ vote: vote }),
    });
    if (!response.ok) {
      if (response.status === 422) {
        const errorBody = await response.json();
        const newErrors = translateServerErrors(errorBody.errors);
        return setErrors(newErrors);
      } else {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
    } else {
      const body = await response.json();

      return body.newVote;
    }
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`);
  }
};

export default castVote;
