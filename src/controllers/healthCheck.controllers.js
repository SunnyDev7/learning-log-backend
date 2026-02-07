export const healthCheck = (req, res) => {
  res.json({ status: "Server Up", timestamp: new Date().toISOString() });
};
