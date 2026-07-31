function isValidId(id) {
  if (!id || typeof id !== 'string') {
    return false;
  }
  const trimmed = id.trim();
  const num = Number(trimmed);
  return Number.isInteger(num) && num > 0;
}

function isValidTitle(title) {
  if (!title || typeof title !== 'string') {
    return false;
  }
  const trimmed = title.trim();
  return trimmed.length >= 3 && trimmed.length <= 50;
}

function isValidContent(content) {
  if (!content || typeof content !== 'string') {
    return false;
  }
  return content.trim().length > 0;
}

function isValidChoice(choice, min, max) {
  if (!choice || typeof choice !== 'string') {
    return false;
  }
  const num = Number(choice.trim());
  return Number.isInteger(num) && num >= min && num <= max;
}

function isValidUsername(username) {
  if (!username || typeof username !== 'string') {
    return false;
  }
  const trimmed = username.trim();
  const usernameRegex = /^[a-zA-Z0-9_-]{2,20}$/;
  return usernameRegex.test(trimmed);
}

module.exports = {
  isValidId,
  isValidTitle,
  isValidContent,
  isValidChoice,
  isValidUsername
};
