export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  try {
    const response = await fetch(config.FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    return { success: true };
  } catch {
    throw createError({
      statusCode: 500,
      message: "Failed to submit form",
    });
  }
});
