function isValidId(id) {
  const isNumericId = /^\d+$/.test(id);
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
  return isNumericId || isUuid;
}

module.exports = {
  isValidId,
};
